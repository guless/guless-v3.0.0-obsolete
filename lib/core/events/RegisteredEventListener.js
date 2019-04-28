"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisteredEventListener {
    constructor(listener, options = false) {
        this._capture = false;
        this._context = null;
        this._once = false;
        this._passive = false;
        this._priority = 0;
        this._listener = listener;
        if (typeof options === "boolean") {
            this._capture = options;
        }
        else {
            if (options.capture !== void 0) {
                this._capture = options.capture;
            }
            if (options.once !== void 0) {
                this._once = options.once;
            }
            if (options.passive !== void 0) {
                this._passive = options.passive;
            }
            if (options.priority !== void 0) {
                this._priority = options.priority;
            }
            if (options.context !== void 0) {
                this._context = options.context;
            }
        }
    }
    get listener() {
        return this._listener;
    }
    get capture() {
        return this._capture;
    }
    get context() {
        return this._context;
    }
    get once() {
        return this._once;
    }
    get passive() {
        return this._passive;
    }
    get priority() {
        return this._priority;
    }
    isEquals(registeredListener) {
        return (this._listener === registeredListener._listener && this._capture === registeredListener._capture);
    }
    handleEvent(event) {
        if (typeof this._listener === "function") {
            this._listener.call(this._context || event.currentTarget, event);
        }
        else {
            this._listener.handleEvent.call(this._context || this._listener, event);
        }
    }
}
exports.default = RegisteredEventListener;
