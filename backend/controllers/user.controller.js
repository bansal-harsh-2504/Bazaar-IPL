import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        message: "Login successfull",
        token,
        iplTeam: user.iplTeam,
        userName: user.name,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log("Error in Login User Controller : ", error.message);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Password is too short." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const teams = ["rcb", "dc", "gt", "csk", "kkr", "mi"];

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      iplTeam: teams[Math.floor(Math.random() * teams.length)],
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      iplTeam: newUser.iplTeam,
      userName: user.name,
    });
  } catch (error) {
    console.log("Error in Register User Controller : ", error.message);
    res.json({ success: false, message: "Internal Server Error" });
  }
};
