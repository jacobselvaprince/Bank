require('dotenv').config();
require('./db/mongoose');

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Validator = require('Validator');

const Customer = require('./model/customer');
const Account = require('./model/account');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/customer', async (req, res) => {
  try{

    const rules = {
        name: 'required',
        address: 'required',
        acc_no: 'required',
        balance: ['required', 'min=5000'],
        acc_type: 'required',
    }
    const messages = {
        required: 'Please enter the :attr field',
        min: 'Please deposit minimum 5000'
    };

    const v = Validator.make(req.body, rules, messages);

    if (v.fails()) {
        const errors = v.getErrors();
        console.log(errors);
        res.status(400).send(errors);
        return;
    }

    var cusObj = {
        name: req.body.name,
        address: req.body.address
    }
    var customer = new Customer(cusObj);
    await customer.save();

    var accObj = {
        acc_no: req.body.acc_no,
        customer_id: customer._id,
        balance: req.body.balance,
        acc_type: req.body.acc_type
    }
    var account = new Account(accObj);
    await account.save();
    res.status(201).send('Customer Saved Succesfully');
  }catch(e){
    console.log(e);
    res.status(500).send('Unable to save a customer');
  }
})

app.listen(process.env.PORT || 7000, ()=>{
    console.log("The server is upon port: 7000")
})