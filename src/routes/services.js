const express = require('express');
const router = express.Router();

const accounts = require('../data').accounts;
const writeJSON = require('../data').writeJSON;

router.get('/transfer', function (request, response) {
    response.render('transfer');
});

router.post('/transfer', function (request, response) {
    var fromAccount = request.body.from;
    var toAccount = request.body.to;
    var transferAmount = parseInt(request.body.amount);
    accounts[fromAccount].balance -= transferAmount;
    accounts[toAccount].balance += transferAmount;

    writeJSON();
    response.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', function (request, response) {
    response.render('payment', { account: accounts.credit });
});

router.post('/payment', function (request, response) {
    accounts.credit.balance -= parseInt(request.body.amount);
    accounts.credit.available += parseInt(request.body.amount)

    writeJSON();
    response.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

module.exports = router;