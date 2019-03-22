/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import IEventListenerOptions from "./IEventListenerOptions";

interface IAddEventListenerOptions extends IEventListenerOptions {
    context?: any;
    once?: boolean;
    passive?: boolean;
    priority?: number;
}

export default IAddEventListenerOptions;
