const mongoose=require('mongoose');
const Schema =mongoose.Schema;

const productSchema = new Schema({
    name:{type:String, required:[true,"Please include a name"], minlength:[3,"Name must be at least 3 characters"]},
    quantity:{type:Number,required:[true,"Please include a quantity"],min:[0,"You can't have negative products silly!"]},
    price:{type:Number,required:[true,"Please include a price"],min:[0,"Please make money on this product with a positive price"]},
    specialid:Number
    },
{timestamps:true}
);


const Product = mongoose.model('Product',productSchema);
module.exports=Product;