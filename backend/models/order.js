import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    user: {
      type: Object,
      required: true,
    },
    paymentMethodId: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    time:{
      type:Date,
      required:true,
    },
    amount: {
      type: Number,
    },
    status:{
      type:String,
      default:"process",
    },
    order: [
        {
            id: {
                type: String,
                required: true,
              },
              cakeid: {
                type: String,
                required: true,
              },
              name: {
                type: String,
              },
              image: {
                type: [String],
                required: true,
              },
              flavour: {
                type: String,
                required: true,
              },
          amount: {
            type: Number,
            default:1,
          },
          price: {
            type: Number,
            default:0,
          },
          wt: {
            type: Number,
            required: true,
          },
          bname:{
            type: String,
          },
          customize:{
            type: Boolean,
            default:false,
          },
          detail:{
            type: String,
          },
          isConfirmed:{
            type:String,
            default:"processing",
          }

        }
      ],
      chargeId: {
        type: String, // Adjust the data type as needed
        required: false, // Set to true if chargeId is required
      },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });
  
  export const Order = mongoose.model('Order', orderSchema);
  