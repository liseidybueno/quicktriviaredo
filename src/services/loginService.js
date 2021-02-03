import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";

let findUserByUsername = (username) => {

  return new Promise((resolve, reject) => {
    try {
      connection.query("SELECT * FROM USERS WHERE username = ?", username, async (err, results, fields) => {
          if(err){
            reject(err)
          } else {
            let user = results[0];
            resolve(user);
          }
      });
  } catch (err){
      reject(err);
    }
  });

};

let comparePasswords = (password, entered_password) => {
  return new Promise(async (resolve, reject) => {
    let salt = bcrypt.genSaltSync(10);
    let entered = bcrypt.hashSync(entered_password)
    try {
      bcrypt.compare(entered_password, password, function(err, isMatch){
        if(err) {
          reject(err)
        } else {
          if(isMatch){
            resolve(true);
            console.log("is a match")
          } else {
            resolve("The password that you've entered is incorrect.")
          }
        }
      });
    } catch(e) {
      reject(e);
    }
  })
};


module.exports = {
  findUserByUsername: findUserByUsername,
  comparePasswords: comparePasswords
};
