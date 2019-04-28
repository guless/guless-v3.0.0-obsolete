import Event from "./Event";
import RegisteredEventListener from "./RegisteredEventListener";
declare class RegisteredEventListenerQueue {
    private _locked;
    private _listeners;
    isEmpty(): boolean;
    add(listener: RegisteredEventListener): boolean;
    remove(listener: RegisteredEventListener): boolean;
    dispatch(event: Event): void;
}
export default RegisteredEventListenerQueue;
