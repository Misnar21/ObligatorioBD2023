"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRanking = exports.userExist = exports.isNullOrEmpty = exports.updateMany = exports.updateOne = exports.addMany = exports.addOne = exports.findMany = exports.findOne = void 0;
const _1 = require(".");
const mongodb_1 = require("mongodb");
function findOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).findOne(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.findOne = findOne;
function findMany(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).find(dato).toArray();
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.findMany = findMany;
function addOne(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).insertOne(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.addOne = addOne;
function addMany(coleccion, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).insertMany(dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.addMany = addMany;
function updateOne(coleccion, filtro, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).updateOne(filtro, { $set: dato }, { upsert: false });
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.updateOne = updateOne;
function updateMany(coleccion, filtro, dato) {
    return __awaiter(this, void 0, void 0, function* () {
        /*
            Formato del dato para actualizar. El primer parametro (rated) es el filtro, el $set es el dato a modificar
          const result = await movies.updateMany(
          { rated: Rating.G },
          {
            $set: {
              random_review: `After viewing I am ${
                100 * Math.random()
              }% more satisfied with life.`,
            },
          }
        );*/
        var res = null;
        try {
            if (_1.db !== null) {
                res = yield _1.db.collection(coleccion).updateMany(filtro, dato);
            }
        }
        catch (error) {
            console.log("Error: " + error);
        }
        return res;
    });
}
exports.updateMany = updateMany;
function isNullOrEmpty(value) {
    return value === null || value === undefined || value === '';
}
exports.isNullOrEmpty = isNullOrEmpty;
function userExist(id, contraseña) {
    return __awaiter(this, void 0, void 0, function* () {
        var res = false;
        try {
            var user = yield findOne("administradores", { 'id': id, "contraseña": contraseña });
            if (user !== null) {
                //usuario existe
                res = true;
            }
        }
        catch (error) {
            console.log(error);
        }
        return res;
    });
}
exports.userExist = userExist;
function getRanking(salaId) {
    return __awaiter(this, void 0, void 0, function* () {
        let ranking = [];
        try {
            var find = { '_id': new mongodb_1.ObjectId(salaId) };
            //var res = await db.collection("salas").findOne(find);
            //console.log(res);
            //ranking = res.propuesta.actividades.sort((a: any, b: any) => a.ranking.meGusta - b.ranking.meGusta).toArray();
            var cursor = _1.db.collection("salas").aggregate([
                {
                    $project: {
                        "_id": new mongodb_1.ObjectId(salaId),
                        result: {
                            $sortArray: {
                                input: "$propuesta.actividades",
                                sortBy: { "ranking.meGusta": -1 }
                            }
                        }
                    }
                }
            ]);
            var res = yield cursor.toArray();
            /*for await (const doc of cursor) {
                console.dir(doc);
            }*/
            ranking = res[0].result;
            console.log(ranking);
            return ranking;
        }
        catch (error) {
            console.log(error);
            return null;
        }
        return ranking;
    });
}
exports.getRanking = getRanking;
//# sourceMappingURL=metodos.js.map