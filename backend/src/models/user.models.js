import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        role: {
            type: String,
            enum: ["admin", "student"],
            default: "student",
            required: true
        },
        photoUrl: {
            type: String,
            default: ""
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Course"
            }
        ],

    },
    { timestamps: true })

const User = mongoose.model("User", userSchema)

export { User }