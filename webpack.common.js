// webpack.common.js

// Import necessary dependencies and configuration files
import paths from "./webpack.paths.js";

/**
 * Common Webpack Configuration
 * 
 * This configuration file is the base for both development and production
 * environments. It includes configurations that are common across both.
 */
const configCommon = {

    // Target environment
    // ========================================================================
    // target: "web",
    target: ['web', 'es5'],

    // Entry points
    // ========================================================================
    // Entry points for the application
    // Where webpack looks to start building the bundle
    entry: {
        index: `${paths.src}/ts/index.ts`
        // index: paths.src + "/ts/index.ts"
    },

    // Module
    // ========================================================================
    // Module rules for handling different file types
    // Determine how modules within the project are treated
    module: {
        // entry: './js/index.js',
        // ...
        // target: ['web', 'es5'],
        rules: [

            // TypeScript Rules
            // ----------------------------------------------------------------
            // Compiles TypeScript (.ts) files to JavaScript and enables 
            // additional features for development
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    // Babel Loader
                    // Transpiles TypeScript to JavaScript with Babel.
                    // This allows for the use of the latest JavaScript
                    // features and ensures compatibility with older browsers.
                    // {
                    //     loader: 'babel-loader',
                    //     options: {
                    //         presets: [
                    //             // Preset for compiling ES6+ syntax
                    //             // Preset for compiling modern JavaScript to a more compatible version
                    //             ['@babel/preset-env', {
                    //                 targets: "> 0.25%, not dead", // Define target environments
                    //                 useBuiltIns: 'usage', // Only include polyfills and transforms needed for target environments
                    //                 corejs: 3, // Specify the core-js version for polyfills
                    //                 // modules: true // Preserve ECMAScript modules for tree shaking in Webpack
                    //                 modules: false // Preserve ECMAScript modules for tree shaking in Webpack
                    //             }],


                    //             // Preset for handling TypeScript
                    //             '@babel/preset-typescript'
                    //         ],
                    //         caller: {
                    //             supportsStaticESM: true
                    //         },
                    //         plugins: [
                    //             // Add any necessary Babel plugins here
                    //             // Enables dynamic import syntax in JavaScript (important for code splitting in ESM)
                    //             '@babel/plugin-syntax-dynamic-import',
                                
                    //             // Other plugins that your project might need
                    //         ],
                    //     },
                    // },
                    // TypeScript Loader
                    // Handles the TypeScript compilation
                    {
                        loader: 'ts-loader',
                        options: {
                            // Enable transpileOnly to speed up compilation in
                            // development mode
                            // Note: This disables type checking during Webpack
                            // compilation.
                            // Type checking can be done separately (e.g., via
                            // a script or in the IDE).
                            transpileOnly: process.env.NODE_ENV === 'development',

                            // Configure additional ts-loader options as needed
                            // For example, specify a custom tsconfig.json or
                            // enable/disable certain compiler options
                        },
                    },
                ],
            },

            // JavaScript Loader
            // ----------------------------------------------------------------
            // JavaScript // remove babel from packages?
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     use: ["babel-loader"],
            // },
    
            // Font Loader
            // ----------------------------------------------------------------
            // Fonts and SVGs
            // Asset Loader: Inlines fonts and SVGs as data URIs
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: "asset/inline",
            },

            // SCSS Loader
            // ----------------------------------------------------------------
            // Converts SCSS files to strings and compresses the output
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    "sass-to-string",
                    {
                        loader: "sass-loader",
                        options: { sassOptions: { outputStyle: "compressed" } },
                    },
                ],
            },
            // CSS, PostCSS, and Sass
            // {
            //     test: /\.(scss|css)$/,
            //     use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
            // },

            // CSS Loader
            // ----------------------------------------------------------------
            // Handles importing CSS files
            {
                test: /\.css$/,
                use: "css-loader",
            },

            // Image Loader
            // ----------------------------------------------------------------
            // Manages image files and optimizes them for web
            {
                // test: /\.(ico|gif|png|jpg|jpeg|svg)$/,
                test: /\.(?:ico|gif|png|jpg|jpeg|svg|gif)$/i,
                type: "asset/resource",
            },

            // Nunjucks Loader
            // ----------------------------------------------------------------
            // Processes Nunjucks templates
            {
                test: /\.(njk|nunjucks|jinja)$/,
                loader: "nunjucks-loader",
                // Add any specific loader options here as needed
                // query: {
                    // config: __dirname + "/src/nunjucks.config.js",
                    // jinjaCompat: true,
                    // root: __dirname + "/path/to/templates",
                    // quiet: true // Don"t show the "Cannot configure nunjucks environment before precompile" warning
                // }
            }
        ],
    },


    // Resolve configurations
    // Simplifies module resolution
    resolve: {
        modules: [paths.src, "node_modules"],
        extensions: [
            ".ts", ".tsx",
            ".js", ".jsx",
            ".json",
            ".scss"
        ],
        alias: {
            // Alias for source and assets paths
            "@": paths.src,
            assets: paths.public,
        },
    },

    // Where webpack outputs the assets and bundles
    // output: {
    //     path: paths.build,
    //     filename: "[name].bundle.js",
    // },
    // output: {
    //     library: "Stylescape",
    //     libraryTarget: "umd",
    //     libraryExport: "default",
    //     path: paths.build,
    //     filename: "widget.js",
    // },

    // Plugins:
    // Add any common plugins for both development and production here
    // Customize the webpack build process
    plugins: [

        // Removes/cleans build folders and unused assets when rebuilding
        // new CleanWebpackPlugin(
        // ),

        // Copies files from target to destination folder
        // new CopyWebpackPlugin(
        //     {
        //         patterns: [
        //             {
        //                 from: paths.public,
        //                 to: "assets",
        //                 globOptions: {
        //                     ignore: ["*.DS_Store"],
        //                 },
        //                 noErrorOnMissing: true,
        //             },
        //         ],
        //     }
        // ),

        // Generates an HTML file from a template
        // new HtmlWebpackPlugin(
        //     {
        //         title: "NIJI",
        //         template: paths.src + "/index.html",
        //         filename: "index.html",
        //     }
        // ),

    ],
};

// Config | Export
export default configCommon
