var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

module.exports = function(app) {

    var api = {};
    var logger = app.util.logger;

    var model = mongoose.model('Users');

    /**
    * New user
    *
    * @param  {request} req request Object
    * @param  {response} res response Object
    * @return {response}
    */
    api.new = function(req, res) {
        req.assert('email', 'Email can not be null').notEmpty();
        req.assert('password', 'Password can not be null').notEmpty();
        req.assert('company', 'Company can not be null').notEmpty();
        req.assert('role', 'Role can not be null').notEmpty();

        if(req.validationErrors()) {
            logger.debug('Validation errors found');
            return res.status(400).send(req.validationErrors());
        }

        // search if already exist
        model.findOne({email: req.body.email}, (err, user) => {
            if(user) {
                var message = 'User already registered';
                logger.debug(message)
                res.status(400).send({erros: [message]});

            } else {

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;

                model.create(req.body)
                .then(function(obj) {
                    res.status(201).json(obj);

                }, function(error) {
                    logger.error(error);
                    res.status(500).send(error);
                });
            }
        });

    };

    /**
    * Remove user
    *
    * @param  {request} req request Object
    * @param  {response} res response Object
    * @return {response}
    */
    api.removeByEmail = function(req, res) {
        model.remove({'email' : req.params.email})
        .then(function() {
            logger.debug('Removing user ' + req.params.email);
            res.sendStatus(200);

        }, function(error) {
            logger.error(error);
            res.sendStatus(500);
        });

    };

    return api;
};
