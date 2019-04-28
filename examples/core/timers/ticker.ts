/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import elapsed from "@guless/core/timers/elapsed";
import microtime from "@guless/core/timers/microtime";
import Ticker from "@guless/core/timers/Ticker";

const ticker: Ticker = new Ticker();

let t0: number = microtime();
let count: number = 0;

ticker.addEventListener("update", (evt) => {
    // tslint:disable-next-line:no-console
    console.log("update:", elapsed(t0, evt.time), elapsed(t0, microtime()), elapsed(microtime(), Date.now()));
    t0 = evt.time;
    
    if (++count >= 5) {
        ticker.stop();
    }
});

ticker.start();
