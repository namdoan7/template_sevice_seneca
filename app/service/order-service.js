const logger = require("../util/logger")(module);
const senecaConst = require('../constant/seneca-role');
const common = require('../util/common');
const db = require('./model_mysql/index');
const db_mongo = require('./model_mysql/index');
const config = require('../config/app')
const Sequelize = require('sequelize');
const Promise = require("bluebird");

const Op = Sequelize.Op;

module.exports = function () {
    const senecaAct = Promise.promisify(this.act, { context: this });
    this.add({ role: senecaConst.ROLE_ORDER, cmd: senecaConst.CMD_GET_ORDER }, getAllOrder);

    // Lay tat ca du lieu
    async function getAllOrder(data, done) {
        try {

            const { page, row_per_page, keyword_in, keyword, status } = data;
            const options = { page: Number(page) || 1, paginate: Number(row_per_page) || config.order.ORDER_PAGINATE_LIMIT };
            options.order = [['id', 'DESC']];
            // Filter - Where
            const queryWhere = {};
            if (status && status != "") {
                queryWhere.status = status;
                if (Array.isArray(status)) {
                    queryWhere.status = { [Op.or]: status };
                }
            }

            // Search Type
            if (keyword_in && keyword_in != "" && keyword && keyword != "") {
                if (keyword_in == "phone") queryWhere.receive_mobile = { [Op.like]: `%${keyword}%` };
                if (keyword_in == "name") queryWhere.receive_name = { [Op.like]: `%${keyword}%` };
                if (keyword_in == "id") queryWhere.id = keyword;
            }
            options.where = queryWhere;

            // Su dung plugin paginate duoc khai bao tu model
            var paginate = await db.order.paginate(options);
            done(null, common.returnSuccess(200, 'Thành công', paginate));
        } catch (err) {
            logger.error('Co loi trong qua trinh xu ly', err);
            done(null, common.returnError(500, 'Có lỗi trong quá trình xử lý'));
        }
    }
}