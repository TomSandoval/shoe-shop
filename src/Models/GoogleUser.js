import mongoose, { mongo } from "mongoose";

const { Schema } = mongoose;

const googleUserSchema = new Schema({
    name: {
        type: String,
        unique: false,
        require: true
    },
    email: {
        type: String,
        unique: true,
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
})

export default mongoose.models.GoogleUser || mongoose.model("GoogleUser", googleUserSchema)