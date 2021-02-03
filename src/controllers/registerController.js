import {validationResult} from "express-validator";
import registerService from "../services/registerService"

let getRegisterPage = (req, res) => {
  if(req.user){
    return res.render("register", {
      user: req.user,
      errors: req.flash("errors")
    });
  } else {
    return res.render("register", {
      user: "",
      errors: req.flash("errors")
    });
  }
}

let createNewUser = async (req, res) => {
  //store errors
  let errorsArr = [];
  //validate results
  let validationErrors = validationResult(req);
  //if there are errors, store them in array and then display using flash
  if(!validationErrors.isEmpty()){
    let errors = Object.values(validationErrors.mapped());
    errors.forEach((error) => {
      errorsArr.push(error.msg);
    });
    req.flash("errors", errorsArr);
    return res.redirect("/register");
  }

  //create new user
  try {
    let newUser = {
      fname: req.body.fname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      sec_quest: req.body.sec_quest,
      sec_answer: req.body.sec_answer
    };
    await registerService.createNewUser(newUser);
    return res.redirect("/login");
  } catch(e){
    req.flash("errors", e);
    return res.redirect("/register");
  }
  console.log(req.body);
}

module.exports = {
  getRegisterPage: getRegisterPage,
  createNewUser: createNewUser
}
