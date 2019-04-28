import EventPhase from "./EventPhase";
import IEventDispatcher from "./IEventDispatcher";
declare class Event {
    private _type;
    private _bubbles;
    private _cancelable;
    private _target;
    private _currentTarget;
    private _eventPhase;
    private _isDispatched;
    private _isHandlingPassive;
    private _isDefaultPrevented;
    private _isStopPropagation;
    private _isStopImmediatePropagation;
    private _path;
    private _pathWasInitialized;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    /** @internal */
    __internal__target: null | IEventDispatcher;
    /** @internal */
    __internal__currentTarget: null | IEventDispatcher;
    /** @internal */
    __internal__eventPhase: EventPhase;
    /** @internal */
    /** @internal */
    __internal__isDispatched: boolean;
    /** @internal */
    __internal__isHandlingPassive: boolean;
    /** @internal */
    readonly __internal__isStopPropagation: boolean;
    /** @internal */
    readonly __internal__isStopImmediatePropagation: boolean;
    readonly path: ReadonlyArray<IEventDispatcher>;
    readonly type: string;
    readonly bubbles: boolean;
    readonly cancelable: boolean;
    readonly target: null | IEventDispatcher;
    readonly currentTarget: null | IEventDispatcher;
    readonly eventPhase: EventPhase;
    readonly defaultPrevented: boolean;
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
}
export default Event;
