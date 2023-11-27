"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.decode = exports.verifyUser = void 0;
const _1 = require(".");
const metodos_1 = require("./metodos");
var secret = "secreto";
function verifyUser(req, res, next) {
    try {
        if ((0, metodos_1.isNullOrEmpty)(req.headers['authorization'])) {
            res.status(400);
            res.send("Error. Falta auth header.");
        }
        else {
            try {
                if (req.headers['authorization'].split(' ')[0] == "Bearer") {
                    var token = req.headers['authorization'].split(' ')[1];
                    _1.jwt.verify(token, secret);
                    next();
                }
                else {
                    res.status(400);
                    res.send("Error. Falta Bearer.");
                }
            }
            catch (error) {
                res.status(401);
                res.send("Error. Token no válido.");
            }
        }
    }
    catch (error) {
        res.status(400);
        res.send("Error. Bad request.");
    }
}
exports.verifyUser = verifyUser;
function decode(authheader) {
    var res = null;
    try {
        res = _1.jwt.verify(authheader.split(' ')[1], secret);
    }
    catch (error) {
        res = null;
    }
    return res;
}
exports.decode = decode;
function sign(userid) {
    return _1.jwt.sign({
        id: userid
    }, secret, { expiresIn: '1h' });
}
exports.sign = sign;
//# sourceMappingURL=middleware.js.map