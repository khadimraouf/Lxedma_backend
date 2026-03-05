const mongoose = require("mongoose");
const jobPost = require("../model/post");

const jwt = require("jsonwebtoken");

async function delJob(req, res) {
    try {

        const jobID = req.params.jobID;
        
        const job = await jobPost.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.entrepriseID.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }
        await jobPost.findByIdAndDelete(job.id);

        return res.status(200).json({
            message: "Job post deleted successfully"
        });

    } catch (err) {
        return res.status(400).json({
            message: err.message,
        })
    }
}
module.exports = delJob;