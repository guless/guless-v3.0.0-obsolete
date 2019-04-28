/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/// @Copyright ~2019 ☜Samlv9☞ and other contributors
/// @MIT-LICENSE | 3.0.0 | https://developers.guless.com/
/// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    if (!env || !env.path) { throw new Error(`Please specify the example module path by using "--env.path={{module}}" parameter.`); }
    
    return {
        mode: "development",
        devtool: false,
        context: __dirname,
        entry: env.path,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "main.js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".json"],
            alias: {
                "@guless": path.resolve(process.cwd(), "src"),
            }
        },
        module: {
            rules: [
                { 
                    test: /\.tsx?(\?.*)?$/, 
                    loader: "ts-loader", 
                    options: { configFile: path.resolve(__dirname, "./tsconfig.json") } 
                }
            ]
        },
        plugins: [
            new HtmlPlugin({ filename: `index.html`, template: "./template.html", path: env.path })
        ]
    };
};
