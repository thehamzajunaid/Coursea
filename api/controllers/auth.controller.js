import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    next(err);
    // res.status(500).send("wrong")
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      {
        id: user._id,
        isTeacher: user.isTeacher,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};

export const changePassword = async (req, res, next) => {
  try {
    
    const user = await User.findOne({ email: req.body.email });
    const currentPassword = user.password; 

    const isCorrect = bcrypt.compareSync(req.body.oldPassword, currentPassword);
    if (!isCorrect) {
      return next(createError(400, "Incorrect old password"));
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(req.body.newPassword, salt);

    await User.findByIdAndUpdate(user._id, { password: newPasswordHash });

    res.status(200).send("Password has been changed successfully.");
  } catch (err) {
    next(err);
  }
};
