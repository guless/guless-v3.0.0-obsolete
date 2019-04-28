/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "./Event";
import EventPhase from "./EventPhase";
import RegisteredEventListener from "./RegisteredEventListener";

class RegisteredEventListenerQueue {
    private _locked: boolean = false;
    private _listeners: Array<RegisteredEventListener> = [];
    
    public isEmpty(): boolean {
        return this._listeners.length === 0;
    }
    
    public add(listener: RegisteredEventListener): boolean {
        if (this._locked) {
            this._locked = false;
            this._listeners = this._listeners.slice(0);
        }
        
        this.remove(listener);
        
        if (this.isEmpty() || listener.priority <= this._listeners[this._listeners.length - 1].priority) {
            this._listeners.push(listener);
            return true;
        }
        
        if (listener.priority > this._listeners[0].priority) {
            this._listeners.unshift(listener);
            return true;
        }
        
        for (let i: number = this._listeners.length - 1; i >= 0; --i) {
            const registeredListener: RegisteredEventListener = this._listeners[i];
            
            if (listener.priority <= registeredListener.priority) {
                this._listeners.splice(i + 1, 0, listener);
                return true;
            }
        }
        
        return false;
    }
    
    public remove(listener: RegisteredEventListener): boolean {
        if (this._locked) {
            this._locked = false;
            this._listeners = this._listeners.slice(0);
        }
        
        for (let i: number = 0, size: number = this._listeners.length; i < size; ++i) {
            const registeredListener: RegisteredEventListener = this._listeners[i];
            
            if (listener.isEquals(registeredListener)) {
                this._listeners.splice(i, 1);
                return true;
            }
        }
        
        return false;
    }
    
    public dispatch(event: Event): void {
        this._locked = true;
        for (let i: number = 0, size: number = this._listeners.length; i < size && !event.__internal__isStopImmediatePropagation; ++i) {
            const registeredListener: RegisteredEventListener = this._listeners[i];
            
            if ((event.eventPhase === EventPhase.CAPTURING_PHASE && !registeredListener.capture) ||
                (event.eventPhase === EventPhase.BUBBLING_PHASE && registeredListener.capture)) {
                    
                continue;
            }
            
            if (registeredListener.passive) {
                event.__internal__isHandlingPassive = true;
                registeredListener.handleEvent(event);
                event.__internal__isHandlingPassive = false;
            } else {
                registeredListener.handleEvent(event);
            }
            
            if (registeredListener.once) {
                this.remove(registeredListener);
            }
        }
        this._locked = false;
    }
}

export default RegisteredEventListenerQueue;
