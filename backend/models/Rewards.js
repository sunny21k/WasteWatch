import mongoose from "mongoose"; 

const rewardsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    pointsEarned: {
        type: Number,
        required: true,
    },
    reason: {
        type: String,
        enum: [
            "report_submission",
            "waste_collection"
        ]
    },
    dateEarned: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String, 
        default: ""
    }
}, {timestamps: true})

const Reward = mongoose.model("Rewards", rewardsSchema);
export default Reward;