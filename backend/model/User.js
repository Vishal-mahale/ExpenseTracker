import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    profilePic: {
        url: {
            type: String,
            default: ""
        },
        public_id: {    //delete/update image from Cloudinary later
            type: String,
            default: ""
        }
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema)
export default User
