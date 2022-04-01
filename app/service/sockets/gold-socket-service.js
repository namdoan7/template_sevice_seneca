const common = require('../../util/common');
const senecaConst = require('../../constant/seneca-role');
const Promise = require("bluebird");


module.exports = function (seneca, io, name_space) {
    const senecaAct = Promise.promisify(seneca.act, { context: seneca });
    let nsp = io.of(name_space)
    seneca.add({ role: senecaConst.ROLE_IO, cmd: senecaConst.CMD_IO_NEW_UPDATE_PRICE }, emitNewUpdatePrice);

    nsp.on('connection', function (socket) {
        socket.on('join', (room) => {
            console.log('SOCKET:JOIN:: ' + room);
            socket.join(room);
        });

        socket.on('leave', (room) => {
            console.log('SOCKET:LEAVE:: ' + room);
            socket.leave(room);
        });
    })

    async function emitNewUpdatePrice(data, done) {
        nsp.emit('new_update_type', data);
        done(null, common.returnSuccess(200, 'Success', {}));
    }


}
