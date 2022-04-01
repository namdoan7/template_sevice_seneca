const md5 = require('md5');
var config = require("../config/app")
var crypto1 = require("crypto");
const randomstring = require('randomstring');
const request = require('request');


module.exports = {
    getHashPassword(plain_password, salt) {
        return md5(md5(plain_password) + '_' + salt);
    },

    generateRandomToken(token_length) {
        var result = '';
        let permit_chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (var i = token_length; i > 0; --i) {
            result += permit_chars[Math.floor(Math.random() * permit_chars.length)]
        };
        return result;
    },

    /** Format seneca return message */
    senecaSuccess(result) {
        return {
            err: null,
            result: result
        }
    },
    senecaError(error_code, msg = null) {
        if (msg) {
            return {
                err: {
                    code: error_code,
                    msg: msg
                },
                result: null
            }
        } else {
            return {
                err: {
                    code: error_code
                },
                result: null
            }
        }

    },

    /**
     * Return error
     * @param code
     * @param msg
     * @param data
     * @returns {{status: number, code: *, message: *, data: {}}}
     */
    returnError(code, msg, data = {}) {
        return {
            status: 0,
            code: code,
            msg: msg,
            data: data
        }
    },

    /**
     * return success
     * @param data
     * @param {string} msg
     * @return {any}
     */
    returnSuccess(code, msg, data) {
        return {
            status: 1,
            code: code,
            msg: msg,
            data: data,
        }
    },

    changeAlias(string) {
        let str = string;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\’|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        str = str.replace(/ + /g, " ");
        str = str.trim();
        str = str.replace(/ /g, '-');;
        return str;
    },

    generateSubUser() {
        const ranNum = Math.floor(Math.random() * 5) + 1;
        return randomstring.generate({
            length: ranNum,
            charset: 'numeric'
        });
    },

    // NAM DOAN
    // Lay random theo min - max
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    uniqid(a = "", b = false) {
        const c = Date.now() / 1000;
        let d = c.toString(16).split(".").join("");
        while (d.length < 14) d += "0";
        let e = "";
        if (b) { e = "."; e += Math.round(Math.random() * 100000000); }
        return a + d + e;
    },

    verificationRecaptchaV2(secretKey, valueResponse, remoteip) {
        if (!valueResponse) { return false; }
        var options = {
            url: 'https://www.google.com/recaptcha/api/siteverify',
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secretKey}&response=${valueResponse}&remoteip=${remoteip}`,
        }

        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                body = JSON.parse(body);
                // Success will be true or false depending upon captcha validation.
                if (body.success !== undefined && !body.success) {
                    return resolve(false);
                }
                return resolve(true);
            })
        });
    },


   





}