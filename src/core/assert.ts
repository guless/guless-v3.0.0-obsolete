/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import AssertionError from "./errors/AssertionError";

function assert(condition: boolean, message: string = "assert failed!"): void {
    if (!condition) { throw new AssertionError(message); }
}

export default assert;
