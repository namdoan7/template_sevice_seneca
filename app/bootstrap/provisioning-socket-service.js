module.exports = function (io, seneca) {
    require('../service/sockets/gold-socket-service')(seneca, io, '/gold-price')
}
