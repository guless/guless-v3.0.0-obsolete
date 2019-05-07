/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "../core/events/Event";
import IUIComponentMutationEventMap from "./IUIComponentMutationEventMap";
import * as UIComponentMutationEventType from "./UIComponentMutationEventType";

class UIComponentMutationEvent extends Event {
    public static readonly INSERTED: string = UIComponentMutationEventType.INSERTED;
    public static readonly INSERTED_INTO_DOCUMENT: string = UIComponentMutationEventType.INSERTED_INTO_DOCUMENT;
    public static readonly REMOVED: string = UIComponentMutationEventType.REMOVED;
    public static readonly REMOVED_FROM_DOCUMENT: string = UIComponentMutationEventType.REMOVED_FROM_DOCUMENT;

    constructor(type: keyof IUIComponentMutationEventMap, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}

export default UIComponentMutationEvent;
