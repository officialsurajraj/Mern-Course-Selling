export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Courses</h3>
                <p className="text-3xl font-bold mt-2">124</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <p className="text-3xl font-bold mt-2">320</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Revenue</h3>
                <p className="text-3xl font-bold mt-2">₹45,000</p>
            </div>

        </div>
    );
}
