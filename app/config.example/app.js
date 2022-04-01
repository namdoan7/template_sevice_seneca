var config = {
    db: require("./mysql"),
    mongodb: require("./mongodb"),
    express: {
        port: 3009
    }
};
module.exports = config;