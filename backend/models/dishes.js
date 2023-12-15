const mongoose = require('mongoose')
const DishesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide dish name'],
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'please provide dish price '],
        maxlength: 100,
    }, 
    previousPrice: {
        type: Number,
        required: [true, 'please provide dish previous price '],
    },
  image: {
    type: String,
    required: [true, 'please provide image'],
  },
  desc: {
    type: String,
    required: [true, 'please provide description'],
  }
       
}, {timestamps: true})

module.exports = mongoose.model('Dishes',DishesSchema)