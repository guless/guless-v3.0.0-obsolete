/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import Event from "../core/events/Event";
import IUIComponentMutationEventMap from "./IUIComponentMutationEventMap";

class UIComponentMutationEvent extends Event {
    public static readonly INSERTED = "inserted";
    public static readonly INSERTED_INTO_DOCUMENT = "insertedIntoDocument";
    public static readonly REMOVED = "removed";
    public static readonly REMOVED_FROM_DOCUMENT = "removedFromDocument";

    constructor(type: keyof IUIComponentMutationEventMap, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}

export default UIComponentMutationEvent;
