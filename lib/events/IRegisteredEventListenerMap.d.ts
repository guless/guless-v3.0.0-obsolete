import RegisteredEventListenerQueue from "./RegisteredEventListenerQueue";
interface IRegisteredEventListenerMap {
    [key: string]: RegisteredEventListenerQueue;
}
export default IRegisteredEventListenerMap;
