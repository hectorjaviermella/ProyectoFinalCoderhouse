import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({ 

  products : [
    {
      quantity:  { type:Number, default:1 },   
      pId: {type: mongoose.Schema.Types.ObjectId , ref: "products" },
    }
  ]
  
});


/**
 * Mongoose middleware:
 * Aquí le decimos a mongoose que cada vez que alguien utilice la función "findOne"
 * con el modelo "students", entonces aplique un populate sobre la propiedad "courses"
 */
cartSchema.pre("findOne", function () {
  this.populate("products");
});



export const cartModel = mongoose.model(cartCollection, cartSchema);