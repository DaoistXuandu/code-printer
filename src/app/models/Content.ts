import mongoose, { Schema } from 'mongoose';

const ContentSchema = new Schema({
    teamId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    teamName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
}, { versionKey: false, timestamps: true });

ContentSchema.index({ "teamName": 1 });

export default mongoose.models.Content || mongoose.model("Content", ContentSchema)
