const Forum = require("../models/forum");
const User = require("../models/user");

exports.getPostById = async (req, res) => {
    const postId = req.postId
  await Forum.findById(postId, (err, post) => {
      if(err || !post){
          return res.status(400).json({
              error: "Could not find post"
          })
      }

      const userId = post.userId;
      User.findById(userId, (err, user) => {
          if(err || !user){
              return res.status(400).json({
                error: "Invalid post request"
            })
          }

          return res.json({
              post:{
                  id: post._id,
                  message: post.message
              },
              userInfo: {
                  email: user.email,
                  name: user.name
              }
          })

      })
  })
};

exports.uploadBlog = (req, res) => {
  const blogPost = new Forum(req.body);
  blogPost.save((err, post) => {
    if (err) {
      return res.status(400).json({
        error: "Not able to upoad the post",
      });
    }
    res.json({
      message: "Blog uploaded successfully.",
    });
  });
};
