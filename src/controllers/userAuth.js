const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  const salt = 5;
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ page: "getUserInfo", message: error.message });
  }
};

signUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.create({
      name: fullName,
      email,
      password: await hashPassword(password),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

login = async (req, res) => {
  // console.log(req);

  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // res.clearCookie('jwt')

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    const painUser = user.toObject();
    delete painUser.password;

    res.status(200).json(painUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  getUserInfo,
  signUp,
  login,
  logout,
};
