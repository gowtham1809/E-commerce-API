const User = require("../models/user");

exports.create = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = new User({
      name: fullName,
      email,
      password: hashPassword(password),
    });
    await user.save();

    const painUser = user.toObject();
    delete painUser.password;
    res.status(201).json(painUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.get = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.put = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id || new mongoose.Types.ObjectId() },
      req.body,
      { new: true, upsert: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    const painUser = user.toObject();
    delete painUser.password;
    res.json(painUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "deleted successfully", deleted: user.name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
