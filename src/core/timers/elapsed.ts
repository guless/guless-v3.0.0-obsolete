/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __MAX_DELAY__: number = 100;

function elapsed(t0: number, t1: number, limit: boolean = false): number {
    return limit ? Math.min(__MAX_DELAY__, Math.max(0, t1 - t0)) : Math.max(0, t1 - t0);
}

export default elapsed;
