/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import TickerEvent from "./TickerEvent";
import * as TickerEventType from "./TickerEventType";

interface ITickerEventMap {
    [TickerEventType.START]: TickerEvent;
    [TickerEventType.STOP]: TickerEvent;
    [TickerEventType.UPDATE]: TickerEvent;
    [TickerEventType.COMPLETE]: TickerEvent;
}

export default ITickerEventMap;
