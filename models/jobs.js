const mongoose = require("mongoose");
const slugify = require("slugify");

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[false,"Please enter job title"],
        trim:false,
        maxlength:[100,"Job title cannot exceed 100 characters."]
    },
    slug: String,
    description:{
        type:String,
        required:[false,"Please enter job description"],
        maxlength:[1000,"Job description cannot exceed 1000 characters."]
    },
    email:{
        type:String,
    },
    address:{
        type:String,
        required:[false,"Please enter the address"]
    },
    location:{
        type:{
            type:String,
            enum:["Point"]        },
        coordinates:{
            type:[Number],
            index:"2dsphere"
        },
        formattedAddress:String,
        city:String,
        state:String,
        zipcode:String,
        country:String
    },
    company:{
        type:String,
        required:[false,"Please enter the company name"]
    },
    industry:{
        type:[String],
        required:[false,"Please select the industry for this job"],
        enum:{
            values:[
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Telecommunication',
                'Others'
            ],
            message:"Please select correct options for industry"
        }
    },
    jobType:{
        type:String,
        required:[false,"Please select job type"],
        enum:{
            values:[
                'Permanent',
                'Temporary',
                'Internship'
            ],
            message:"Please select correct options for job type"
        }
    },
    minEducation:{
        type:String,
        required:[false,"Please select minimum education"],
        enum:{
            values:[
                'Bachelors',
                'Masters'
            ],
            message:"Please select correct options for education"
        }
    },
    positions:{
        type:Number,
        default:1
    },
    experience:{
        type:String,
        required:[false,"Please select experience"],
        enum:{
            values:[
                'No Experience',
                '1 Year - 2 Years',
                '2 Years - 5 Years',
                '5 Years+'
            ],
            message:"Please select correct options for experience"
        }
    },
    salary:{
        type:Number,
        required:[false,"Please enter expected salary for this job"]
    },
    postingDate:{
        type:Date,
        default:Date.now
    },
    lastDate:{
        type:Date,
        default:new Date(Date.now()+7*24*60*60*1000)
    },
    applicantsApplied:{
        type:[Object],
        select:false
    },
    skills: {
        type: [String],
        required: [false, "Please enter required skills for this job"]
    }
})

// create job slug before saving 
jobSchema.pre("save",function(next){
    // creating slug before saving to db
    this.slug = slugify(this.title,{lower:true});
    next();
})

module.exports = mongoose.model("Job",jobSchema);