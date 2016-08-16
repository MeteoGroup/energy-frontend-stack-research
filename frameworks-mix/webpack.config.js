var webpack = require("webpack");

module.exports = {
    entry: {
        container: "./container-app/Container.js",
        "widgets/reactWidget1": "./react-widgets/ReactWidget1.js",
        "widgets/reactWidget2": "./react-widgets/ReactWidget2.js",
    },
    output: {
        path: __dirname + "/public/",
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/, loader: "style!css"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("react-commons.bundle.js", ["widgets/reactWidget1", "widgets/reactWidget2"])
    ]
};
