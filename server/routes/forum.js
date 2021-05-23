const express = require("express");
const router = express.Router();
const { getPostById, uploadBlog } = require("../controllers/forum");

router.param("id", (req, res, next, id) => {
  req.postId = id;
  next();
});

router.get("/blog/:id", getPostById);
router.post("/blog/upload", uploadBlog);


module.exports = router;