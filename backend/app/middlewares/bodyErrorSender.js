const { validationResult } = require("express-validator");

const bodyErrorSender = (req, res, next) => {
  try {
    const allErrors = validationResult(req);
    if (!allErrors.isEmpty()) {
      let errorObject = {};

      allErrors?.array({ onlyFirstError: true })?.forEach((error) => {
        if (error?.msg) {
          errorObject = {
            ...errorObject,
            [error?.param]: error?.msg,
          };
        }
      });

      return res.status(400).json({
        succuss: false,
        message: "Invalid values provided",
        errors: errorObject,
      });
    }
    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = bodyErrorSender;
