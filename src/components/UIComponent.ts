/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import assert from "../core/assert";
import EventDispatcher from "../core/events/EventDispatcher";
import IAddEventListenerOptions from "../core/events/IAddEventListenerOptions";
import IEventListener from "../core/events/IEventListener";
import IEventListenerObject from "../core/events/IEventListenerObject";
import IEventListenerOptions from "../core/events/IEventListenerOptions";
import IUIComponentEventMap from "./IUIComponentEventMap";
import UIComponentMutationEvent from "./UIComponentMutationEvent";

abstract class UIComponent extends EventDispatcher {
    private static __SWAP_CHILDREN_PLACEHOLDER__: null | HTMLElement = null;

    private static createSwapChildrenPlaceHolder(): HTMLElement {
        return (UIComponent.__SWAP_CHILDREN_PLACEHOLDER__ || (UIComponent.__SWAP_CHILDREN_PLACEHOLDER__ = document.createElement("div")));
    }

    private _element: HTMLElement;
    private _documentContainer: null | HTMLElement = null;
    private _children: Array<UIComponent> = [];
    private _name: string = "";
    private _parent: null | UIComponent = null;

    constructor(element: HTMLElement) {
        super();
        this._element = element;
    }

    public get element(): HTMLElement {
        return this._element;
    }

    public get children(): ReadonlyArray<UIComponent> {
        return this._children;
    }

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
        this._element.setAttribute("data-name", this._name);
    }

    public get parent(): null | UIComponent {
        return this._parent;
    }

    public addEventListener<K extends keyof IUIComponentEventMap>(type: K, listener: (this: UIComponent, event: IUIComponentEventMap[K]) => void, options?: boolean | IAddEventListenerOptions): void;
    public addEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IAddEventListenerOptions): void;
    public addEventListener(type: string, listener: any, options: any = false): void {
        super.addEventListener(type, listener, options);
    }
    
    public removeEventListener<K extends keyof IUIComponentEventMap>(type: K, listener: (this: UIComponent, event: IUIComponentEventMap[K]) => void, options?: boolean | IEventListenerOptions): void;
    public removeEventListener(type: string, listener: IEventListener | IEventListenerObject, options?: boolean | IEventListenerOptions): void;
    public removeEventListener(type: string, listener: any, options: any = false): void {
        super.removeEventListener(type, listener, options);
    }

    public appendIntoDocument(container: HTMLElement): void {
        if (this._documentContainer) {
            this.removeFromDocument();
        }

        if (this._parent) {
            this.removeFromParent();
        }

        this._documentContainer = container;
        this._documentContainer.appendChild(this._element);

        this.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.INSERTED, false, false));
    }

    public insertIntoDocument(container: HTMLElement, beforeRefElement: null | HTMLElement): void {
        if (this._documentContainer) {
            this.removeFromDocument();
        }

        if (this._parent) {
            this.removeFromParent();
        }

        this._documentContainer = container;
        this._documentContainer.insertBefore(this._element, beforeRefElement);

        this.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.INSERTED, false, false));
    }

    public removeFromDocument(): void {
        if (this._documentContainer) {
            const container: HTMLElement = this._documentContainer;
            this._documentContainer = null;

            container.removeChild(this._element);
            this.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.REMOVED, false, false));
        }
    }

    public removeFromParent(): void {
        if (this._parent) {
            this._parent.removeChild(this);
        }
    }

    public getChildByName(name: string): null | UIComponent {
        for (let i: number = 0, len: number = this._children.length; i < len; ++i) {
            if (name === this._children[i].name) { return this._children[i]; }
        }
        return null;
    }

    public addChild(component: UIComponent): void {
        if (component._documentContainer) {
            component.removeFromDocument();
        }

        if (component._parent) {
            component.removeFromParent();
        }

        component._parent = this;

        this._children.push(component);
        this._element.appendChild(component._element);

        component.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.INSERTED, false, false));
    }

    public addChildAt(component: UIComponent, index: number): void {
        assert(index >= 0 && index <= this._children.length, `Index Of (${index}) if out of (${this._children.length}) bounds.`);

        if (component._documentContainer) {
            component.removeFromDocument();
        }

        if (component._parent) {
            component.removeFromParent();
        }

        component._parent = this;

        if (index < this._children.length) {
            const ref: HTMLElement = this._children[index]._element;

            this._children.splice(index, 0, component);
            this._element.insertBefore(component._element, ref);
        } else {
            this._children.push(component);
            this._element.insertBefore(component._element, null);
        }

        component.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.INSERTED, false, false));
    }

    public removeChild(component: UIComponent): void {
        const index: number = this._children.indexOf(component);

        if (index !== -1) {
            component._parent = null;

            this._children.splice(index, 1);
            this._element.removeChild(component._element);

            component.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.REMOVED, false, false));
        }
    }

    public removeChildAt(index: number): void {
        assert(index >= 0 && index < this._children.length, `Index Of (${index}) if out of (${this._children.length}) bounds.`);
        const component: UIComponent = this._children[index];

        component._parent = null;

        this._children.splice(index, 1);
        this._element.removeChild(component._element);

        component.dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.REMOVED, false, false));
    }

    public removeAllChildren(): void {
        const children: Array<UIComponent> = this._children;

        this._children = [];

        for (let i: number = 0, len: number = children.length; i < len; ++i) {
            children[i]._parent = null;
            this._element.removeChild(children[i]._element);
            children[i].dispatchEvent(new UIComponentMutationEvent(UIComponentMutationEvent.REMOVED, false, false));
        }
    }

    public swapChildren(component1: UIComponent, component2: UIComponent): void {
        if (component1 === component2) { return; }
        const index1: number = this._children.indexOf(component1);
        const index2: number = this._children.indexOf(component2);

        assert(index1 !== -1 && index2 !== -1, `Swap's children must be a child of parent UIComponent.`);

        this._children[index1] = component2;
        this._children[index2] = component1;

        const placeholder: HTMLElement = UIComponent.createSwapChildrenPlaceHolder();

        /// #BUG: 这里会触发 DOMMutationEvent 类型的事件。
        this._element.replaceChild(placeholder, component2._element);
        this._element.replaceChild(component2._element, component1._element);
        this._element.replaceChild(component1._element, placeholder);
    }
}

export default UIComponent;
