const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    entrepriseName: {
        type: String,
        required: true
    },
    days: {
        type: [String],
        enum: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        required: true
    },
    time: {
        start: { type: String, required: true },
        end: { type: String, required: true }
    },
    payment: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 1000
    },
    requirements: {
        type: [String],
        required: true,
        validate: {
            validator: value => value.length <= 4,
            message: "Maximum 4 requirements allowed"
        }
    },
    contactNB: {
        type: [String],
        required: true,
        validate: {
            validator: value => value.length <= 3,
            message: "Maximum 3 numbers allowed"
        }
    },
    contactMail: {
        type: [String],
        required: true,
        validate: {
            validator: value => value.length <= 3,
            message: "Maximum 3 emails allowed"
        }
    },
    website: {
        type: String,
        required: true
    },
    entrepriseID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const jobPost = mongoose.model("jobPost", postSchema);

module.exports = jobPost ;