// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Course } from "../models/course.models.js"
import { Lecture } from "../models/lecture.models.js";
import { User } from "../models/user.models.js";

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
        const course = await Course.find({ isPublished: true });
        if (!course || course.length == 0) {
            return res.status(404).json(
                {
                    message: "Course is not found",
                    totalCourse: course.length
                }
            )
        }
        return res.status(200).json(
            {
                message: "Total Course",
                totalCourse: course.length,
                course
            },
        )
    } catch (error) {
        return res.status(500).json(
            {
                message: error
            }
        )
    }
}
export const getCreatorCourses = async (req, res) => {
    try {
        const creatorCourse = await Course.find({ creator: req.user._id });
        if (!creatorCourse || creatorCourse.length === 0) {
            return res.status(404).json(
                {
                    message: "Course is not found",
                    totalCourse: creatorCourse.length

                }
            )
        }
        return res.status(200).json(
            {
                message: "Successfully course fetched",
                totalCourse: creatorCourse.length,
                creatorCourse
            }
        )
    } catch (error) {
        return res.json(500).json(
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
            course.lecture.push(lecture._id);
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


export const editLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const { lectureTitle, duration, isPreviewFree } = req.body;

        if (!lectureId) {
            return res.status(400).json({ message: "Lecture ID is required" });
        }

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        if (lectureTitle !== undefined) lecture.lectureTitle = lectureTitle;
        if (duration !== undefined) lecture.duration = duration;
        if (isPreviewFree !== undefined) lecture.isPreviewFree = isPreviewFree;

        if (req.file?.path) {
            lecture.videoUrl = req.file.path;
        }

        await lecture.save();

        const updatedLecture = await Lecture.findById(lectureId);

        return res.status(200).json({
            success: true,
            message: "Lecture updated successfully",
            updatedLecture,
        });

    } catch (error) {
        console.error("Error while updating lecture:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update lecture",
            error: error.message,
        });
    }
};


export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params
        if (!lectureId) {
            return res.status(400).json({ message: "Lectured id is required now" })
        }
        const lecture = await Lecture.findByIdAndDelete(lectureId)
        if (!lecture) {
            return res.status(404).json({ message: "Lecture not found" })
        }

        await Course.updateOne(
            { lectures: lectureId },
            { $pull: { lectures: lectureId } }
        )
        return res.status(200).json({ message: "Lecture Remove Successfully" })
    }

    catch (error) {
        return res.status(500).json({ message: `Failed to remove Lectures ${error}` })
    }
}

export const getCreatorById = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId)

        const user = await User.findById(userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({ message: "get Creator error" });
    }
};

