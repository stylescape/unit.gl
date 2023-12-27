// webpack.prod.js

import path from "path"
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";


// Resolve current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/**
 * Production Webpack Configuration
 * 
 */
export const configProduction = {

    // Set the mode to development or production
    mode: "production",

    // Performance settings to control webpack's hints
    performance: {
        // Maximum file size in bytes for an asset
        maxAssetSize: 5000000,
        // Maximum file size in bytes for an entry point
        maxEntrypointSize: 5000000,
        // Show an error for assets or entry points exceeding limits
        hints: 'error'
    },

    // context: path.join(__dirname, "your-app"),

    // Entry point for the application
    entry: './src/scss/index.scss',

    // output: {
    //     path: path.resolve(__dirname, "dist"),
    // },

    // Output configuration
    output: {
        library: "Stylescape",
        libraryTarget: "umd",
        libraryExport: "default",
        path: path.resolve(__dirname, "dist"),
        filename: "js/stylescape.js",
        clean: true, // Clean the output directory before emit
    },

    // Module rules for handling different types of files
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            // modules: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer' // Automatically add vendor prefixes to CSS
                                ]
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            // modules: false,
                        },
                    },
                ],
            },
        ],
    },

    // Plugins configuration
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: "css/stylescape.css",
            }
        ),
        new CopyWebpackPlugin(
            {
                patterns: [
                    {
                        from: "src/font",
                        to: "font"
                    }
                ]
            }
        ),
    ],


    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             terserOptions: {
    //                 format: {
    //                     comments: false, // Remove comments in the minified output
    //                 },
    //             },
    //             extractComments: false,
    //         }),
    //         new CssMinimizerPlugin(),
    //     ],
    // },

    // Source map generation for debugging (consider turning off for production)
    // Turn off source maps in production for better performance
    // devtool: 'source-map'
    devtool: false

};


export default configProduction
