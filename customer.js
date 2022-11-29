const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street1: {
        type: String,
        required: true,
        trim: true
    },
    street2: String,
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        enum:['TAMILNADU', 'KARNATAKA', 'TELUNGANA', 'ANDHRA'],
        trim: true
    },
    country: String,
    zip: String,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;