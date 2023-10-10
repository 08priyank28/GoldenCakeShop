import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    flavours: {
      type: [String], 
    required: true,
    },
    weight: {
        type:[Number],
        required:true,
      },
      image: {
        type:[String],
        required:true,
      },
      description: {
        type:String,
        required:true,
      },
      category: {
        type:String,
        required:true,
      },
      egg: {
        type:String,
        required:true,
      },
      featured: {
        type:Boolean,
        required:true,
      },
      stars:{
        type:Number,
        required:true,
      },
      reviews:{
        type:[String],
        required:true,
      }
  });
  
  export const Cake = mongoose.model("Cake", schema);