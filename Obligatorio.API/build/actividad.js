"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actividad = void 0;
const ranking_1 = require("./ranking");
class Actividad {
    constructor(id, titulo, descripcion, imageLink) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        if (this.imageLink != undefined) {
            this.imageLink = imageLink;
        }
        else {
            this.imageLink = "";
        }
        this.calificacion = new ranking_1.Ranking();
        this.id = id;
    }
    meGusta() {
        this.calificacion.incrementarMeGusta();
    }
    noMeGusta() {
        this.calificacion.incrementarNoMeGusta();
    }
    meDaIgual() {
        this.calificacion.incrementarMeDaIgual();
    }
    obtenerResultados() {
        return [this.calificacion.meGusta, this.calificacion.noMeGusta, this.calificacion.meDaIgual];
    }
}
exports.Actividad = Actividad;
//# sourceMappingURL=actividad.js.map