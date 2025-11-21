import { User } from "../models/user.models.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessToken = async (userId) => {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    return { accessToken }
}

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(401).json({ message: "Please fill all the fields" });
    }
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        return res.status(401).json({ message: "This User is already exist in tha database" })
    }
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    const createUser = await User.findById(user._id).select("-password");
    return res.status(201).json({ message: "User register successfully now", createUser })
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "User is not Exist now" })
    };
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Password is incorrect now"
        })
    }
    const { accessToken } = await generateAccessToken(user._id)


    const loggedInUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .json({ message: "User logged in successfully", loggedInUser, accessToken })
}

export const logout = async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                accessToken: 1
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .json({ message: "user successfully logout now" })
}
export const uploadImage = async (req, res) => {
    try {
        const image = req.file?.path
        console.log(req.file)
        if (!image) {
            return res.status(404).json({ message: "Image is not found" })
        }
        const user = await User.findByIdAndUpdate(req.user._id,
            {
                $set: {
                    photoUrl: image
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json({ message: "Image Successfully uploaded now ", user })

    } catch (error) {
        console.log(`Image Uploading Failed now : ${error}`)
    }

}

export const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Old and new password are required" })
    }
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect current password" });
    }
    user.password = newPassword;
    await user.save()

    return res.status(200).json({ message: "password Successfully Chanaged" })

}
export const getCurrentUser = async (req, res) => {
    return res.status(200).json(
        {
            message: "Current User data",
            data: req.user
        }
    )
}
export const updateAccountDetails = async (req, res) => {
    const { name, description } = req.body
    if (!name || !description) {
        return res.status(400).json({ message: "Please Enter your information" })
    }
    const user = await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                name: name,
                description: description
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200).json({ message: "User information update successflly now", user })
}