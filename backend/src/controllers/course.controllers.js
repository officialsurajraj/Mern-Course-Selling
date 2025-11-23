import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/course.models.js"
import { Lecture } from "../models/lecture.models.js";

export const createCourse = async (req, res) => {
    try {
        const { title, category } = req.body;
        if (!title || !category) {
            return res.status(400).json(
                {
                    message: "Please fill all fields now"
                }
            )
        }
        const course = await Course.create(
            {
                title,
                category,
                creator: req.user._id
            }
        )
        return res.status(200).json(
            {
                message: "Course Created successfully now",
                course
            }
        )
    } catch (error) {
        return res.status(500).json({ message: "something went wrong while creating course : ", error })
    }
}
export const getPublishedCourses = async (req, res) => {
    try {
        const course = await Course.find({ isPublished: true }).populate("lectures reviews");
        if (!course) {
            return res.status(401).json(
                {
                    message: "Course is not found"
                }
            )
        }
        return res.status(200).json(
            {
                message: "Total Course",
            },
            course
        )
    } catch (error) {
        return res.status(401).json(
            {
                message: error
            }
        )
    }
}

export const getCreatorCourses = async (req, res) => {
    try {
        const creatorCourse = await Course.find({ creator: req.user._id });
        if (!creatorCourse) {
            return res.status(404).json(
                {
                    message: "Course is not found"
                }
            )
        }
        return res.status(200).json(
            {
                message: "Successfully course fetched",
                creatorCourse
            }
        )
    } catch (error) {
        return res.json(400).json(
            {
                message: error
            }
        )
    }
}
export const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({
                message: "Course ID is required",
            });
        }

        const allowedFields = [
            "title",
            "subTitle",
            "description",
            "category",
            "level",
            "price",
            "isPublished"
        ];

        let updateData = {};

        for (let field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        if (req.file?.path) {
            updateData.thumbnail = req.file.path;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid data provided to update",
            });
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            { $set: updateData },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedCourse) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        return res.status(200).json({
            message: "Course updated successfully",
            updatedCourse,
        });

    } catch (error) {
        return res.status(500).json({
            message: `Failed to update course: ${error.message}`,
        });
    }
};

export const removeCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json(
                {
                    message: "Course is not found"
                }
            )
        }
        await course.deleteOne();
        return res.status(200).json(
            {
                message: "Course Deleted Successfully"
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: "Failed to remove course",
                error
            }
        )
    }
}


// Create lectures now

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json(
                {
                    message: "Title & Course id is required"
                }
            )
        }
        const lecture = await Lecture.create({ lectureTitle })
        const course = await Course.findById(courseId);

        if (course) {
            course.lecture.push(lecture);
        }

        await course.populate("lecture")
        await course.save()

        return res.status(200).json(
            {
                message: "Course is succesfully created now",
                course, lecture
            }
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: `Something went wrong whiling creating Lecture ${error}`

            }
        )
    }
}

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params;

        const course = await Course.findById(courseId).populate("lecture");

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        return res.status(200).json({
            message: "Course fetched successfully",
            course   //  <-- Real object (correct)
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong while getting course lectures",
            error: error.message
        });
    }
};
