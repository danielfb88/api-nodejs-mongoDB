const app = require('../server')
const env = require('../config/env')
const chai = require('chai')
const request = require('supertest')
const httpMocks = require('node-mocks-http');
const util = require('./util');

var pack = {
    app: app
    ,env: env
    ,chai: chai
    ,request: request
    ,util: util
    ,httpMocks
}

require('./user.test.js')(pack);
require('./company.test.js')(pack);
