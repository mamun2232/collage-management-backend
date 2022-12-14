const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userShema = new mongoose.Schema({
      name: {
            type: String,
            required: [true, "Please Enter Your Name"],
            maxLength: [30, "Name cannot exceed 30 characters"],
            minLength: [4, "Name should have more than 4 characters"],
          },
          email: {
            type: String,
            required: [true, "Please Enter Your Email"],
            unique: true,
          },
         
          role: {
            type: String,
            default: "user",
          }
        
})

userShema.methods.getJWTtoken = function (){
  return jwt.sign({ email: this.email }, process.env.SCRECT_TOKEN, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

const userModel = new mongoose.model('User' , userShema)


module.exports = userModel