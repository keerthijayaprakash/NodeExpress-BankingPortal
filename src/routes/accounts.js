const express = require('express');
const router = express.Router();

const accounts = require('../data').accounts;

router.get('/savings', function (request, response) {
    response.render('account', { account: accounts.savings });
});

router.get('/checking', function (request, response) {
    response.render('account', { account: accounts.checking });
});

router.get('/credit', function (request, response) {
    response.render('account', { account: accounts.credit });
});

module.exports = router;