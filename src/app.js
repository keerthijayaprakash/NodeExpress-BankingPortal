const fs = require('fs');
const path = require('path');

const express = require('express');
const { urlencoded } = require('express');
const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(path.join(__dirname, './json/accounts.json'), { encoding: 'utf8' });
const accounts = JSON.parse(accountData);

app.get('/', function (request, response) {
    response.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', function (request, response) {
    response.render('account', { account: accounts.savings });
});

app.get('/checking', function (request, response) {
    response.render('account', { account: accounts.checking });
});

app.get('/credit', function (request, response) {
    response.render('account', { account: accounts.credit });
});

app.get('/transfer', function (request, response) {
    response.render('transfer');
});

app.post('/transfer', function (request, response) {
    var fromAccount = request.body.from;
    var toAccount = request.body.to;
    var transferAmount = parseInt(request.body.amount);
    accounts[fromAccount].balance -= transferAmount;
    accounts[toAccount].balance += transferAmount;

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    response.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', function (request, response) {
    response.render('payment', { account: accounts.credit });
});

app.post('/payment', function (request, response) {
    accounts.credit.balance -= parseInt(request.body.amount);
    accounts.credit.available += parseInt(request.body.amount)

    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

    response.render('payment', { message: 'Payment Successful', account: accounts.credit });
});

const userData = fs.readFileSync(path.join(__dirname, './json/users.json'), { encoding: 'utf8' });
const users = JSON.parse(userData);

app.get('/profile', function (request, response) {
    response.render('profile', { user: users[0] });
});

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!');
});