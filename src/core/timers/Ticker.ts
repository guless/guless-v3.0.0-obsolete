/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import assert from "../assert";
import EventDispatcher from "../events/EventDispatcher";
import IAddEventListenerOptions from "../events/IAddEventListenerOptions";
import IEventListener from "../events/IEventListener";
import IEventListenerObject from "../events/IEventListenerObject";
import IEventListenerOptions from "../events/IEventListenerOptions";
import ITickerEventMap from "./ITickerEventMap";
import microtime from "./microtime";
import TickerEvent from "./TickerEvent";
import TickerInterval from "./TickerInterval";

const __RAF__: null | typeof requestAnimationFrame = (typeof requestAnimationFrame === "function" ? requestAnimationFrame : typeof webkitRequestAnimationFrame === "function" ? webkitRequestAnimationFrame : null);
const __CAF__: null | typeof cancelAnimationFrame  = (typeof cancelAnimationFrame  === "function" ? cancelAnimationFrame  : typeof webkitCancelAnimationFrame === "function" ? webkitCancelAnimationFrame : null);

class Ticker extends EventDispatcher {
    private static __SHARED_TICKER__: null | Ticker = null;

    public static readonly MIN_INTERVAL: number = 10;
    public static readonly CAN_SYNC_REPAINT: boolean = (!!__RAF__ && !!__CAF__);

    public static get shared(): Ticker {
        return (Ticker.__SHARED_TICKER__ || (Ticker.__SHARED_TICKER__ = new Ticker(TickerInterval.SYNC_REPAINT)));
    }
    
    private _handle?: any;
    private _running: boolean = false;
    private _interval: number;
    private _compatibleSyncRepaintInterval: number = TickerInterval.HIGH;
    
    constructor(interval: number = TickerInterval.SYNC_REPAINT) {
        super();
        assert((interval === TickerInterval.SYNC_REPAINT) || (interval >= Ticker.MIN_INTERVAL), `Ticker's "interval" must great than or equals "MIN_INTERVAL(${Ticker.MIN_INTERVAL}ms)".`);
        this._interval = interval;
    }
    
    public get interval(): number {
        return this._interval;
    }
    
    public get running(): boolean {
        return this._running;
    }
    
    public addEventListener<K extends keyof ITickerEventMap>(type: K, listener: (this: Ticker, event: ITickerEventMap[K]) => void, options?: boolean | IAddEventListenerOptions): void;
    public addEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions): void;
    public addEventListener(type: string, listener: any, options: any = false): void {
        super.addEventListener(type, listener, options);
    }
    
    public removeEventListener<K extends keyof ITickerEventMap>(type: K, listener: (this: Ticker, event: ITickerEventMap[K]) => void, options?: boolean | IEventListenerOptions): void;
    public removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IEventListenerOptions): void;
    public removeEventListener(type: string, listener: any, options: any = false): void {
        super.removeEventListener(type, listener, options);
    }
    
    public setCompatibleSyncRepaintInterval(value: number): void {
        assert(value >= Ticker.MIN_INTERVAL, `Ticker's "compatibleSyncRepaintInterval" must great than or equals "MIN_INTERVAL(${Ticker.MIN_INTERVAL}ms)".`);
        this._compatibleSyncRepaintInterval = value;
    }
    
    public getCompatibleSyncRepaintInterval(): number {
        return this._compatibleSyncRepaintInterval;
    }
    
    public start(): void {
        if (this._running) { return; }
        
        this._running = true;
        this._handle = this._requestAnimationFrame();
    }
    
    public stop(): void {
        if (!this._running) { return; }
        
        this._running = false;
        this._cancelAnimationFrame();
    }
    
    private _onRafUpdate: FrameRequestCallback = (time: number): void => this._onUpdate(microtime(time));
    private _onTimerUpdate: FrameRequestCallback = (time: number): void => this._onUpdate(time);

    private _onUpdate(time: number): void {
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
        this.dispatchEvent(new TickerEvent(TickerEvent.UPDATE, time, false, false));
        
        if (this._running) {
            this._handle = this._requestAnimationFrame();
        }
    }
    
    private _requestAnimationFrame(): any {
        if (this.interval === TickerInterval.SYNC_REPAINT && (__RAF__ && __CAF__)) {
            return __RAF__(this._onRafUpdate);
        }
        
        const timeInterval: number = (this._interval === TickerInterval.SYNC_REPAINT ? this._compatibleSyncRepaintInterval : this._interval);
        const timeCurrent: number = microtime();
        const timeToCall: number = timeInterval - (timeCurrent % timeInterval);
        
        /**
         * 如果本次调用的延时小于最小间隔(MIN_INTERVAL)的话，将回调函数放到下一帧调用。
         * @see [Reasons_for_delays_longer_than_specified](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified)
         */
        if (timeToCall < Ticker.MIN_INTERVAL) {
            return setTimeout(this._onTimerUpdate, timeToCall + timeInterval, timeToCall + timeInterval + timeCurrent);
        }
        
        return setTimeout(this._onTimerUpdate, timeToCall, timeToCall + timeCurrent);
    }
    
    private _cancelAnimationFrame(): void {
        if (this._interval === TickerInterval.SYNC_REPAINT && (__RAF__ && __CAF__)) {
            return __CAF__(this._handle);
        }
        
        return clearTimeout(this._handle);
    }
}

export default Ticker;
