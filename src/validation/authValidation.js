import {check} from "express-validator";

let validateRegister = [
  check("fname", "Please enter your name").not().isEmpty().trim(),
  check("username", "Please enter a username").not().isEmpty().trim(),
  check("email", "Invalid email").isEmail().trim(),
  check("password", "Your password must contain at least 6 characters and at least one number.")
    .isStrongPassword({
      minLength: 6, minNumbers: 1, returnScore: true
    }),
  check("passwordConfirmation", "Password confirmation does not match password")
  .custom((value, { req }) => {
    return value === req.body.password
  }),
  check("sec_answer", "Please enter a security answer.").not().isEmpty().trim()
];

module.exports = {
  validateRegister: validateRegister
}
