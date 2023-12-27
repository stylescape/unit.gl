// nunjucks.config.js
const nunjucks = require("nunjucks");

// Custom filter example
function myCustomFilter(str) {
    // Modify the string or perform operations
    return str.toUpperCase();
}

// Configure Nunjucks environment
const env = nunjucks.configure("path/to/templates", { // Adjust the path to your templates
    autoescape: true, // Controls if output with dangerous characters are escaped automatically
    throwOnUndefined: false, // Throw errors when outputting a null/undefined value
    trimBlocks: true, // Automatically remove trailing newlines from a block/tag
    lstripBlocks: true, // Automatically remove leading whitespace from a block/tag
});

// Add custom filter
env.addFilter("myCustomFilter", myCustomFilter);

// Add global variables
env.addGlobal("globalVar", "Some Global Value");

// Export the configured environment for use in Webpack
module.exports = env;
