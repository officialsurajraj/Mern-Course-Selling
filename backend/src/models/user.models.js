import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs";

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


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}
const User = mongoose.model("User", userSchema)

export { User }