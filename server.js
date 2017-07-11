const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const config = require('./server/config.json');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(expressJwt({ secret: config.secret }).unless({ path: ['/register', '/login', '/api/users/authenticate', '/api/users/register'] }));

app.use('/api', require('./server/controllers/users.controller'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));