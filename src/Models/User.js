import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;


const userSchema = new Schema(
    {
        name: {
            type: String,
            unique: false,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            unique: false,
            required: true
        },
        roll: {
            type: String,
            enum: ["ADMIN", "USER"],
            unique: false,
            required: true,
            default: "USER"
        },
        status: {
            type: Boolean,
            required: true,
            unique: false,
            default: true
        }
    }
)

export default mongoose.models.User || mongoose.model("User", userSchema)