const express = require('express');
const router = express.Router();

// importing jobs controller method

const {getJobs } = require("../controllers/jobsController");
const {newJob}=require("../controllers/jobsController");

router.route("/jobs").get(getJobs);
router.route("/job/new").post(newJob)

module.exports = router;

