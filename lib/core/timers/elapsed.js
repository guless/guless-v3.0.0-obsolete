"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __MAX_DELAY__ = 100;
function elapsed(t0, t1, limit = false) {
    return limit ? Math.min(__MAX_DELAY__, Math.max(0, t1 - t0)) : Math.max(0, t1 - t0);
}
exports.default = elapsed;
