const express = require('express');
// const os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express(); // const server = http.createServer(callback);
const port = 3000;

app.use(bodyParser.json());

app.use(cors());

app.post('/login', require('./handlers/login_register').login);
app.post('/signup', require('./handlers/login_register').register);

app.use(require('./middlewares/auth'));

app.get('/questionBank', require('./handlers/get-all-questionBank'));
app.post('/questionBank', require('./handlers/create-new-questionBank'));
app.get('/question', require('./handlers/get-all-question'));
app.post('/question', require('./handlers/create-new-question'));

app.post('/question/:Id', require('./handlers/update-question'));
app.get('/question/:Id', require('./handlers/get-question-detail'));

app.delete('/question/:Id', require('./handlers/delete-question'));

app.get('/questionBank/:Id', require('./handlers/get-questionBank-detail'));

app.listen(port, function () { console.log(`server started at port ${port}`); });


