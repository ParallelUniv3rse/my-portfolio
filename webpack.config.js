let ws = require('webpack-stream');
let webpack = ws.webpack;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var loaders = [
    {
        "test": /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        "loader": "babel-loader",
        "options": {
            "presets": ["env"],
            "plugins": [require('babel-plugin-transform-class-properties')],
            "cacheDirectory": true
        }
    }
];

module.exports = {
    output: {
        filename: 'client.js'
    },
    module: {
        loaders: loaders,
        // noParse: []
    },
    plugins: [
        new webpack.ProvidePlugin({}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: webpack.devtool && (webpack.devtool.indexOf("sourcemap") >= 0 || webpack.devtool.indexOf("source-map") >= 0)
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'webpackReport.html',
            defaultSizes: 'gzip',
            openAnalyzer: false
        })
    ],
    devtool: 'inline-source-map'
};
