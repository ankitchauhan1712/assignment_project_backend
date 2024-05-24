//Import------------------------------------------------------------------------------------------------
import mongoose from "mongoose";
const Schema = mongoose.Schema;
//END---------------------------------------------------------------------------------------------------

const userSchema = new Schema(
  {
    name: { type: String }, 
    email: { type: String, lowercase: true , index: true },    
    phone_number: { type: String },
    image: { type: String },
    password: { type: String },   
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);

export default User;
