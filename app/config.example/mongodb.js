module.exports = {
    version_with_password: true,
    uri:'mongodb://HOST:PORT/DB',
    options: {
        useNewUrlParser: true,
        user: "username",
        pass: "password",
        auth: {
            authdb: 'db'
        }
    },
}

// module.exports =  {
//     version_with_password: false,
//     url: "mongodb://HOST:PORT/DB"
// }