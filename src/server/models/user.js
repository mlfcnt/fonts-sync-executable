const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
