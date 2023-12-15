const mongoose = require('mongoose')
const DrinksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide drink name'],
        maxlength: 50,
    },
    price: {
        type: Number,
        required: [true, 'please provide drink price '],
        maxlength: 100,
    }, 
    previousPrice: {
        type: Number,
        required: [true, 'please provide drink previous price '],
    },
  image: {
    type: String,
    required: [true, 'please provide image'],
  },

       
}, {timestamps: true})

module.exports = mongoose.model('Drinks',DrinksSchema)