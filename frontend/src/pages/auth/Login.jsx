import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            user.role === "admin" ? navigate("/admin") : navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🚀 Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const data = await login(formData);
            console.log("Login Success:", data);

            // Role-based redirect
            if (data?.user?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.message || "Invalid email or password");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-gray-900 to-black px-6">
            <div className="bg-gray-800 p-10 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-purple-400 mb-6 text-center">
                    Login
                </h2>

                {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                        disabled={submitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium mt-2 disabled:opacity-50"
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-gray-400 mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-purple-400 hover:text-purple-300">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
