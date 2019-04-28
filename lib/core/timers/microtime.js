"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __PERF_NOW_SUPPORTED__ = (typeof performance !== "undefined" && typeof performance.now === "function");
const __TIME_ORIGIN__ = (__PERF_NOW_SUPPORTED__ ? Date.now() - performance.now() : 0);
function microtime() {
    return (__PERF_NOW_SUPPORTED__ ? __TIME_ORIGIN__ + performance.now() : Date.now());
}
exports.TIME_ORIGIN = __TIME_ORIGIN__;
exports.default = microtime;
