const logger = require("../util/logger")(module);
const senecaConst = require('../constant/seneca-role');
const common = require('../util/common');
const db = require('./model_mysql/index');
const moment = require('moment');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { salt, FB_APP_ID } = require('../config/app')
const Promise = require("bluebird");


module.exports = function () {
    const senecaAct = Promise.promisify(this.act, { context: this });
    this.add({ role: senecaConst.ROLE_ACCOUNT, cmd: senecaConst.CMD_ACCOUNT_CREATE }, createAccount);


    async function createAccount(data, done) {
        try {
            let { username, password, fullname, mobile, email } = data;
            username = username.toLowerCase();

            const user = await db.user.findOne({ where: { username } });
            if (user) {
                done(null, common.returnError(410, 'Tạo không thành công.. Tên tài khoản đã tồn tại '));
                return;
            }

            const phone = await db.user.findOne({ where: { mobile } });
            if (phone) {
                done(null, common.returnError(410, 'Tạo không thành công.. Số điện thoại đã được đăng ký '));
                return;
            }

            const create_time = Math.ceil(new Date().getTime() / 1000);
            const new_user = await db.user.create({
                username, password: common.getHashPassword(password, salt),
                full_name: fullname, mobile, email, status: 1, create_time, create_day_code: moment(new Date()).format("YYYYMMDD")
            });

            if (new_user) {
                done(null, common.returnSuccess(201, 'Create success', new_user));
            }
        } catch (error) {
            logger.error('Co loi trong qua trinh xu ly', error);
            done(null, common.returnError(500, 'Co loi trong qua trinh xu ly'));
        }
    }

};