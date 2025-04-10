import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },

    complaintType: {
        type: String,
        enum: [
            "Bill not generated",
            "Bill not correct",
            "Previous issue not resolved",
            "Other",
        ],
        required: true,
    },

    description:{
        type: String,
    },

    status: {
        type: String,
        enum : [
            "UNRESOLVED",
            "RESOLVED",
            "IN_PROGRESS",
        ],
        default: "UNRESOLVED",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const complaintModel = mongoose.model("complaint", complaintSchema);