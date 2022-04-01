module.exports = function (seneca) {
    seneca.use('../service/user-service');
    seneca.use('../service/order-service');
}