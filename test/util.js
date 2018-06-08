/*
* Class to simplify integration service tests
*
* @author Daniel Bonfim <daniel.bonfim@wexinc.com.br>
* @since 29-03-18
*/

const app = require('../server')
const request = require('supertest')

var util = {}
util.endRequest = function (_request, done) {
    _request
    .end(function(err, res) {
        if(err)
        return done(err);

        done();
    });
}

util.request = function(pack) {
    var method              = pack.method;
    var route               = pack.route;
    var body                = pack.body;
    var expectedStatus      = pack.expectedStatus;
    var expectedBody        = pack.expectedBody;
    var defaultResponse     = pack.defaultResponse;
    var done                = pack.done;
    var token               = pack.token;

    var _request = request(app);

    if(method == 'POST') _request = _request.post(route);
    else if(method == 'PUT') _request = _request.put(route);
    else if(method == 'GET') _request = _request.get(route);
    else if(method == 'DELETE') _request = _request.delete(route);

    if(body) _request = _request.send(body)

    if(token) _request = _request.set(token.key, token.value);

    _request = _request
    .set('Accept', 'application/json')
    //.expect('Content-Type', /json/)
    .expect(expectedStatus);

    if(defaultResponse) _request = _request.expect(defaultResponse);

    if(expectedBody) _request = _request.expect(expectedBody);

    util.endRequest(_request, done);
}

module.exports = util;
