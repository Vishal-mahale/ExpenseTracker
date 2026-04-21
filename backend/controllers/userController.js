import User from "../model/User.js"
import { v2 as cloudinary } from 'cloudinary'
import bcrypt from 'bcrypt'


const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields (name,email,password) are required"
            })
        }
        if (name.length < 2) {
            return res.status(400).json({
                message: "Name must be at least 2 characters."
            })
        }
        if (!isValidEmail(email)) {
            return res.status(400).json({
                message: "Invalid email format."
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters."
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            res.status(400).json({
                message: "User with this email already exists."
            })
        }
        let profilePic = {
            url: "",
            punlic_id: ""
        }
        const image = await cloudinary.uploader.upload("E:/Expense Tracker/avatar.png", {
            folder: "finance_users"
        })
        console.log(image);
        profilePic = {
            url: image.secure_url,
            public_id: image.public_id
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            profilePic: profilePic
        })

        const userResponse = {
            name: userData.name,
            email: userData.email,
            profilePic: userData.profilePic
        }

        res.status(201).json({
            message: "User registered successfully",
            user: userResponse,
            success: true
        });

    }
    catch (error) {
        console.log(error);
        return res.status(400).send({
            message: "Unable to register user.",
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
        return res.status(404).json({ message: "Invalid Email or Password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(404).json({ message: "Invalid Email or Password" }); const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(200).cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message: `Welcome back, ${user.name}`,
    });
};