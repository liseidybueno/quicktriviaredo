import express from "express";
import loginController from "../controllers/loginController";
import registerController from "../controllers/registerController"
import auth from "../validation/authValidation"
import passport from "passport";
import initPassportLocal from "../controllers/passportlocalController"
import homePageController from "../controllers/homePageController"
import questionController from "../controllers/questionController"

let router = express.Router();

initPassportLocal();

let initWebRoutes = (app) => {
    // router.get("/", loginController.checkLoggedIn, homePageController.getHomepage);

    router.get("/", homePageController.getHomepage);

    // router.get("/login", loginController.checkLoggedOut, loginController.getLoginPage);

  router.get("/login", loginController.getLoginPage);

    router.post("/login", passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      successFlash: true,
      failureFlash: true
    }));

    router.get('/register', registerController.getRegisterPage);

    router.post('/register', auth.validateRegister, registerController.createNewUser);

    router.post('/logout', loginController.logOut);

    router.post('/quizquestions/:questionNumber', questionController.showQuestion)

    return app.use("/", router);
};
module.exports = initWebRoutes;
