"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ranking = void 0;
class Ranking {
    constructor() {
        this.meGusta = 0;
        this.noMeGusta = 0;
        this.meDaIgual = 0;
    }
    incrementarMeGusta() {
        this.meGusta++;
    }
    incrementarNoMeGusta() {
        this.noMeGusta++;
    }
    incrementarMeDaIgual() {
        this.meDaIgual++;
    }
}
exports.Ranking = Ranking;
//# sourceMappingURL=ranking.js.map