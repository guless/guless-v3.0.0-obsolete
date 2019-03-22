/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "./Event";
import IAddEventListenerOptions from "./IAddEventListenerOptions";
import IEventListener from "./IEventListener";
import IEventListenerObject from "./IEventListenerObject";
import IEventListenerOptions from "./IEventListenerOptions";

interface IEventDispatcher {
    readonly parent?: IEventDispatcher;
    addEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions): void;
    removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IEventListenerOptions): void;
    hasEventListener(type: string): boolean;
    dispatchEvent(event: Event): boolean;
}

export default IEventDispatcher;
