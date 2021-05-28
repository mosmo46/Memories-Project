import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  idx: { type: String }
});


const User = mongoose.model('users',userSchema)
module.exports =User;