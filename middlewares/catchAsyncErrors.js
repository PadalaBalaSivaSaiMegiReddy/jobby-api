module.exports = (func) => (req, res, next) => {
  const name = "jesse"
  Promise.resolve(func(req, res, next)).catch(next);
  console.log('catchAsyncErrors.js');
  
  
};
