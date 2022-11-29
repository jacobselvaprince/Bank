const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  acc_no: {
    type: Number,
    required: true,
    trim: true,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account',
  },
  balance: {
    type: Number,
    required: true,
    trim: true,
  },
  acc_type: {
    type: String,
    required: true,
    trim: true,
    enum:['CURRENT', 'SAVINGS', 'DEMAT']
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;