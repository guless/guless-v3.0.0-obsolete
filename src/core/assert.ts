/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function assert(condition: boolean, message: string = "assert failed!"): void {
    if (!condition) { throw new Error(`[GULESS] ${message}`); }
}

export default assert;
