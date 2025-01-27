const express = require('express');
const router = express.Router();

// importing jobs controller method

const {getJobs,newJob,updateJob,deleteJob,getJob,jobStats } = require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/job/new").post(newJob)
router.route("/job/:id").put(updateJob);
router.route("/job/:id").delete(deleteJob);
router.route("/job/:id/:slug").get(getJob);
router.route("/stats/:topic").get(jobStats);

module.exports = router;

