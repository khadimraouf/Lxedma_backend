const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  pdpUrl: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  number: {
    type : [String]
  },
  role: {
    type: String,
    enum: ["user", "entreprise"],
    required: true
  },
  location: String,
  field: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, { timestamps: true });


const User = mongoose.model("User", userSchema);


module.exports = User ;
