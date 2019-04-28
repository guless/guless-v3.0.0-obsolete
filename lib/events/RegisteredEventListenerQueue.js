"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisteredEventListenerQueue {
    constructor() {
        this._locked = false;
        this._listeners = [];
    }
    isEmpty() {
        return this._listeners.length === 0;
    }
    add(listener) {
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
        for (let i = this._listeners.length - 1; i >= 0; --i) {
            const registeredListener = this._listeners[i];
            if (listener.priority <= registeredListener.priority) {
                this._listeners.splice(i + 1, 0, listener);
                return true;
            }
        }
        return false;
    }
    remove(listener) {
        if (this._locked) {
            this._locked = false;
            this._listeners = this._listeners.slice(0);
        }
        for (let i = 0, size = this._listeners.length; i < size; ++i) {
            const registeredListener = this._listeners[i];
            if (listener.isEquals(registeredListener)) {
                this._listeners.splice(i, 1);
                return true;
            }
        }
        return false;
    }
    dispatch(event) {
        this._locked = true;
        for (let i = 0, size = this._listeners.length; i < size && !event.__internal__isStopImmediatePropagation; ++i) {
            const registeredListener = this._listeners[i];
            if ((event.eventPhase === 1 /* CAPTURING_PHASE */ && !registeredListener.capture) ||
                (event.eventPhase === 3 /* BUBBLING_PHASE */ && registeredListener.capture)) {
                continue;
            }
            if (registeredListener.passive) {
                event.__internal__isHandlingPassive = true;
                registeredListener.handleEvent(event);
                event.__internal__isHandlingPassive = false;
            }
            else {
                registeredListener.handleEvent(event);
            }
            if (registeredListener.once) {
                this.remove(registeredListener);
            }
        }
        this._locked = false;
    }
}
exports.default = RegisteredEventListenerQueue;
