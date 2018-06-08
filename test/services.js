module.exports = function(pack) {
    const app = pack.app;
    const chai = pack.chai;

    const expect = chai.expect;
    const assert = chai.assert;
    const should = chai.should;

    const util = require('./util.js');
    const httpMocks = require('node-mocks-http');

    const route_user = '/api/user';
    const route_auth = '/api/auth';

    const api_auth = app.api.auth;

    var token;

    function newObjUser(role) {
        return {
            email: role + '@wexinc.com.br',
            password: '000',
            company: 'WEX BR',
            role: role
        };
    }

    services = {

        createUser: function(role) {
            describe('CREATING ' + role + ' USER', function() {
                it('Should create an ' + role + ' user', function(done) {
                    var obj = newObjUser(role);

                    var defaultResponse = function(res) {
                        res.body.password = '000';
                        res.body._id = 1;
                        res.body.__v = 0
                    };

                    var expectedBody = {
                        _id: 1,
                        email: obj.email,
                        company: obj.company,
                        role: obj.role,
                        password: '000',
                        __v: 0
                    };

                    util.request({
                        method: 'POST',
                        route: route_user,
                        body: obj,
                        expectedStatus: 201,
                        expectedBody: expectedBody,
                        defaultResponse: defaultResponse,
                        done: done
                    });
                });
            });
        },

        deleteUser: function(role) {
            describe('DELETING ' + role + ' USER', function() {

                it('Should delete the ' + role + ' user', function(done) {
                    var _route = route_user + '/' + newObjUser(role).email;
                    util.request({
                        method: 'DELETE',
                        route: _route,
                        body: null,
                        expectedStatus: 200,
                        expectedBody: null,
                        defaultResponse: null,
                        done: done
                    });
                });
            });
        },

        getToken: function(role) {
            var promise = new Promise(function(resolve, reject) {
                req = httpMocks.createRequest({
                    method: 'POST',
                    url: route_auth,
                    body: {
                        email: newObjUser(role).email,
                        password: newObjUser(role).password,
                    }
                });

                res = httpMocks.createResponse();

                api_auth.auth(req, res)
                .then(function(responseAuthSuccess) {
                    token = {
                        key: 'x-access-token',
                        value: responseAuthSuccess.get('x-access-token')
                    };
                    resolve(token);
                }, function(responseAuthFail) {
                    reject();

                });

            });

            return promise;
        },

    };

    return services;
}
