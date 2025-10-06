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
    verfied: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["pending", "collected"],
        default: "pending"
    }
}, {timestamps: true})

const Report = mongoose.model("Report", reportSchema);

export default Report;