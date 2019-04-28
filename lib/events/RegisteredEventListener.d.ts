import Event from "./Event";
import IAddEventListenerOptions from "./IAddEventListenerOptions";
import IEventListener from "./IEventListener";
import IEventListenerObject from "./IEventListenerObject";
declare class RegisteredEventListener {
    private _listener;
    private _capture;
    private _context;
    private _once;
    private _passive;
    private _priority;
    constructor(listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions);
    readonly listener: IEventListener | IEventListenerObject;
    readonly capture: boolean;
    readonly context: any;
    readonly once: boolean;
    readonly passive: boolean;
    readonly priority: number;
    isEquals(registeredListener: RegisteredEventListener): boolean;
    handleEvent(event: Event): void;
}
export default RegisteredEventListener;
