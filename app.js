const express = require('express');
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

const app = express();

// setting up config file
dotenv.config({path: './config/config.env'});

// custom middleware

const next = (req,res,next)=>{
    console.log("Hello from next");
}

const middleware= (req,res,next)=>{
    req.user="Siva";
    console.log("Hello from middleware");
    next();
}

// middleware
app.use(express.json());
app.use(middleware);


// connecting to database
connectDatabase();



// importing all routes

const jobs = require("./routes/jobs");

app.use("/api/v1/",jobs);

// listening to the route
PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode.`);
})
