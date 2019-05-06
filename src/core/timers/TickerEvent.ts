/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "../events/Event";
import ITickerEventMap from "./ITickerEventMap";
import * as TickerEventType from "./TickerEventType";

class TickerEvent extends Event {
    public static readonly UPDATE: string = TickerEventType.UPDATE;
    public static readonly COMPLETE: string = TickerEventType.COMPLETE;
    
    private _time: number;
    
    constructor(type: keyof ITickerEventMap, time?: number, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, time?: number, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, time: number = 0, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
        this._time = time;
    }
    
    public get time(): number {
        return this._time;
    }
}

export default TickerEvent;
