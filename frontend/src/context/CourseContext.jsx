import { createContext, useContext, useEffect, useState } from "react";
import {
    createCourse,
    getPublishedCourses,
    getCreatorCourses,
    editCourse,
    removeCourse,
} from "../services/courseService";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    // 🧠 Central state
    const [publishedCourses, setPublishedCourses] = useState([]);
    const [creatorCourses, setCreatorCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    // 📌 Fetch published (public) courses
    const fetchPublishedCourses = async () => {
        try {
            setLoading(true);
            const data = await getPublishedCourses();
            if (data?.course) {
                setPublishedCourses(data?.course || [])
            }
        } catch (error) {
            console.error("Failed to load published courses:", error);
        } finally {
            setLoading(false);
        }
    };

    // 📌 Fetch courses created by logged-in instructor/admin
    const fetchCreatorCourses = async () => {
        try {
            setLoading(true);
            const data = await getCreatorCourses();
            setCreatorCourses(data?.creatorCourse || []);
        } catch (error) {
            console.error("Failed to load creator courses:", error);
        } finally {
            setLoading(false);
        }
    };

    // 🛠 Create Course + Auto refresh
    const handleCreateCourse = async (payload) => {
        const data = await createCourse(payload);
        await fetchCreatorCourses(); // auto refresh
        return data;
    };

    // ✏ Update Course + Auto refresh
    const handleEditCourse = async (id, dataToUpdate) => {
        const data = await editCourse(id, dataToUpdate);
        await fetchCreatorCourses();
        return data;
    };

    // 🗑 Delete Course + Auto refresh
    const handleRemoveCourse = async (id) => {
        await removeCourse(id);
        await fetchCreatorCourses();
    };

    // 🧪 Initial Load (public courses)
    useEffect(() => {
        fetchPublishedCourses();
    }, []);

    return (
        <CourseContext.Provider
            value={{
                publishedCourses,
                creatorCourses,
                loading,
                fetchPublishedCourses,
                fetchCreatorCourses,
                handleCreateCourse,
                handleEditCourse,
                handleRemoveCourse,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
};

export const useCourse = () => useContext(CourseContext);
