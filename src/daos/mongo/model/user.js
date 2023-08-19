import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  documents : [
    {
      name:  { type:String },   
      reference: {type: String},
    }
  ],
  last_connection: {
    type: Date
    
  },
  profile : 
    {
      name:  { type:String },   
      reference: {type: String},
    }
  
});



//export const userModel = mongoose.model(userCollection, userSchema);

userSchema.plugin(mongoosePaginate);

export const userModel = mongoose.model(userCollection, userSchema);