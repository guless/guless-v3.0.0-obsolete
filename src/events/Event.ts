/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import assert from "../core/assert";
import EventPhase from "./EventPhase";
import IEventDispatcher from "./IEventDispatcher";

class Event {
    private _type: string;
    private _bubbles: boolean;
    private _cancelable: boolean;
    private _target: null | IEventDispatcher = null;
    private _currentTarget: null | IEventDispatcher = null;
    private _eventPhase: EventPhase = EventPhase.NONE;
    private _isDispatched: boolean = false;
    private _isHandlingPassive: boolean = false;
    private _isDefaultPrevented: boolean = false;
    private _isStopPropagation: boolean = false;
    private _isStopImmediatePropagation: boolean = false;
    private _path: Array<IEventDispatcher> = [];
    private _pathWasInitialized: boolean = false;
    
    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        this._type = type;
        this._bubbles = bubbles;
        this._cancelable = cancelable;
    }
    
    /** @internal */
    set __internal__target(value: null | IEventDispatcher) {
        this._target = value;
    }
    
    /** @internal */
    set __internal__currentTarget(value: null | IEventDispatcher) {
        this._currentTarget = value;
    }
    
    /** @internal */
    set __internal__eventPhase(value: EventPhase) {
        this._eventPhase = value;
    }
    
    /** @internal */
    get __internal__isDispatched(): boolean {
        return this._isDispatched;
    }
    
    /** @internal */
    set __internal__isDispatched(value: boolean) {
        this._isDispatched = value;
    }
    
    /** @internal */
    set __internal__isHandlingPassive(value: boolean) {
        this._isHandlingPassive = value;
    }
    
    /** @internal */
    get __internal__isStopPropagation(): boolean {
        return this._isStopPropagation;
    }
    
    /** @internal */
    get __internal__isStopImmediatePropagation(): boolean {
        return this._isStopImmediatePropagation;
    }
    
    public get path(): ReadonlyArray<IEventDispatcher> {
        if (!this._pathWasInitialized && this._target && this._isDispatched) {
            this._pathWasInitialized = true;
            let current: null | IEventDispatcher = this._target;
            
            while (current) {
                this._path.push(current);
                current = current.parent && current !== current.parent ? current.parent : null;
            }
        }
        
        return this._path;
    }
    
    public get type(): string {
        return this._type;
    }
    
    public get bubbles(): boolean {
        return this._bubbles;
    }
    
    public get cancelable(): boolean {
        return this._cancelable;
    }
    
    public get target(): null | IEventDispatcher {
        return this._target;
    }
    
    public get currentTarget(): null | IEventDispatcher {
        return this._currentTarget;
    }
    
    public get eventPhase(): EventPhase {
        return this._eventPhase;
    }
    
    public get defaultPrevented(): boolean {
        return this._isDefaultPrevented;
    }
    
    public preventDefault(): void {
        assert(!this._isHandlingPassive, "Unable to preventDefault inside passive event listener invocation.");
        this._isDefaultPrevented = this._cancelable;
    }
    
    public stopPropagation(): void {
        this._isStopPropagation = true;
    }
    
    public stopImmediatePropagation(): void {
        this._isStopPropagation = true;
        this._isStopImmediatePropagation = true;
    }
}

export default Event;
