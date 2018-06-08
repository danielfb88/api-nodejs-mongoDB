module.exports = function(app) {

	var api = app.api.company;

	app.route('/api/company')
		.get(api.list)
		.post(api.new);

	app.route('/api/company/:id')
		.get(api.findById)
		.delete(api.removeById)
		.put(api.update);
};
