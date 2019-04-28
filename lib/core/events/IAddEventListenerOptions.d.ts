import IEventListenerOptions from "./IEventListenerOptions";
interface IAddEventListenerOptions extends IEventListenerOptions {
    context?: any;
    once?: boolean;
    passive?: boolean;
    priority?: number;
}
export default IAddEventListenerOptions;
