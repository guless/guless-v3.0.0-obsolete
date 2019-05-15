/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import assert from "../assert";
import Event from "./Event";
import EventPhase from "./EventPhase";
import IAddEventListenerOptions from "./IAddEventListenerOptions";
import IEventDispatcher from "./IEventDispatcher";
import IEventListener from "./IEventListener";
import IEventListenerObject from "./IEventListenerObject";
import IEventListenerOptions from "./IEventListenerOptions";
import IRegisteredEventListenerMap from "./IRegisteredEventListenerMap";
import RegisteredEventListener from "./RegisteredEventListener";
import RegisteredEventListenerQueue from "./RegisteredEventListenerQueue";

class EventDispatcher implements IEventDispatcher {
    private _eventListenerMap: IRegisteredEventListenerMap = {};
    
    public addEventListener(type: string, listener: IEventListener | IEventListenerObject, options: boolean | IAddEventListenerOptions = false): void {
        if (!this._eventListenerMap[type]) {
            this._eventListenerMap[type] = new RegisteredEventListenerQueue();
        }
        
        this._eventListenerMap[type].add(new RegisteredEventListener(listener, options));
    }
    
    public removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options: boolean | IEventListenerOptions = false): void {
        if (!this._eventListenerMap[type]) {
            return;
        }
        
        this._eventListenerMap[type].remove(new RegisteredEventListener(listener, options));
    }
    
    public hasEventListener(type: string): boolean {
        return (this._eventListenerMap[type] && !this._eventListenerMap[type].isEmpty());
    }
    
    public dispatchEvent(event: Event): boolean {
        assert(!event.__internal__isDispatched, "Current event has already been dispatched.");
        
        event.__internal__isDispatched = true;
        event.__internal__target = this;
                
        const defaultWasNotPrevented: boolean = this._dispatchEventInternal(event);
        
        event.__internal__eventPhase = EventPhase.NONE;
        event.__internal__currentTarget = null;
        
        return defaultWasNotPrevented;
    }
    
    private _dispatchEventInternal(event: Event): boolean {
        /// 1) 不参与冒泡行为，因此仅调度 "AT_TARGET" 阶段的事件。
        /// 2) 当前对象不是嵌套的层级结构。
        if (!event.bubbles || !(this as IEventDispatcher).parent) {
            this._dispatchEventAtTarget(event);
            return !event.defaultPrevented;
        }
        
        /// 捕获阶段。
        this._dispatchEventAtCapturing(event);
        if (event.__internal__isStopPropagation) {
            return false;
        }
        
        /// 目标阶段。
        this._dispatchEventAtTarget(event);
        if (event.__internal__isStopPropagation) {
            return !event.defaultPrevented;
        }
        
        /// 冒泡阶段。
        this._dispatchEventAtBubbling(event);
        return !event.defaultPrevented;
    }
    
    private _dispatchEventAtTarget(event: Event): void {
        event.__internal__eventPhase = EventPhase.AT_TARGET;
        event.__internal__currentTarget = event.target;
        (event.currentTarget as EventDispatcher)._dispatchEventToListeners(event);
    }
    
    private _dispatchEventAtCapturing(event: Event): void {
        event.__internal__eventPhase = EventPhase.CAPTURING_PHASE;
        const path: ReadonlyArray<IEventDispatcher> = event.path;
        
        for (let i: number = path.length - 1; i > 0 && !event.__internal__isStopPropagation; --i) {
            event.__internal__currentTarget = path[i];
            (path[i] as EventDispatcher)._dispatchEventToListeners(event);
        }
    }
    
    private _dispatchEventAtBubbling(event: Event): void {
        event.__internal__eventPhase = EventPhase.BUBBLING_PHASE;
        const path: ReadonlyArray<IEventDispatcher> = event.path;
        
        for (let i: number = 1, size: number = path.length; i < size && !event.__internal__isStopPropagation; ++i) {
            event.__internal__currentTarget = path[i];
            (path[i] as EventDispatcher)._dispatchEventToListeners(event);
        }
    }
    
    private _dispatchEventToListeners(event: Event): void {
        if (!this.hasEventListener(event.type)) {
            return;
        }
        
        this._eventListenerMap[event.type].dispatch(event);
    }
}

export default EventDispatcher;
