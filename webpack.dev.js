import webpack from "webpack";
import paths from './webpack.paths.js'
import HtmlWebpackPlugin from 'html-webpack-plugin'


// Config | Development
export const configDevelopment = {

    // Set the mode to development or production
    mode: "development",
    // Control how source maps are generated
    // devtool: "inline-source-map",
    // Spin up a server for quick development
    devServer: {
        historyApiFallback: true,
        watchFiles: [
            paths.src + "/*",
            paths.public + "/*",
        ],
        port: 4040,
        open: true,
        compress: true,
        hot: true,
        static: {
            directory: paths.public + "/"
        },
    },


    plugins: [
        // Only update what has changed on hot reload
        new webpack.HotModuleReplacementPlugin(),
        // Serve test page
        new HtmlWebpackPlugin({
          template: './test/index.html',
        }),
    ],

};

export default configDevelopment
