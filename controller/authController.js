import { userModel } from "../model/authModel.js";
import bcrypt from "bcrypt";
import "dotenv/config.js";
import jwt from "jsonwebtoken";

export function register(req, res) {
  const { userEmail, password } = req.body;

  const jsonToken = jwt.sign(
    { userEmail, password },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10m" }
  );
  console.log(jsonToken);

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      userModel.find({ email: userEmail }).then((response) => {
        if (response.length == 0) {
          const userObject = new userModel({
            email: userEmail,
            password: hashedPassword,
          });

          userObject
            .save()
            .then((response) =>
              res.json({
                message: "User registered successfully",
                token: jsonToken,
              })
            )
            .catch((err) => console.log(err));
        } else {
          res.json({
            message: "You have already registered. Please login...",
          });
        }
      });
    })
    .catch((err) => console.log(err));
}

export function login(req, res) {
  const { userEmail, password } = req.body;
  const { token } = req.headers;
  //   console.log(token);
  console.log("login");

  userModel.find({ email: userEmail }).then((response) => {
    // console.log(response);
    console.log(jwt.verify(token, process.env.JWT_SECRET_KEY));

    bcrypt.compare(password, response[0].password).then((resp) => {
      resp
        ? res.json({ message: "Login success" })
        : res.json({ message: "Invalid credentials" });
    });
  });
}

// new user registration ------------
// send user data to the server from client; along with request body
// encrypt the user data
// saving the encrypted data in the mongoDB through mongoose model

// existing user login ------------
// send user data to the server from client; along with request body
// check the user data available in the DB
// If yes, compare the credentials
// If matches, send success response
// If not, send failure response
