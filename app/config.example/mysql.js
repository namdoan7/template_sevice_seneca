const db = {
    mysql_main: {
        database: 'db_name',
        username: 'username',
        password: 'password',
        host: 'host',

        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false
        },
        logging: true
    },
};

module.exports = db;
