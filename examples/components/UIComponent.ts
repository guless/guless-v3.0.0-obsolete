import UIComponent from "@guless/components/UIComponent";

// tslint:disable
class UIDivComponent extends UIComponent {
    constructor() { super(document.createElement("div")); }
}

class UISpanComponent extends UIComponent {
    constructor() { super(document.createElement("div")); }
}

const div: UIDivComponent = new UIDivComponent();
const span1: UISpanComponent = new UISpanComponent();
const span2: UISpanComponent = new UISpanComponent();

span1.element.textContent = "span1";
span2.element.textContent = "span2";

span1.element.addEventListener("DOMNodeInserted", () => { console.log("inserted span1"); });
span2.element.addEventListener("DOMNodeInserted", () => { console.log("inserted span2"); });
span1.element.addEventListener("DOMNodeInsertedIntoDocument", () => { console.log("inserted into document span1"); });
span2.element.addEventListener("DOMNodeInsertedIntoDocument", () => { console.log("inserted into document span2"); });
span1.element.addEventListener("DOMNodeRemoved", () => { console.log("removed span1"); });
span2.element.addEventListener("DOMNodeRemoved", () => { console.log("removed span2"); });
span1.element.addEventListener("DOMNodeRemovedFromDocument", () => { console.log("removed from document span1"); });
span2.element.addEventListener("DOMNodeRemovedFromDocument", () => { console.log("removed from document span2"); });

div.element.addEventListener("click", () => {
    div.swapChildren(span1, span2);
});

div.addChild(span1);
div.addChild(span2);
console.log("-----------inserted into document------------");
document.body.appendChild(div.element);