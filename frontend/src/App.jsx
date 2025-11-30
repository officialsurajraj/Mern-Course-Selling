import React from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./pages/common/Footer"
import Home from "./pages/common/Home"

import AdminLayout from './layouts/AdminLayout'

import AdminRoute from "./routes/AdminRoute"
import StudentRoute from "./routes/StudentRoute"

import AdminDashboard from "./pages/admin/AdminDashboard"
import StudentDashboard from "./pages/student/StudentDashboard"

import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

// import AdminAddCourses from "./pages/admin/AddCourses"
// import AdminCourses from "./pages/admin/Courses"
// import AdminCreateCourse from "./pages/admin/CreateCourse"
// import AdminCreateLecture from "./pages/admin/CreateLecture"
// import AdminEditLecture from "./pages/admin/EditLecture"
import Courses from './pages/admin/Courses'


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/admin'
          element={
            <AdminRoute role={"admin"}>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path='courses' element={<Courses />} />

        </Route >

      </Routes>
      <Footer />
    </>
  )
}

export default App