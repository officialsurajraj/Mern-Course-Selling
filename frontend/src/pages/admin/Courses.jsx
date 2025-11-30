import React from "react";
import { FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

const Courses = () => {
    return (
        <div className="bg-white shadow p-6 rounded-lg">

            {/* ===== Header Section ===== */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Courses</h2>
                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    <FaPlus />
                    Add New Course
                </button>
            </div>

            {/* ===== Table Section ===== */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr className="bg-gray-200 text-left border-b">
                            <th className="py-3 px-4">Thumbnail</th>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Category</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3].map((item) => (
                            <tr key={item} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-4">
                                    <img
                                        src={`https://picsum.photos/seed/course${item}/90/50`}
                                        alt="course"
                                        className="w-20 h-12 object-cover rounded"
                                    />
                                </td>

                                <td className="py-2 px-4">React Mastery Course</td>
                                <td className="py-2 px-4">Web Development</td>

                                <td className="py-2 px-4">₹1499</td>

                                <td className="py-2 px-4">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                                        Published
                                    </span>
                                </td>

                                {/* ==== Action Buttons ==== */}
                                <td className="py-2 px-4 flex justify-center gap-3">
                                    <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                        <FaEye />
                                    </button>
                                    <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                                        <FaEdit />
                                    </button>
                                    <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Courses;
