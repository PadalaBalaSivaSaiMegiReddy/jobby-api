const Job = require('../models/jobs');

// get all jobs => /api/v1/jobs
exports.getJobs=async (req,res,next)=>{

    const jobs = await Job.find();
    res.status(200).json({
        success:true,
        results:jobs.length,
        data : jobs
    });
}

// create new job => /api/v1/job/new
exports.newJob= async (req,res,next)=>{
    const job = await Job.create(req.body);
    res.status(200).json({
        success:true,
        message:"job created successfully",
        data:job
    }) 
}

// get single job with id and slug => /api/v1/job/:id/:slug 
exports.getJob = async (req,res,next)=>{
    const job = await Job.findById(req.params.id);

    if(!job){
        return res.status(404).json({
            success:false,
            message:"job not found"
        })
    }

    res.status(200).json({
        success:true,
        data:job
    })
}

// update job => /api/v1/job/:id
exports.updateJob= async (req,res,next)=>{
    let job = await Job.findByIdAndUpdate(req.params.id);

    if(!job){
        return res.status(404).json({
            success:false,
            message:"job not found"
        })
    }

    job = await Job.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        success:true,
        message:"job updated successfully",
        data : job
    })
}

// delete job => /api/v1/jon/:id

exports.deleteJob = async (req, res,next) => {
    let job = await Job.findById(req.params.id);

    if (!job) {
        return res.status(404).json({
            success: false,
            message: "job not found"
        });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "job deleted successfully"
    });

    next();

}

// get stats about topic(job) => /api/v1/stats/:topic

exports.jobStats = async (req,res,next)=>{
    const stats = await Job.aggregate([
        {
            $match:{ $text: { $search: "\"" + req.params.topic + "\"" } }
        },
        {
            $group:{
                _id: { $toUpper: '$experience' },
                totalJobs: { $sum: 1 },
                avgPosition: { $avg: '$positions' },
                avgSalary: { $avg: '$salary' },
                minSalary: { $min: '$salary' },
                maxSalary: { $max: '$salary' }
            }
        }
    ]);

    if(stats.length === 0){
        return res.status(200).json({
            success:false,
            message:"No stats found for this job"
        })
    }

    res.status(200).json({
        success:true,
        data:stats
    })
    next();
}

