import API from "../api/axios";

export const createLecture = async (courseId, lectureTitle) => {
    const res = await API.post(`/course/create-lecture/${courseId}`, { lectureTitle });
    return res.data;
};
export const getCourseLectures = async (courseId) => {
    const res = await API.get(`/course/getCourselecture/${courseId}`);
    return res.data;
};
export const editLecture = async (courseId) => {
    const res = await API.patch(`course/edit-lecture/${courseId}`)
    return res.data;
};
export const removeLecture = async (lectureId) => {
    const res = await API.delete(`/course/removelecture/${lectureId}`);
    return res.data;
}
export const getcreator = async () => {
    const res = await API.get(`/course/getcreator`);
    return res.data;
}