import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwtToken from "jsonwebtoken"
import crypto from "crypto"

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
        trim: true,
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
    resetPasswordToken: String,
    resetPasswordExperies: Date
}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return;
    }
    if (!this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
})
// Above function is an even on userSchema. It will get called before user data get saved.

userSchema.methods.getWebToken = function () {
    return jwtToken.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES + 24 * 60 * 60 * 1000
    })
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex")
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExperies = Date.now() + 15 * 60 * 1000
    return resetToken
}

const User = mongoose.model("User", userSchema)
export default User
