import Event from "./Event";
interface IEventListenerObject {
    handleEvent(event: Event): void;
}
export default IEventListenerObject;
