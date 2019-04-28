"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const assert_1 = require("../assert");
const EventDispatcher_1 = require("../events/EventDispatcher");
const microtime_1 = require("./microtime");
const TickerEvent_1 = require("./TickerEvent");
const __RAF__ = (typeof requestAnimationFrame === "function" ? requestAnimationFrame : typeof webkitRequestAnimationFrame === "function" ? webkitRequestAnimationFrame : null);
const __CAF__ = (typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : typeof webkitCancelAnimationFrame === "function" ? webkitCancelAnimationFrame : null);
class Ticker extends EventDispatcher_1.default {
    constructor(interval = -1 /* SYNC_REPAINT */) {
        super();
        this._running = false;
        this._preferredSyncRepaintInterval = 16.666666666666668 /* HIGH */;
        this._onRafUpdate = (time) => this._onUpdate(microtime_1.TIME_ORIGIN + time);
        this._onTimerUpdate = (time) => this._onUpdate(time);
        assert_1.default((interval === -1 /* SYNC_REPAINT */) || (interval >= Ticker.MIN_INTERVAL), `Ticker's "interval" must great than or equals "MIN_INTERVAL(${Ticker.MIN_INTERVAL}ms)".`);
        this._interval = interval;
    }
    get interval() {
        return this._interval;
    }
    get running() {
        return this._running;
    }
    addEventListener(type, listener, options = false) {
        super.addEventListener(type, listener, options);
    }
    removeEventListener(type, listener, options = false) {
        super.removeEventListener(type, listener, options);
    }
    setPreferredSyncRepaintInterval(value) {
        assert_1.default(value >= Ticker.MIN_INTERVAL, `Ticker's "preferredSyncRepaintInterval" must great than or equals "MIN_INTERVAL(${Ticker.MIN_INTERVAL}ms)".`);
        this._preferredSyncRepaintInterval = value;
    }
    getPreferredSyncRepaintInterval() {
        return this._preferredSyncRepaintInterval;
    }
    start() {
        if (this._running) {
            return;
        }
        this._running = true;
        this._handle = this._requestAnimationFrame();
    }
    stop() {
        if (!this._running) {
            return;
        }
        this._running = false;
        this._cancelAnimationFrame();
    }
    _onUpdate(time) {
        /**
         * - 1, 由于系统可能调整时钟(Wall Clock)等原因，这里取到的 time 值有可能会小于上一次的 time 值。
         * - 2, 在目前版本的 Chrome (版本 73.0.3683.103 正式版本 64 位) 中 requestAnimationFrame(callback)
         * **首次**返回的 time 值，也有可能会小于上一次 performance.now() 的值。
         *
         * @example
         * let t0: number = microtime();
         * const ticker = new Ticker();
         * ticker.addEventListener("update", (evt) => {
         *     console.log("elapsed:", Math.max(0, evt.time - t0)); // 这里为了确保 elapsed 的值始终大于 0。
         *     t0 = evt.time;
         * });
         * ticker.start();
         */
        this.dispatchEvent(new TickerEvent_1.default(TickerEvent_1.default.UPDATE, time, false, false));
        if (this._running) {
            this._handle = this._requestAnimationFrame();
        }
    }
    _requestAnimationFrame() {
        if (this.interval === -1 /* SYNC_REPAINT */ && Ticker.SYNC_REPAINT_AVAILABLE) {
            return __RAF__(this._onRafUpdate);
        }
        const interval = (this._interval === -1 /* SYNC_REPAINT */ ? this._preferredSyncRepaintInterval : this._interval);
        const timeCurrent = microtime_1.default();
        const timeToCall = interval - (timeCurrent % interval);
        /**
         * 如果本次调用的延时小于最小间隔(MIN_INTERVAL)的话，将回调函数放到下一帧调用。
         * @see [Reasons_for_delays_longer_than_specified](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified)
         */
        if (timeToCall < Ticker.MIN_INTERVAL) {
            return setTimeout(this._onTimerUpdate, timeToCall + interval, timeToCall + interval + timeCurrent);
        }
        return setTimeout(this._onTimerUpdate, timeToCall, timeToCall + timeCurrent);
    }
    _cancelAnimationFrame() {
        if (this._interval === -1 /* SYNC_REPAINT */ && Ticker.SYNC_REPAINT_AVAILABLE) {
            return __CAF__(this._handle);
        }
        return clearTimeout(this._handle);
    }
}
Ticker.MIN_INTERVAL = 10;
Ticker.SYNC_REPAINT_AVAILABLE = (!!__RAF__ && !!__CAF__);
exports.default = Ticker;
