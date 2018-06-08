module.exports = function(app) {

    var api = app.api.user;

    app.route('/api/user')
        .post(api.new);

    app.route('/api/user/:email')
        .delete(api.removeByEmail)
};
