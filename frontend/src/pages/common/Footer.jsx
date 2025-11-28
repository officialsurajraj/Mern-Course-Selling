import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-gray-300 py-10 px-6 md:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Brand / About */}
                <div>
                    <h2 className="text-2xl font-extrabold text-white">
                        <span className="text-purple-500">LMS</span> Hub
                    </h2>
                    <p className="mt-4 text-sm text-gray-400">
                        The #1 platform to master coding, cybersecurity, and business skills.
                        Learn at your own pace and boost your career growth.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link to="/" className="hover:text-purple-400">Home</Link></li>
                        <li><Link to="/courses" className="hover:text-purple-400">Courses</Link></li>
                        <li><Link to="/about" className="hover:text-purple-400">About</Link></li>
                        <li><Link to="/contact" className="hover:text-purple-400">Contact</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
                    <p className="text-sm">📍 New Delhi, India</p>
                    <p className="text-sm">📧 support@lmshub.com</p>
                    <p className="text-sm">📞 +91 98765 43210</p>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} <span className="text-purple-400">LMS Hub</span>. All Rights Reserved.
            </div>
        </footer>
    );
}
