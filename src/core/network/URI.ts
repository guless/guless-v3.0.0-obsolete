/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @see https://tools.ietf.org/html/rfc3986
 */
class URI {
    private _scheme: string = "";
    private _authority: string = "";
    private _path: string = "";
    private _query: string = "";
    private _fragment: string = "";

    public get scheme(): string {
        return this._scheme;
    }

    public get authority(): string {
        return this._authority;
    }

    public get path(): string {
        return this._path;
    }

    public get query(): string {
        return this._query;
    }

    public get fragment(): string {
        return this._fragment;
    }

    public relative(uri: URI): URI {
        return this;
    }

    public absolute(uri: URI): URI {
        return this;
    }
}

export default URI;
