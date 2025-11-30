import API from "../api/axios";

// 1️⃣ Create Course 
export const createCourse = async (data) => {
    const res = await API.post("/course/create-course", data);
    return res.data;
};

// 2️⃣ Get Published Courses ( Public )
export const getPublishedCourses = async () => {
    const res = await API.get("/course/published-course");
    return res.data;
};

// 3️⃣ Get Creator's Own Courses (Dashboard)
export const getCreatorCourses = async () => {
    const res = await API.get("/course/creator-course");
    return res.data;
};

// 4️⃣ Edit a Course
export const editCourse = async (courseId, updatedData) => {
    const res = await API.patch(`/course/editcourse/${courseId}`, updatedData);
    return res.data;
};

// 5️⃣ Delete Course
export const removeCourse = async (courseId) => {
    const res = await API.delete(`/course/removecourse/${courseId}`);
    return res.data;
};
