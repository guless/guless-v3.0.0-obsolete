/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __PERF_NOW_SUPPORTED__: boolean = (typeof performance !== "undefined" && typeof performance.now === "function");
const __TIME_ORIGIN__: number = (__PERF_NOW_SUPPORTED__ ? Date.now() - performance.now() : 0);

function microtime(): number {
    return (__PERF_NOW_SUPPORTED__ ? __TIME_ORIGIN__ + performance.now() : Date.now());
}

export const TIME_ORIGIN: number = __TIME_ORIGIN__;
export default microtime;
