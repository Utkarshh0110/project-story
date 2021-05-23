const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const forumSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
      message:{
        type: String,
        required: true
      }
});


module.exports = mongoose.model("Forum", forumSchema);