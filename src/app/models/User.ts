import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    attempt: {
        type: Number,
        required: true
    }
}, { timestamps: false, versionKey: false });

export default mongoose.models.User || mongoose.model("User", UserSchema);
