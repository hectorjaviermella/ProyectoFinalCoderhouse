import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "products";

const productSchema = new mongoose.Schema({ 
    pTitle : { type:String, required:true },
    pDescription : { type:String, required:true },
    pCode : { type:String, required:true },  
    pPrice : { type:Number, required:true },
    pStatus : { type:Boolean, required:true },
    pStock : { type:Number, required:true },
    pCategory : { type:String, required:true }, 
    
    pThumbnail: [ String ],
    pOwner: {
      type:String,      
        default: "admin",// Establece el valor por defecto admin
      },

});
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);