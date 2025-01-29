const Job = require('../models/jobs');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// get all jobs => /api/v1/jobs
exports.getJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find();
    res.status(200).json({
        success: true,
        results: jobs.length,
        data: jobs
    });
});

// create new job => /api/v1/job/new
exports.newJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.create(req.body);
    res.status(201).json({
        success: true,
        message: "job created successfully",
        data: job
    });
    next();
});

// get single job with id and slug => /api/v1/job/:id/:slug
exports.getJob = catchAsyncErrors(async (req, res, next) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorHandler("job not found", 404));
    }

    res.status(200).json({
        success: true,
        data: job
    });
});

// update job => /api/v1/job/:id
exports.updateJob = catchAsyncErrors(async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorHandler("job not found", 404));
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        message: "job updated successfully",
        data: job
    });
});

// delete job => /api/v1/jon/:id
exports.deleteJob = catchAsyncErrors(async (req, res, next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        return next(new ErrorHandler("job not found", 404));
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "job deleted successfully"
    });
});

// get stats about topic(job) => /api/v1/stats/:topic
exports.jobStats = catchAsyncErrors(async (req, res, next) => {
    const stats = await Job.aggregate([
        {
            $match: { $text: { $search: "\"" + req.params.topic + "\"" } }
        },
        {
            $group: {
                _id: { $toUpper: '$experience' },
                totalJobs: { $sum: 1 },
                avgPosition: { $avg: '$positions' },
                avgSalary: { $avg: '$salary' },
                minSalary: { $min: '$salary' },
                maxSalary: { $max: '$salary' }
            }
        }
    ]);

    if (stats.length === 0) {
        return next(new ErrorHandler("No stats found for this job", 404));
    }

    res.status(200).json({
        success: true,
        data: stats
    });
});

