import { Routes, Route } from "react-router-dom"
import StudentRoute from "./routes/StudentRoute"
import AdminRoute from "./routes/AdminRoute"
import Navbar from './components/Navbar'
import Home from "./pages/common/Home"
import Footer from './pages/common/Footer'
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"

import AdminDashboard from './pages/admin/AdminDashboard'
import StudentDashboard from './pages/student/StundetDashboard'



const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        {/* public routes */}
        <Route path='/' element={<Home />} />

        {/* Auth Routes */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Student Dashboard */}

        <Route path='/dashboard' element={<StudentRoute role="student">
          <StudentDashboard />
        </StudentRoute>} />


        {/* Admin Dashboard */}
        <Route path='/admin' element={<AdminRoute role="admin">
          <AdminDashboard />
        </AdminRoute>} />

      </Routes>
      <Footer />
    </>
  )
}

export default App