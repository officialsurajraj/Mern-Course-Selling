

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";

// ✅ token bhi destructure kar


export default function StudentDashboard() {
    const { user, token, updateUser, logout } = useAuth();

    const [editOpen, setEditOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        password: "",
    });

    // Logout confirm
    const handleLogout = () => {
        toast.info(
            <div>
                <p className="font-medium">Are you sure you want to logout?</p>
                <div className="flex justify-center gap-3 mt-2">
                    <button
                        onClick={() => {
                            logout();
                            toast.dismiss();
                        }}
                        className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => toast.dismiss()}
                        className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                autoClose: false,
                closeOnClick: false,
                draggable: false,
                position: "top-center",
                theme: "dark",
            }
        );
    };

    // Update profile

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                "http://localhost:4000/api/users/update",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,  // ✅ token alag state se lo
                    },
                }
            );

            if (res.status === 200 && res.data.user) {
                updateUser(res.data.user); // ✅ AuthContext me update
                toast.success("Profile updated successfully ✅", { theme: "dark" });
            } else {
                toast.error("Update failed ❌", { theme: "dark" });
            }

            setEditOpen(false);
            setFormData({ ...formData, password: "" });
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Update failed ❌", {
                theme: "dark",
            });
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col lg:flex-row">
            {/* Left Side - Profile */}
            <div className="w-full lg:w-1/3 bg-gray-900/90 p-6 shadow-lg border-b lg:border-b-0 lg:border-r border-gray-700">
                <div className="flex flex-col items-center text-center">
                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=7e22ce&color=fff`}
                        alt="avatar"
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-purple-600"
                    />
                    <h2 className="text-xl md:text-2xl font-bold mt-4 text-white">
                        {user?.name}
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">{user?.email}</p>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition text-sm md:text-base"
                    >
                        Logout
                    </button>

                    {/* Enrolled Courses */}
                    <div className="mt-6 w-full">
                        <h3 className="text-lg font-semibold mb-3 text-purple-400">
                            🎓 Enrolled Courses
                        </h3>
                        <ul className="space-y-2">
                            <li className="p-2 bg-gray-800 rounded text-gray-200 text-sm md:text-base">
                                React for Beginners
                            </li>
                            <li className="p-2 bg-gray-800 rounded text-gray-200 text-sm md:text-base">
                                Node.js Mastery
                            </li>
                            <li className="p-2 bg-gray-800 rounded text-gray-200 text-sm md:text-base">
                                MongoDB Basics
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Side - Dashboard */}
            <div className="flex-1 p-6 md:p-8 text-white">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">
                    Student Dashboard
                </h1>

                {/* Progress Overview */}
                <div className="bg-gray-900/90 p-4 md:p-6 rounded-xl shadow mb-6 border border-gray-700">
                    <h3 className="text-lg md:text-xl font-semibold mb-2 text-purple-400">
                        📊 Progress Overview
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base">
                        You’ve completed 40% of your courses.
                    </p>
                    <div className="w-full bg-gray-700 rounded-full h-2 md:h-3 mt-2">
                        <div
                            className="bg-purple-600 h-2 md:h-3 rounded-full"
                            style={{ width: "40%" }}
                        ></div>
                    </div>
                </div>

                {/* Edit Profile */}
                <div className="bg-gray-900/90 p-4 md:p-6 rounded-xl shadow border border-gray-700">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg md:text-xl font-semibold text-purple-400">
                            👤 Profile Information
                        </h3>
                        <button
                            onClick={() => setEditOpen(!editOpen)}
                            className="text-purple-400 hover:underline text-sm md:text-base"
                        >
                            {editOpen ? "Close" : "Edit"}
                        </button>
                    </div>

                    <AnimatePresence>
                        {editOpen && (
                            <motion.form
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                onSubmit={handleUpdate}
                                className="mt-4 space-y-3 overflow-hidden"
                            >
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white text-sm md:text-base"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white text-sm md:text-base"
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white text-sm md:text-base"
                                />

                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm md:text-base"
                                >
                                    Update Profile
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                {/* Future Features Section */}
                <div className="bg-gray-900/90 p-4 md:p-6 rounded-xl shadow mt-6 border border-gray-700">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-400">
                        🚀 Upcoming Features
                    </h3>
                    <ul className="list-disc pl-5 mt-2 text-gray-300 text-sm md:text-base">
                        <li>Avatar selection</li>
                        <li>Download certificates</li>
                        <li>Leaderboard ranking</li>
                        <li>Dark mode toggle</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
