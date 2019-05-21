/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @see https://tools.ietf.org/html/rfc3986
 */
class URI {
    /**
     * 2.2. Reserved Characters
     */
    public static shouldPercentEncodeOctets(value: number): boolean {
        return URI.shouldPercentEncodeOctetsGeneric(value) || URI.shouldPercentEncodeOctetsSubsets(value);
    }

    /**
     * Generic Syntax Delimiters
     */
    public static shouldPercentEncodeOctetsGeneric(value: number): boolean {
        return (
            value === 0x3A /*< : >*/ ||
            value === 0x2F /*< / >*/ ||
            value === 0x3F /*< ? >*/ ||
            value === 0x23 /*< # >*/ ||
            value === 0x5B /*< [ >*/ ||
            value === 0x5D /*< ] >*/ ||
            value === 0x40 /*< @ >*/
        );
    }

    /**
     * Subsets Syntax Delimiters
     */
    public static shouldPercentEncodeOctetsSubsets(value: number): boolean {
        return (
            value === 0x21 /*< ! >*/ ||
            value === 0x24 /*< $ >*/ ||
            value === 0x26 /*< & >*/ ||
            value === 0x27 /*< ' >*/ ||
            value === 0x28 /*< ( >*/ ||
            value === 0x29 /*< ) >*/ ||
            value === 0x2a /*< * >*/ ||
            value === 0x2b /*< + >*/ ||
            value === 0x2c /*< , >*/ ||
            value === 0x3B /*< ; >*/ ||
            value === 0x3D /*< = >*/
        );
    }

    public shouldPercentEncodeOctets(value: number): boolean {
        return URI.shouldPercentEncodeOctets(value);
    }

    // When authority is not present, the path cannot begin with two slash characters ("//"). 
}

export default URI;
