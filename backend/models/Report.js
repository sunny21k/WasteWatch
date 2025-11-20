import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    wasteType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["open", "pending", "collected"],
        default: "open"
    },
    collector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    pointsAwarded: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    },
    completionPhoto: {
        type: String
    },
    completionVerified: {
        type: Boolean,
        default: false
    },
    completionPointsAwarded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Report = mongoose.model("Report", reportSchema);

export default Report;
