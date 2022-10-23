// const mongoose = require("mongoose");
const {Schema, model} =require( "mongoose")

const userSchema = Schema(
  {
    userName: { type: String, unique: true, required: true, trim: true },
    password: { type: String },
  },
  { versionKey: false }
);

const User = model("User", userSchema);

module.exports = { User };
