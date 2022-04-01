module.exports = function (app, serviceRegistry) {

    
    app.use('/order', require('./order')(app, serviceRegistry)); 
};
