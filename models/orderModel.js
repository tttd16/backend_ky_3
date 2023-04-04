const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderItems: [{
        name: {type: String, required: true},
        qty:{type: Number, required:true, default: 0},
        image: {type: String, required: true},
        price: {type:Number, required:true, default: 0},
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Product"
        }
    }],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalCode: {type:String, required:true},
        country:{type:String, required:true}
    }, 
    paymentResult: {
        id: {type: String},
        status:{type: String},
        email_address: {type:String},
        update_time: {type: String} 
    },
    paymentMethod: { type: String, required: true},
    shippingPrice:{type:Number, required: true, default: 0},
    totalPrice: {type: Number, default: 0},
    isPaid: {type: Boolean, required: true, default:false}
})

const Order = mongoose.model("Order", OrderSchema)

export default Order