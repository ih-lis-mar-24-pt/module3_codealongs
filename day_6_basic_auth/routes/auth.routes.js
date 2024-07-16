const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User.model");
const router = express.Router();

const saltRounds = 10;

//POST - Signup
router.post("/signup", async (req, res, next) => {
  try {
    // accept the information from the client
    const { username, email, password } = req.body;

    // check if the information exists
    if (username === "" || email === "" || password === "") {
      res
        .status(400)
        .json({ message: "Please provide username, email and password" });
      return;
    }

    //check if email is valid
    //regex - regular expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Please provide a valid email address" });
      return;
    }

    //check if password is valid
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordRegex.test(password)) {
      res.status(400).json({
        message:
          "Your password needs to contain at least a number, a lowercase letter, an uppercase letter and have at least 6 characters",
      });
      return;
    }
    // Check if user already exists

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    // Create the user

    //hash a password

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    // newUser = {username: "Psyduck", email: "psy@duck.com", password: 76578987yfghv}

    const cleanUser = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(201).json(cleanUser);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//POST - Login
router.post("/login", async (req, res, next) => {
  try {
    const { password, email } = req.body;

    //check if values exist
    if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password" });
      return;
    }

    //check if user exists
    const userExists = await User.findOne({ email });

    if (!userExists) {
      res.status(400).json({ message: "Email not found" });
      return;
    }

    //compare password
    const passwordCorrect = bcrypt.compareSync(password, userExists.password);
    //const passwordCorrect = bcrypt.compareSync("pikachuRocks25", "$2a$10$MvEsj/uFT50lZXF83G6c2.yOZAscHncfbLIq/Ri1C.FH5HQbpZl");
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET - Verify

module.exports = router;