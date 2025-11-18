import { User } from "../models/user.models.js"


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