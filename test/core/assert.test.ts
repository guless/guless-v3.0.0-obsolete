/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import assert from "@guless/core/assert";
import AssertionError from "@guless/errors/AssertionError";

test("throw exceptions", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(false)).toThrow(AssertionError);
    expect(() => assert(false)).toThrow("assert failed!");
    expect(() => assert(false, "I am assertion error!")).toThrow("I am assertion error!");
});
