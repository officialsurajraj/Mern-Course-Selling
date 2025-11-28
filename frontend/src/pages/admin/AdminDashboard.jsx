// src/pages/admin/AdminDashboard.jsx
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-r from-black via-gray-900 to-black text-white">
            {/* Sidebar */}
            <aside
                className=
                {`
                 bg-gray-800 w-64 p-5 space-y-6 shadow-xl z-50
                 md:relative md:translate-x-0 md:flex-shrink-0
                 fixed inset-y-0 left-0 transform
                 ${isOpen ? "translate-x-0" : "-translate-x-full"}
                 transition-transform duration-300 ease-in-out
                `}
            >
                <h1 className="text-2xl font-bold text-purple-400">Admin Panel</h1>

                <nav className="space-y-3 mt-6">
                    <NavLink
                        to=""
                        end
                        className={({ isActive }) =>
                            `block p-2 rounded-lg transition ${isActive ? "bg-purple-600" : "hover:bg-purple-600"
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        📊 Overview
                    </NavLink>

                    <NavLink
                        to="courses"
                        className={({ isActive }) =>
                            `block p-2 rounded-lg transition ${isActive ? "bg-purple-600" : "hover:bg-purple-600"
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        🎥 Add Courses
                    </NavLink>

                    <NavLink
                        to="categories"
                        className={({ isActive }) =>
                            `block p-2 rounded-lg transition ${isActive ? "bg-purple-600" : "hover:bg-purple-600"
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        📂 My Courses
                    </NavLink>

                    <NavLink
                        to="users"
                        className={({ isActive }) =>
                            `block p-2 rounded-lg transition ${isActive ? "bg-purple-600" : "hover:bg-purple-600"
                            }`
                        }
                        onClick={() => setIsOpen(false)}
                    >
                        👥 Student Enrolled
                    </NavLink>

                    <button
                        onClick={handleLogout}
                        className="w-full text-left bg-red-600 hover:bg-red-700 p-2 rounded-lg transition"
                    >
                        🚪 Logout
                    </button>
                </nav>
            </aside>

            {/* Overlay only on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <header className="bg-gray-900 shadow-lg p-4 flex justify-between items-center z-20">
                    <button
                        className="md:hidden text-purple-400"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                    <h2 className="text-xl font-semibold text-purple-300">
                        Welcome, {user?.name}
                    </h2>
                </header>

                {/* Main content */}
                <main className="flex-1 p-6 bg-gray-950 rounded-tl-2xl shadow-inner overflow-auto pb-24">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
