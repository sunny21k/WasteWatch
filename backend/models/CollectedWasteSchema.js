import mongoose from "mongoose";

const collectedWasteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    report: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
        required: true
    },
    collectedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["pending", "collected"],
        default: "pending"
    }

}, {timestamps: true})

const collectedWaste = mongoose.model("CollectedWaste", collectedWasteSchema);

export default collectedWaste;