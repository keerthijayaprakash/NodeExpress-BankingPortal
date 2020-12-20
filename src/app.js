const fs = require('fs');
const path = require('path');

const express = require('express');
const { urlencoded } = require('express');
const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({ extended: true }));

const { accounts, users, writeJSON } = require('./data');

const accountRoutes = require('./routes/accounts');
app.use('/account', accountRoutes);
const servicesRoutes = require('./routes/services');
app.use('/services', servicesRoutes);

app.get('/', function (request, response) {
    response.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/profile', function (request, response) {
    response.render('profile', { user: users[0] });
});

app.listen(3000, function () {
    console.log('PS Project Running on port 3000!');
});