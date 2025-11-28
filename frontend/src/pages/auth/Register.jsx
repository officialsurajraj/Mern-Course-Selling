import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const { user, register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            user.role === "admin" ? navigate("/admin") : navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await register(formData);
            console.log("Register Success:", data);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Register Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black px-6">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
                    Register
                </h2>

                {error && <p className="text-red-400 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-purple-500"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-purple-500"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-purple-500"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mt-2"
                    >
                        Register
                    </button>
                </form>

                <p className="text-gray-400 mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-purple-400 hover:text-purple-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
