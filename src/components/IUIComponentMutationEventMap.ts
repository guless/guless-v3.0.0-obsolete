/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import UIComponentMutationEvent from "./UIComponentMutationEvent";
import * as UIComponentMutationEventType from "./UIComponentMutationEventType";

interface IUIComponentMutationEventMap {
    [UIComponentMutationEventType.INSERTED]: UIComponentMutationEvent;
    [UIComponentMutationEventType.INSERTED_INTO_DOCUMENT]: UIComponentMutationEvent;
    [UIComponentMutationEventType.REMOVED]: UIComponentMutationEvent;
    [UIComponentMutationEventType.REMOVED_FROM_DOCUMENT]: UIComponentMutationEvent;
}

export default IUIComponentMutationEventMap;
