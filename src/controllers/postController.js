const Post = require('../models/post');

exports.create = async(req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
   }
}
exports.getProducts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getProduct = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.upDateProduct = async (req, res) => {
  try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) return res.status(404).json({ message: "Post Not Found" });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};