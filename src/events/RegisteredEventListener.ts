/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "./Event";
import IAddEventListenerOptions from "./IAddEventListenerOptions";
import IEventListener from "./IEventListener";
import IEventListenerObject from "./IEventListenerObject";

class RegisteredEventListener {
    private _listener: IEventListener | IEventListenerObject;
    private _capture: boolean = false;
    private _context: any = null;
    private _once: boolean = false;
    private _passive: boolean = false;
    private _priority: number = 0;
    
    constructor(listener: IEventListener | IEventListenerObject, options: boolean | IAddEventListenerOptions = false) {
        this._listener = listener;
        
        if (typeof options === "boolean") {
            this._capture = options;
        } else {
            if (options.capture !== void 0) { this._capture = options.capture; }
            if (options.once !== void 0) { this._once = options.once; }
            if (options.passive !== void 0) { this._passive = options.passive; }
            if (options.priority !== void 0) { this._priority = options.priority; }
            if (options.context !== void 0) { this._context = options.context; }
        }
    }
    
    public get listener(): IEventListener | IEventListenerObject {
        return this._listener;
    }
    
    public get capture(): boolean {
        return this._capture;
    }
    
    public get context(): any {
        return this._context;
    }
    
    public get once(): boolean {
        return this._once;
    }
    
    public get passive(): boolean {
        return this._passive;
    }
    
    public get priority(): number {
        return this._priority;
    }
    
    public isEquals(registeredListener: RegisteredEventListener): boolean {
        return (this._listener === registeredListener._listener && this._capture === registeredListener._capture);
    }
    
    public handleEvent(event: Event): void {
        if (typeof this._listener === "function") {
            this._listener.call(this._context || event.currentTarget, event);
        } else {
            this._listener.handleEvent.call(this._context || this._listener, event);
        }
    }
}

export default RegisteredEventListener;
