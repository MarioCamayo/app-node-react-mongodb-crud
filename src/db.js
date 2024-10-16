import mongoose from 'mongoose'

export const connectDB = async ()=>{
  try { 
    await mongoose.connect('mongodb://localhost/merndb')
    console.log('MongoDB Connected...')
    } catch (error) {
      console.error(error.message);
      process.exit(1);
      }



}