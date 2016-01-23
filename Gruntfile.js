/* tesvites
 * https://github.com/leny/tesvites
 *
 * Copyright (c) 2015 Leny
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function( grunt ) {

    require( "load-grunt-tasks" )( grunt );

    grunt.initConfig( {
        "eslint": {
            "src": [ "src/**/*.js" ]
        },
        "babel": {
            "options": {
                "presets": [ "es2015" ],
                // "plugins": [ "transform-es2015-modules-umd" ]
            },
            "src": {
                "files": [ {
                    "expand": true,
                    "cwd": "src/",
                    "src": [ "**/*.js" ],
                    "dest": "lib/"
                } ]
            }
        },
        "watch": {
            "src": {
                "files": "src/**/¨.js",
                "tasks": [ "default" ]
            }
        }
    } );

    grunt.registerTask( "default", [
        "eslint",
        "babel"
    ] );

    grunt.registerTask( "work", [
        "default",
        "watch"
    ] );

};
