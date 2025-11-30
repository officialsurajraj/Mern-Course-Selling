import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">

            {/* ==== Sidebar ==== */}
            <aside className="w-64 bg-white shadow-lg border-r hidden md:flex flex-col">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                </div>

                <nav className="flex flex-col p-4 space-y-2">
                    <NavLink
                        to="/admin"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                                : "px-4 py-2 hover:bg-gray-200 rounded-md"
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/courses"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                                : "px-4 py-2 hover:bg-gray-200 rounded-md"
                        }
                    >
                        Courses
                    </NavLink>

                    <NavLink
                        to="users"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                                : "px-4 py-2 hover:bg-gray-200 rounded-md"
                        }
                    >
                        Users
                    </NavLink>

                    <NavLink
                        to="settings"
                        className={({ isActive }) =>
                            isActive
                                ? "bg-blue-500 text-white px-4 py-2 rounded-md"
                                : "px-4 py-2 hover:bg-gray-200 rounded-md"
                        }
                    >
                        Settings
                    </NavLink>
                </nav>
            </aside>

            {/* ==== Main Content Area ==== */}
            <div className="flex flex-col flex-1">

                {/* ==== Header ==== */}
                <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-600">Hello, Admin</span>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                            Logout
                        </button>
                    </div>
                </header>

                {/* ==== Dynamic Page Content (from child routes) ==== */}
                <main className="p-6 flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
