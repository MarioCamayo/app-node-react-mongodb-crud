// le decimos a mongoDB como los datos vana ser guardados para no cometer errores, 
// se crea una estructura fija como una tabla

import mongoose from "mongoose";

const userSquema =  new mongoose.Schema({
  username: {
    type: String,
    required: true,
    Trim: true

  },
  email: {
    type: String,
    required: true,
    unique: true,
    Trim: true
    
  },
  password: {
    type: String,
    required: true,

  }
},{
  timestamps: true
})

export default mongoose.model('User', userSquema)