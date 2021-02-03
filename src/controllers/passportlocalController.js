import passport from "passport";
import passportLocal from "passport-local";
import loginService from "../services/loginService";

let LocalStrategy = passportLocal.Strategy;

let initPassportLocal = () =>{
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
     async (req, username, password, done) => {
       console.log("username: " + username)
           try {
               await loginService.findUserByUsername(username).then(async (user) => {
                 console.log(username)
                   if (!user) {
                       return done(null, false, req.flash("errors", `This user "${username}" doesn't exist`));
                   }
                   if (user) {
                       let match = await loginService.comparePasswords(user.password, password);
                       if (match === true) {
                           return done(null, user, null)
                       } else {
                           return done(null, false, req.flash("errors", match)
                           )
                       }
                   }
               });
           } catch (err) {
               console.log(err);
               return done(null, false, { message: err });
           }
     }
     ))};


passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  loginService.findUserByUsername(username).then((user) => {
    return done(null, user);
  }).catch(error => {
    return done(error, null)
  });
});

module.exports = initPassportLocal;
