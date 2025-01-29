const express = require('express');
const dotenv = require('dotenv');

const connectDatabase = require('./config/database');
const errorMiddleware = require('./middlewares/errors');
const { ErrorHandler } = require('./utils/errorHandler');

const app = express();

// setting up config file
dotenv.config({ path: './config/.env' });

// custom middleware

// handling uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

// connecting to database
connectDatabase();

// importing all routes
const jobs = require('./routes/jobs');
app.use('/api/v1/', jobs);

app.all('*',(req,res,next)=>{
    throw new ErrorHandler(`Route not found`, 404);
    next();
})

// middleware
app.use(express.json());
app.use(errorMiddleware);

// Function to intentionally cause an unhandled promise rejection
function causeUnhandledRejection() {
  return new Promise((_, reject) => {
    reject(new Error('This is an intentional unhandled promise rejection'));
  });
}

// Call the function to cause the error
// causeUnhandledRejection();

// listening to the route
PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode.`,
  );
});

// handling unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

//generating an error intentionally for uncaught exception
// console.log(hgvgvghvb);
