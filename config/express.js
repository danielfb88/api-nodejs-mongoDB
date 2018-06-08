const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const express_validator = require('express-validator');
const cors = require('./cors');

const app = express();

require('./loggerConfig')(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express_validator());
app.use(cors);
app.set('secret', 's3nh4f0rt3!#%');

//disable information x-powered-by from header
app.disable('x-powered-by');

consign({cwd: 'app'})
.include('models')
.then('util')
.then('api')

// load first
.then('routes/user.js') // When ready to production, comment this line
.then('routes/auth.js')
.then('routes/acl.js')

// load the rest now
.then('routes')
.into(app);

module.exports = app;
