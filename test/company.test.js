module.exports = function(pack) {

    var services = require('./services.js')(pack);

    const app = pack.app;
    const env = pack.env;
    const chai = pack.chai;
    const request = pack.request;
    const util = pack.util;
    const httpMocks = pack.httpMocks;

    const expect = chai.expect;
    const assert = chai.assert;
    const should = chai.should;

    /*
    * Start yours tests at this point
    */

    const mainDescribe = '******* COMPANY *******';
    const route = '/api/company';

    var tokenAdmin;
    var id;

    function newObj() {
        return {
            description: 'WEX BR'
        };
    };

    describe(mainDescribe, function() {

        /*
        * Creating user
        */
        services.createUser('admin');

        /*
        * Getting token
        */
        describe('AUTENTICATING', function() {
            it('Should authenticate a admin user returning a token on response', async function() {

                await services.getToken('admin')
                .then(function(tokenAuth) {
                    tokenAdmin = tokenAuth;
                });

                assert.isTrue(tokenAdmin != undefined, 'x-access-token undefined');

            });

        });

        /*
        * Testing fields
        */
        describe('VALIDATING', function() {

            describe('on Insert', function() {
                var method = 'POST';

                it(method + ' ' + route + ' - return status 400 if no \'description\' passed', function(done) {
                    var obj = newObj();
                    obj.description = undefined;

                    util.request({
                        method: method,
                        route: route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        token: tokenAdmin,
                        done: done
                    });
                });

            });

            describe('on Update', function() {
                var method = 'PUT';
                var _route = route + '/1';

                it(method + ' ' + _route + ' - return status 400 if no \'description\' passed', function(done) {
                    var obj = newObj();
                    obj.description = undefined;

                    util.request({
                        method: method,
                        route: _route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        token: tokenAdmin,
                        done: done
                    });
                });

            });

        });

        describe('SERVICES - Doing with ADMIN USER', function() {

            it('POST ' + route + ' - should INSERT', function(done) {
                var obj = newObj();

                var defaultResponse = function(res) {
                    id = res.body._id;
                    res.body._id = 1;
                    res.body.__v = 0;
                };

                var expectedBody = {
                    _id: 1,
                    __v: 0,
                    description: obj.description
                };

                util.request({
                    method: 'POST',
                    route: route,
                    body: obj,
                    expectedStatus: 201,
                    expectedBody: expectedBody,
                    defaultResponse: defaultResponse,
                    token: tokenAdmin,
                    done: done
                });
            });

            it('GET ' + route + '/:id' + ' - should FIND the object saved', function(done) {
                var obj = newObj();

                var defaultResponse = function(res) {
                    res.body._id = 1;
                    res.body.__v = 0;
                };

                var expectedBody = {
                    _id: 1,
                    __v: 0,
                    description: obj.description
                };

                var _route = route + '/' + id;

                util.request({
                    method: 'GET',
                    route: _route,
                    body: null,
                    expectedStatus: 200,
                    expectedBody: expectedBody,
                    defaultResponse: defaultResponse,
                    token: tokenAdmin,
                    done: done
                });
            });

            it('PUT ' + route + '/:id' + ' - should UPDATE the object saved', function(done) {
                var obj = newObj();
                obj.description = 'MODIFIED';

                var defaultResponse = function(res) {
                    res.body._id = 1;
                    res.body.__v = 0;
                };

                var expectedBody = {
                    _id: 1,
                    __v: 0,
                    description: obj.description
                };

                var _route = route + '/' + id;

                util.request({
                    method: 'PUT',
                    route: _route,
                    body: obj,
                    expectedStatus: 200,
                    expectedBody: expectedBody,
                    defaultResponse: defaultResponse,
                    token: tokenAdmin,
                    done: done
                });

            });

            it('DELETE ' + route + '/:id' + ' - should DELETE the object saved', function(done) {
                var _route = route + '/' + id;
                util.request({
                    method: 'DELETE',
                    route: _route,
                    body: null,
                    expectedStatus: 200,
                    expectedBody: null,
                    defaultResponse: null,
                    token: tokenAdmin,
                    done: done
                });
            });

            it('GET ' + route + ' - should list all objects', function(done) {
                util.request({
                    method: 'GET',
                    route: route + '?' + 'description=',
                    body: null,
                    expectedStatus: 200,
                    expectedBody: null,
                    defaultResponse: null,
                    token: tokenAdmin,
                    done: done
                });
            });

        });

        /*
        * Deleting user
        */
        services.deleteUser('admin');

    });

}
