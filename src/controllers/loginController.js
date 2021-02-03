import { validationResult } from "express-validator";
import loginService from "../services/loginService";

let getLoginPage = (req, res) => {

if(req.user){
    return res.render("login", {
      errors: req.flash("errors"),
      user: req.user
    });
  } else {
    return res.render("login", {
      errors: req.flash("errors"),
      user: ""
    });
  }

};


let checkLoggedOut = (req, res, next) => {
  if(req.isAuthenticated()){
    return res.redirect("/");
  }
  next();
};

let checkLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect("/login");
  }
  next();

};

let logOut = (req, res) => {
  req.session.destroy(function(err){
    return res.redirect("/")
  });
};


module.exports = {
  getLoginPage: getLoginPage,
  checkLoggedIn: checkLoggedIn,
  checkLoggedOut: checkLoggedOut,
  logOut: logOut
};
