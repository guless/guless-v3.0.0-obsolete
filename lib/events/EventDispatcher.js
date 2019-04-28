"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const assert_1 = require("../assert");
const RegisteredEventListener_1 = require("./RegisteredEventListener");
const RegisteredEventListenerQueue_1 = require("./RegisteredEventListenerQueue");
class EventDispatcher {
    constructor() {
        this._eventListenerMap = {};
    }
    addEventListener(type, listener, options = false) {
        if (!this._eventListenerMap[type]) {
            this._eventListenerMap[type] = new RegisteredEventListenerQueue_1.default();
        }
        this._eventListenerMap[type].add(new RegisteredEventListener_1.default(listener, options));
    }
    removeEventListener(type, listener, options = false) {
        if (!this._eventListenerMap[type]) {
            return;
        }
        this._eventListenerMap[type].remove(new RegisteredEventListener_1.default(listener, options));
    }
    hasEventListener(type) {
        return (this._eventListenerMap[type] && !this._eventListenerMap[type].isEmpty());
    }
    dispatchEvent(event) {
        assert_1.default(!event.__internal__isDispatched, "Event has already been dispatched.");
        event.__internal__isDispatched = true;
        event.__internal__target = this;
        const defaultWasNotPrevented = this._dispatchEventInternal(event);
        event.__internal__eventPhase = 0 /* NONE */;
        event.__internal__currentTarget = null;
        return defaultWasNotPrevented;
    }
    _dispatchEventInternal(event) {
        if (!event.bubbles) { // 不参与冒泡行为，因此仅调度 "AT_TARGET" 阶段的事件。
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
    _dispatchEventAtTarget(event) {
        event.__internal__eventPhase = 2 /* AT_TARGET */;
        event.__internal__currentTarget = event.target;
        event.currentTarget._dispatchEventToListeners(event);
    }
    _dispatchEventAtCapturing(event) {
        event.__internal__eventPhase = 1 /* CAPTURING_PHASE */;
        const path = event.path;
        for (let i = path.length - 1; i > 0 && !event.__internal__isStopPropagation; --i) {
            event.__internal__currentTarget = path[i];
            path[i]._dispatchEventToListeners(event);
        }
    }
    _dispatchEventAtBubbling(event) {
        event.__internal__eventPhase = 3 /* BUBBLING_PHASE */;
        const path = event.path;
        for (let i = 1, size = path.length; i < size && !event.__internal__isStopPropagation; ++i) {
            event.__internal__currentTarget = path[i];
            path[i]._dispatchEventToListeners(event);
        }
    }
    _dispatchEventToListeners(event) {
        if (!this.hasEventListener(event.type)) {
            return;
        }
        this._eventListenerMap[event.type].dispatch(event);
    }
}
exports.default = EventDispatcher;
