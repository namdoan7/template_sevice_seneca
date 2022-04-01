const sequelizePaginate = require('sequelize-paginate')
module.exports = function (sequelize, DataTypes) {
    const Order =  sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        create_time: {
            type: DataTypes.INTEGER(50),
            allowNull: true
        },
        total_money: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
            defaultValue: 0
        },
        province_code: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        district_code: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        detail_address: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        receive_time: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        activation_code: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        receive_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        receive_email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        receive_mobile: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        last_state: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        last_state_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        last_note_info: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        payment_method: {
            type: DataTypes.TINYINT(4),
            allowNull: true,
            defaultValue: 1
        },
        is_paid: {
            type: DataTypes.TINYINT(4),
            allowNull: true
        },
        paid_time: {
            type: DataTypes.INTEGER(50),
            allowNull: true
        },
        confirmed_time: {
            type: DataTypes.INTEGER(50),
            allowNull: true
        },
        confirmed_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        sent_cod_time: {
            type: DataTypes.INTEGER(50),
            allowNull: true
        },
        sent_cod_by: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        cod_items: {
            type: DataTypes.TEXT(),
            allowNull: true
        },
        cod_price: {
            type: DataTypes.INTEGER(50),
            allowNull: true,
            defaultValue: 0
        },
        create_day_code: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: 0
        }

    }, {
        tableName: 'order'
    });
    // Init paginate
    sequelizePaginate.paginate(Order)

    return Order
};