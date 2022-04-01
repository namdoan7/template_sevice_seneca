module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        mobile: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        fb_id: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        google_id: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        create_time: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        last_login_time: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        is_premium: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        avatar_type: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        avatar_link: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        is_admin: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        },
        status: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        province_code: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        district_code: {
            type: DataTypes.INTEGER(11),
            allowNull: true
        },
        detail_address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        login_by: {
            type: DataTypes.INTEGER(3),
            allowNull: false,
            defaultValue: 1
        },
        create_day_code: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        }
    }, {
        tableName: 'user'
    });
};