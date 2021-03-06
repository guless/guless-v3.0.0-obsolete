import EventDispatcher from "../events/EventDispatcher";
import IAddEventListenerOptions from "../events/IAddEventListenerOptions";
import IEventListener from "../events/IEventListener";
import IEventListenerObject from "../events/IEventListenerObject";
import IEventListenerOptions from "../events/IEventListenerOptions";
import ITickerEventMap from "./ITickerEventMap";
declare class Ticker extends EventDispatcher {
    static readonly MIN_INTERVAL: number;
    static readonly SYNC_REPAINT_AVAILABLE: boolean;
    private _handle?;
    private _running;
    private _interval;
    private _preferredSyncRepaintInterval;
    private _onRafUpdate;
    private _onTimerUpdate;
    constructor(interval?: number);
    readonly interval: number;
    readonly running: boolean;
    addEventListener<K extends keyof ITickerEventMap>(type: K, listener: (this: Ticker, event: ITickerEventMap[K]) => void, options?: boolean | IAddEventListenerOptions): void;
    addEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions): void;
    removeEventListener<K extends keyof ITickerEventMap>(type: K, listener: (this: Ticker, event: ITickerEventMap[K]) => void, options?: boolean | IEventListenerOptions): void;
    removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IEventListenerOptions): void;
    setPreferredSyncRepaintInterval(value: number): void;
    getPreferredSyncRepaintInterval(): number;
    start(): void;
    stop(): void;
    private _onUpdate;
    private _requestAnimationFrame;
    private _cancelAnimationFrame;
}
export default Ticker;
