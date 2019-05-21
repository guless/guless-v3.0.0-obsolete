/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import UIComponentMutationEvent from "./UIComponentMutationEvent";

interface IUIComponentMutationEventMap {
    [UIComponentMutationEvent.INSERTED]: UIComponentMutationEvent;
    [UIComponentMutationEvent.INSERTED_INTO_DOCUMENT]: UIComponentMutationEvent;
    [UIComponentMutationEvent.REMOVED]: UIComponentMutationEvent;
    [UIComponentMutationEvent.REMOVED_FROM_DOCUMENT]: UIComponentMutationEvent;
}

export default IUIComponentMutationEventMap;
