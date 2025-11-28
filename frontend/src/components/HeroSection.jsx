import React from 'react'
import { Link } from "react-router-dom"

const HeroSection = () => {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center justify-center px-6 md:px-20">

                {/* Content Wrapper */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">

                    {/* Left Text Section */}
                    <div className="max-w-xl text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Master <span className="text-purple-500">Technology</span>, <br />
                            Build Your <span className="text-purple-400">Future</span>
                        </h1>
                        <p className="mt-6 text-gray-300 text-base md:text-lg">
                            Upgrade your skills with top-notch courses in programming,
                            cybersecurity, and technology. Learn at your own pace and
                            achieve your dream career.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to='/'>
                                <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg text-lg font-medium transition">
                                    Get Started
                                </button>
                            </Link>
                            <Link to='/courses'>
                                <button className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg text-lg font-medium transition">
                                    View Courses
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
                        <img
                            src="https://img.freepik.com/premium-photo/hacker-code-laptop-cyber-security-privacy-hack-threat-coder-programmer-writing-virus-software-malware-internet-attack-developing-digital-design_1029473-54561.jpg"
                            alt="Programming"
                            className="w-full max-w-sm rounded-lg"
                        />
                    </div>

                </div>

            </div>
        </>
    )
}

export default HeroSection