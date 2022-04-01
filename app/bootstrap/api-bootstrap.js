var express = require("express");
var http = require("http");
var logger = require("../util/logger")(module);
var app = express();
var config = require("../config/app")
const seneca = require("seneca")();
var cors = require('cors');
var _ = require("lodash");
const Sequelize = require('sequelize');
const mongoose = require('mongoose');
var compression = require('compression');
mongoose.set('debug', false);
const senecaConst = require('../constant/seneca-role');

const setupServer = async () => {
    logger.debug("Starting application - setupServer");
    try {
        const dbPools = await initDb(config);
        const dbMongoPools = await initDbMongo(config.mongodb);
        setupExpress(config, dbPools, dbMongoPools);
        const server = http.createServer(app).listen(config.express.port);
        const io = initSocket(server, serviceRegistry);
        logger.debug("Start server successfully on port " + config.express.port);
    } catch (err) {
        logger.error("Setup server error", err);
    }
};

const initSocket = (server, serviceRegistry) => {
    var allowedOrigins = "http://localhost:*";
    const io = require('socket.io')(server, {
        origins: allowedOrigins,
        path: '/v1/socket',
        transports: ['websocket', 'polling']
    });
    require('./provisioning-socket-service')(io, serviceRegistry.seneca);
    return io;
}

const initDb = async () => {
    var mysqlPools = {};
    var properties = [];
    for (var property in config.db) {
        if (config.db.hasOwnProperty(property)) {
            properties.push(property);
        }
    }
    var properties = Object.keys(config.db)
    _.map(properties, function (property) {
        var dbOpts = config.db[property];
        mysqlPools[property] = new Sequelize(dbOpts.database, dbOpts.username, dbOpts.password, dbOpts);
    });
    return mysqlPools;
};

const initDbMongo = async (mongoDB) => {
    let connection = {};
    if (mongoDB.version_with_password) {
        connection = mongoose.connect(mongoDB.uri, mongoDB.options, function (err) {
            if (err) {
                console.log("connection error:", err);
            } else {
                console.log("MongoDB connection successful");
            }
        });
    } else {
        connection = mongoose.connect(mongoDB.url, function (err) {
            if (err) {
                console.log("connection error:", err);
            } else {
                console.log("MongoDB connection successful");
            }
        });
    }

    return connection;
};

function setupExpress(config, dbPools, dbMongoPools) {
    logger.debug("Starting application - setupExpress");
    app.use(cors({
        origin: '*',
        maxAge: 86400,
        methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'HEAD', 'DELETE']
    }))
    app.use(compression());
    app.disable('x-powered-by');
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: true }));
    // parse application/json
    app.use(bodyParser.json());

    /** Static file */
    // app.use('/uploads',express.static(path.join(__dirname, '../../uploads')));


    const Promise = require("bluebird");
    const senecaAct = Promise.promisify(seneca.act, { context: seneca });
    /**
     * Tuenv: Không truyền database vào serviceRegistry, vì thằng này dùng ở nhiều nơi, database chỉ dùng ở model,
     * ở đây bắt đầu từ seneca service (sẽ khởi tạo db từ provisioningService
     * @type {{appConf: app|{configurable, enumerable, writable, value}, seneca: seneca, senecaAct: Function | (() => Promise<any>) | (() => Promise<void>) | ((arg1: any) => Promise<any>) | ((arg1: any) => Promise<void>) | ((arg1: any, arg2: any) => Promise<any>) | *}}
     */
    const serviceRegistry = {
        appConf: config.app,
        seneca: seneca,
        senecaAct: senecaAct,
        db: dbPools,
        mongodb: dbMongoPools
    };

    /* Declare for unauthenticate api */
    let provisioningService = require("./provisioning-seneca-service");
    provisioningService(seneca);

    require('../route/index')(app, serviceRegistry);

    //scan youtube cycle
    serviceRegistry.senecaAct(
        {
            role: senecaConst.ROLE_SCAN_YOUTUBE,
            cmd: senecaConst.CMD_SCAN_CYCLE_YOUTUBE
        },{})

    return serviceRegistry;
}

setupServer(config);
