/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "@guless/events/Event";
import EventDispatcher from "@guless/events/EventDispatcher";
import EventPhase from "@guless/events/EventPhase";
import IEventListener from "@guless/events/IEventListener";

test("add/remove event listeners", () => {
    const element: EventDispatcher = new EventDispatcher();
    const handler: IEventListener = jest.fn();
    
    element.removeEventListener("click", handler); // only for code coverage
    
    element.addEventListener("click", handler);
    expect(element.hasEventListener("click")).toBe(true);
    
    element.removeEventListener("click", handler);
    expect(element.hasEventListener("click")).toBe(false);
});

test("dispatch events", () => {
    const element: EventDispatcher = new EventDispatcher();
    const handler: IEventListener = jest.fn();
    const clickEvent: Event = new Event("click", false, false);
    
    element.dispatchEvent(new Event("click")); // only for code coverage
    
    element.addEventListener("click", handler);
    element.dispatchEvent(clickEvent);
    
    expect(handler).toBeCalledTimes(1);
    expect(handler).toBeCalledWith(clickEvent);
});

// tslint:disable-next-line:max-classes-per-file
class Node extends EventDispatcher {
    constructor(public parent?: Node) { super(); }
}

test("dispatch bubbles events", () => {
    const root: Node = new Node();
    const parent: Node = new Node(root);
    const child: Node = new Node(parent);
    const clickEvent: Event = new Event("click", true, false);
    
    let counter: number = 0;
    
    const rootCapturingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(0);
        expect(event.eventPhase).toBe(EventPhase.CAPTURING_PHASE);
    });
    const rootBubblingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(5);
        expect(event.eventPhase).toBe(EventPhase.BUBBLING_PHASE);
    });
    const parentCapturingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(1);
        expect(event.eventPhase).toBe(EventPhase.CAPTURING_PHASE);
    });
    const parentBubblingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(4);
        expect(event.eventPhase).toBe(EventPhase.BUBBLING_PHASE);
    });
    const childCapturingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(2);
        expect(event.eventPhase).toBe(EventPhase.AT_TARGET);
    });
    const childBubblingHandler: IEventListener = jest.fn((event: Event) => {
        expect(counter++).toBe(3);
        expect(event.eventPhase).toBe(EventPhase.AT_TARGET);
    });
    
    root.addEventListener("click", rootCapturingHandler, true);
    root.addEventListener("click", rootBubblingHandler, false);
    parent.addEventListener("click", parentCapturingHandler, true);
    parent.addEventListener("click", parentBubblingHandler, false);
    child.addEventListener("click", childCapturingHandler, true);
    child.addEventListener("click", childBubblingHandler, false);
    
    child.dispatchEvent(clickEvent);
    
    expect(rootCapturingHandler).toBeCalledTimes(1);
    expect(rootCapturingHandler).toBeCalledWith(clickEvent);
    
    expect(rootBubblingHandler).toBeCalledTimes(1);
    expect(rootBubblingHandler).toBeCalledWith(clickEvent);
    
    expect(parentCapturingHandler).toBeCalledTimes(1);
    expect(parentCapturingHandler).toBeCalledWith(clickEvent);
    
    expect(parentBubblingHandler).toBeCalledTimes(1);
    expect(parentBubblingHandler).toBeCalledWith(clickEvent);
    
    expect(childCapturingHandler).toBeCalledTimes(1);
    expect(childCapturingHandler).toBeCalledWith(clickEvent);
    
    expect(childBubblingHandler).toBeCalledTimes(1);
    expect(childBubblingHandler).toBeCalledWith(clickEvent);
});
