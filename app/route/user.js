const express = require('express');
const senecaConst = require('../constant/seneca-role');
var router = express.Router();
const logger = require("../util/logger")(module);

module.exports = function (app, serviceRegistry) {
    const forceAuthen = require('../middleware/authentication.js');

    router.post('/account', async (req, res, next) => {
        const data = req.body;
        try {
            const response = await serviceRegistry.senecaAct({
                    role: senecaConst.ROLE_ACCOUNT,
                    cmd: senecaConst.CMD_ACCOUNT_CREATE
                },data);
            return res.status(200).json(response);
        } catch (error) {
            logger.error("[POST] [Create account]");
            return next(error);
        }
    });

    return router;
}