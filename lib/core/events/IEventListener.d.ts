import Event from "./Event";
interface IEventListener {
    (event: Event): void;
}
export default IEventListener;
