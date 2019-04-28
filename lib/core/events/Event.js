"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const assert_1 = require("../assert");
class Event {
    constructor(type, bubbles = false, cancelable = false) {
        this._target = null;
        this._currentTarget = null;
        this._eventPhase = 0 /* NONE */;
        this._isDispatched = false;
        this._isHandlingPassive = false;
        this._isDefaultPrevented = false;
        this._isStopPropagation = false;
        this._isStopImmediatePropagation = false;
        this._path = [];
        this._pathWasInitialized = false;
        this._type = type;
        this._bubbles = bubbles;
        this._cancelable = cancelable;
    }
    /** @internal */
    set __internal__target(value) {
        this._target = value;
    }
    /** @internal */
    set __internal__currentTarget(value) {
        this._currentTarget = value;
    }
    /** @internal */
    set __internal__eventPhase(value) {
        this._eventPhase = value;
    }
    /** @internal */
    get __internal__isDispatched() {
        return this._isDispatched;
    }
    /** @internal */
    set __internal__isDispatched(value) {
        this._isDispatched = value;
    }
    /** @internal */
    set __internal__isHandlingPassive(value) {
        this._isHandlingPassive = value;
    }
    /** @internal */
    get __internal__isStopPropagation() {
        return this._isStopPropagation;
    }
    /** @internal */
    get __internal__isStopImmediatePropagation() {
        return this._isStopImmediatePropagation;
    }
    get path() {
        if (!this._pathWasInitialized && this._target && this._isDispatched) {
            this._pathWasInitialized = true;
            let current = this._target;
            while (current) {
                this._path.push(current);
                current = current.parent && current !== current.parent ? current.parent : null;
            }
        }
        return this._path;
    }
    get type() {
        return this._type;
    }
    get bubbles() {
        return this._bubbles;
    }
    get cancelable() {
        return this._cancelable;
    }
    get target() {
        return this._target;
    }
    get currentTarget() {
        return this._currentTarget;
    }
    get eventPhase() {
        return this._eventPhase;
    }
    get defaultPrevented() {
        return this._isDefaultPrevented;
    }
    preventDefault() {
        assert_1.default(!this._isHandlingPassive, "Unable to preventDefault inside passive event listener invocation.");
        this._isDefaultPrevented = this._cancelable;
    }
    stopPropagation() {
        this._isStopPropagation = true;
    }
    stopImmediatePropagation() {
        this._isStopPropagation = true;
        this._isStopImmediatePropagation = true;
    }
}
exports.default = Event;
