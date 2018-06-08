var mongoose = require('mongoose');

module.exports = function(app) {

	var api = {};
	var logger = app.util.logger;

	var model = mongoose.model('Companies');

	/**
	* Returns a list of objects according with querystring params.
	* empty each queryString value = no filter
	*
	* @param  {request} req request Object
	* @param  {response} res response Object
	* @return {response}
	*/
	api.list = function(req, res) {
		/* Querystring */
		queryDescription = req.query.description;

		model.find({description: { $regex: '.*' + queryDescription + '.*', $options: 'i'}})
		.then(function(objs) {
			logger.info('List of Company: *'+queryDescription+'* - fetched by user \'%s\'', req.decoded.email);
			res.json(objs);

		}, function(error) {
			logger.error(error);
			res.status(500).json(error);
		});

	};

	/**
	* Find by ID
	*
	* @param  {request} req request Object
	* @param  {response} res response Object
	* @return {response}
	*/
	api.findById = function(req, res) {
		logger.debug('ID: ' + req.params.id);
		model.findById(req.params.id)
		.then(function(obj) {
			if (!obj) throw new Error('obj não encontrada');
			logger.info('Company \'%s\' fetched by user \'%s\'', req.params.id, req.decoded.email);
			res.json(obj);

		}, function(error) {
			logger.error(error);
			res.sendStatus(500);
		});
	};

	/**
	* Remove by ID
	*
	* @param  {request} req request Object
	* @param  {response} res response Object
	* @return {response}
	*/
	api.removeById = function(req, res) {
		model.remove({'_id' : req.params.id})
		.then(function() {
			logger.info('Company \'%s\' removed by user \'%s\'', req.params.id, req.decoded.email);
			res.sendStatus(200);

		}, function(error) {
			logger.error(error);
			res.sendStatus(500);
		});

	};

	/**
	* New obj
	*
	* @param  {request} req request Object
	* @param  {response} res response Object
	* @return {response}
	*/
	api.new = function(req, res) {
		req.assert('description', 'Description can not be empty').notEmpty();

		if(req.validationErrors()) {
			logger.debug('Validation errors found');
			res.status(400).send(req.validationErrors());
			return;
		}

		model.create(req.body)
		.then(function(obj) {
			logger.info('Company \'%s\' created by user \'%s\'', req.body.description, req.decoded.email);
			res.status(201).json(obj);

		}, function(error) {
			logger.error(error);
			res.sendStatus(500);
		});

	};

	/**
	* Update obj
	*
	* @param  {request} req request Object
	* @param  {response} res response Object
	* @return {response}
	*/
	api.update = function(req, res) {
		req.assert('description', 'Description can not be empty').notEmpty();

		if(req.validationErrors()) {
			logger.debug('Validation errors found');
			res.status(400).send(req.validationErrors());
			return;
		}

		model.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(function(obj) {
			logger.info('Company \'%s\' updated by user \'%s\'', req.body.description, req.decoded.email);
			res.status(200).json(obj);

		}, function(error) {
			logger.error(error);
			res.sendStatus(500);
		})
	};

	return api;
};
