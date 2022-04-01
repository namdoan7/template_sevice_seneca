const logger = require("../util/logger")(module);
const requestIp = require('request-ip');
const seneca_const = require('../constant/seneca-role');
const config = require('../config/app');

module.exports.getUserInfo = function(serviceRegistry) {
    return async function (req, res, next) {
        if(req.headers.token != undefined){
            let data = {token:req.headers.token };
            var senecaResult = await serviceRegistry.senecaAct({
                role: seneca_const.ROLE_ACCOUNT,
                cmd: seneca_const.CMD_GET_USER_INFO_BY_TOKEN
            },data);
            if(senecaResult.result){
                req.user_info = senecaResult.result;
                next();
            }else{
                res.status(403).json({
                    status: 0,
                    success:false,
                    code:403,
                    msg:'Token not found',
                });
            }
        }else{
            res.status(403).json({
                status: 0,
                success:false,
                code:403,
                msg:'Need provide token to use this API',
            });
        }
        
    }
}


