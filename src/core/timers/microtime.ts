/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __PERF_NOW__: boolean = (typeof performance !== "undefined" && typeof performance.now === "function");
const __TIME_ORIGIN__: number = (__PERF_NOW__ ? Date.now() - performance.now() : NaN);

function microtime(raftime?: number): number {
    if (__PERF_NOW__) {
        return (raftime === void 0 ? __TIME_ORIGIN__ + performance.now() : __TIME_ORIGIN__ + raftime);
    }

    return Date.now();
}

export default microtime;
