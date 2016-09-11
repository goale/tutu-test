module.exports = {
    entry: "./src/main.js",
    output: {
        filename: "./dist/bundle.js"
    },
    devtool: "source-map",
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ["", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            }
        ],
        preLoaders: [
            { test: /\.js$/, loader: 'source-map-loader' }
        ]
    },

    externals: {
        'jquery': '$',
        'underscore': '_',
        'backbone': 'Backbone'
    }
};
