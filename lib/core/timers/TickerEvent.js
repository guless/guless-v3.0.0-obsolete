"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Event_1 = require("../events/Event");
class TickerEvent extends Event_1.default {
    constructor(type, time = 0, bubbles = false, cancelable = false) {
        super(type, bubbles, cancelable);
        this._time = time;
    }
    get time() {
        return this._time;
    }
}
TickerEvent.UPDATE = "update";
TickerEvent.COMPLETE = "complete";
exports.default = TickerEvent;
