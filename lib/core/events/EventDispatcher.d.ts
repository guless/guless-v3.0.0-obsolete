import Event from "./Event";
import IAddEventListenerOptions from "./IAddEventListenerOptions";
import IEventDispatcher from "./IEventDispatcher";
import IEventListener from "./IEventListener";
import IEventListenerObject from "./IEventListenerObject";
import IEventListenerOptions from "./IEventListenerOptions";
declare class EventDispatcher implements IEventDispatcher {
    private _eventListenerMap;
    addEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions): void;
    removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IEventListenerOptions): void;
    hasEventListener(type: string): boolean;
    dispatchEvent(event: Event): boolean;
    private _dispatchEventInternal;
    private _dispatchEventAtTarget;
    private _dispatchEventAtCapturing;
    private _dispatchEventAtBubbling;
    private _dispatchEventToListeners;
}
export default EventDispatcher;
