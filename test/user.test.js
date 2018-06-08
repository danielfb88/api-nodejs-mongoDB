module.exports = function(pack) {

    var services = require('./services.js')(pack);

    const app = pack.app;
    const env = pack.env;
    const chai = pack.chai;
    const request = pack.request;
    const util = pack.util;

    const expect = chai.expect;
    const assert = chai.assert;
    const should = chai.should;

    const logger = app.util.logger;

    /*
    * Start yours tests at this point
    */

    const mainDescribe = '********* USER *********';
    const route = '/api/user';

    function newObj() {
        return {
            email: 'admin@wexinc.com.br',
            password: '000',
            company: 'WEX BR',
            role: 'admin'
        };
    }

    describe(mainDescribe, function() {

        describe('VALIDATIONS', function() {

            describe('on Insert', function() {
                var method = 'POST';

                it(method + ' ' + route + ' - return status 400 if no \'email\' passed', function(done) {
                    var obj = newObj();
                    obj.email = undefined;

                    util.request({
                        method: method,
                        route: route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        done: done
                    });
                });

                it(method + ' ' + route + ' - return status 400 if no \'password\' passed', function(done) {
                    var obj = newObj();
                    obj.password = undefined;

                    util.request({
                        method: method,
                        route: route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        done: done
                    });
                });

                it(method + ' ' + route + ' - return status 400 if no \'company\' passed', function(done) {
                    var obj = newObj();
                    obj.company = undefined;

                    util.request({
                        method: method,
                        route: route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        done: done
                    });
                });

                it(method + ' ' + route + ' - return status 400 if no \'role\' passed', function(done) {
                    var obj = newObj();
                    obj.role = undefined;

                    util.request({
                        method: method,
                        route: route,
                        body: obj,
                        expectedStatus: 400,
                        expectedBody: null,
                        defaultResponse: null,
                        done: done
                    });
                });

            });

        });

        describe('SERVICES', function() {

            /*
            * Creating user
            */
            services.createUser('admin');

            /*
            * Deleting user
            */
            services.deleteUser('admin');

        });

    });

}
