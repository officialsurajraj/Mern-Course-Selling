import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
        setOpen(false);
        setDropdown(false);
    };

    const handleProfileClick = () => {
        if (user?.role === "student") {
            setDropdown(!dropdown);
        } else if (user?.role === "admin") {
            navigate("/admin");
            setOpen(false);
        }
    };

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const profileLetter = user?.name ? user.name.charAt(0).toUpperCase() : "";

    return (
        <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-lg">
            <div className="flex justify-between items-center px-6 md:px-20 py-4 max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="text-2xl font-extrabold">
                    <span className="text-purple-500">LMS</span> Hub
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 font-medium">
                    <Link to="/" className="hover:text-purple-400">Home</Link>
                    <Link to="/courses" className="hover:text-purple-400">Courses</Link>
                    <Link to="/about" className="hover:text-purple-400">About</Link>
                    <Link to="/contact" className="hover:text-purple-400">Contact</Link>
                </div>

                {/* Desktop Auth / Profile */}
                <div className="hidden md:flex items-center space-x-4 relative">
                    {!user && (
                        <>
                            <Link
                                to="/login"
                                className="px-5 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    {user && user.role === "student" && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleProfileClick}
                                className="w-10 cursor-pointer h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg hover:bg-purple-700 transition"
                            >
                                {profileLetter}
                                {/* <ChevronDown size={18} className="ml-1" /> */}
                            </button>

                            {dropdown && (
                                <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => { navigate("/dashboard"); setDropdown(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-purple-600 transition"
                                    >
                                        Dashboard
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 hover:bg-red-600 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {user && user.role === "admin" && (
                        <button
                            onClick={handleProfileClick}
                            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                        >
                            Admin Dashboard
                        </button>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button className="md:hidden" onClick={() => setOpen(!open)}>
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-4">
                    <Link to="/" className="block hover:text-purple-400" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/courses" className="block hover:text-purple-400" onClick={() => setOpen(false)}>Courses</Link>
                    <Link to="/about" className="block hover:text-purple-400" onClick={() => setOpen(false)}>About</Link>
                    <Link to="/contact" className="block hover:text-purple-400" onClick={() => setOpen(false)}>Contact</Link>

                    <div className="flex flex-col gap-3 pt-3">
                        {!user && (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition text-center"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition text-center"
                                    onClick={() => setOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        {user && user.role === "student" && (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdown(!dropdown)}
                                    className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg hover:bg-purple-700 transition mx-auto"
                                >
                                    {profileLetter} <ChevronDown size={18} className="ml-1" />
                                </button>

                                {dropdown && (
                                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                                        <button
                                            onClick={() => { navigate("/dashboard"); setDropdown(false); setOpen(false); }}
                                            className="block w-full text-left px-4 py-2 hover:bg-purple-600 transition"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 hover:bg-red-600 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {user && user.role === "admin" && (
                            <button
                                onClick={handleProfileClick}
                                className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition w-full text-center"
                            >
                                Admin Dashboard
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
