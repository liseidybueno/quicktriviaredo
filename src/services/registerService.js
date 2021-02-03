import connection from "../configs/connectDB";
import bcrypt from "bcryptjs";

let createNewUser = (user) => {

  console.log(user.email)

  return new Promise(async (resolve, reject) => {

      try {
        //check if email exists in DB
        let checkEmail = await checkEmailUser(user.email)
        if(checkEmail){
          reject($(user.email) + " already exists in the database.")
        } else {
          let salt = bcrypt.genSaltSync(10);
          let data = [user.fname, user.username, user.email, bcrypt.hashSync(user.password), user.sec_quest, user.sec_answer];

          connection.query("INSERT INTO USERS (fname, username, email, password, sec_quest, sec_answer) VALUES (?, ?, ?, ?, ?, ?)", data, function(error, results) {
            if(error){
              reject(error);
            }
            resolve("Created a new user successfully!");
          });

        }

      } catch(e) {
        reject (e);
      }

  });

};

let checkEmailUser = (email) => {
  return new Promise((resolve, reject) => {
    try {
      connection.query("SELECT * FROM USERS WHERE email = ?", email, function(error, results){
        if(error){
          reject(error);
        }
        if(results.length > 0){
          resolve(true)
        } else {
          resolve(false)
        }
      });
    } catch(e){
      reject(e);
    }
});
}

module.exports = {
  createNewUser: createNewUser
}
