"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const AssertionError_1 = require("./errors/AssertionError");
function assert(condition, message = "assert failed!") {
    if (!condition) {
        throw new AssertionError_1.default(message);
    }
}
exports.default = assert;
