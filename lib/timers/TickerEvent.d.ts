import Event from "../events/Event";
import ITickerEventMap from "./ITickerEventMap";
declare class TickerEvent extends Event {
    static readonly UPDATE: string;
    static readonly COMPLETE: string;
    private _time;
    constructor(type: keyof ITickerEventMap, time?: number, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, time?: number, bubbles?: boolean, cancelable?: boolean);
    readonly time: number;
}
export default TickerEvent;
