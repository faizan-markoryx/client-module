// Middleware function to convert email value to lowercase
const lowerCaseEmailMiddleware = (req, res, next) => {
  if (typeof req.body.email === 'string') {
    req.body.email = req.body.email.toLowerCase();
  }
  if (typeof req.body.website === 'string') {
    req.body.website = req.body.website.toLowerCase();
  }
  next();
};

module.exports = lowerCaseEmailMiddleware;
