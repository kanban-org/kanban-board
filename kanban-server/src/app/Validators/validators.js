const { body, oneOf, validationResult } = require('express-validator')

const registerValidationRules = () => {
  return[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('userName').isString()
  ]
}
// Check the input is a valid email/userName and password
const loginValidationRules = () => {
  return[
    oneOf([
      body('userName').exists().withMessage('userName/email is required'),
      body('userName').exists().isEmail().withMessage('userName/email is not valid'),
    ]),
    body('password').isLength({ min: 6 }).exists().withMessage('password is required'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  registerValidationRules,
  loginValidationRules,
  validate
}