const mongoose = require("mongoose");
const OrdersSchema = new mongoose.Schema(
  {
    ordersProducts: [
      {
        name: {
          type: String,
          required: [true, "please provide product name"],
        },
        price: {
          type: Number,
          required: [true, "please provide product price "],
          maxlength: 100,
        },
        image: {
          type: String,
          required: [true, "please provide image"],
        },
      },
    ],
    status: {
      type: String,
      enum: ["confirmed", "unconfirmed", "processing", "shipped", "delivered"],
      default: "unconfirmed",
    },
    purchaserInfo: {
      name: {
        type: String,
        required: [true, "please provide purchaser name"],
      },
      phone: {
        type: String,
        required: [true, "please provide purchaser contact"],
      },
      email: {
        type: String,
        required: [true, "please provide purchaser email"],
      },
      userId: {
        type: String,
        required: [true, "please provide purchaser id"],
      },
    },
    shippingAddress: {
        type: String,
        required: [true, "please provide shipping address"],
      },
      orderId: {
        type: String,
        required: [true, "please provide order id"],
      },
      totalPrice: {
        type: Number,
        required: [true, "please provide order total price "],
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", OrdersSchema);
