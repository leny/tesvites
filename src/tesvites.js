/* tankipas
 * https://github.com/leny/tankipas
 *
 * JS/COFFEE Document - /cli.js - cli entry point, commander setup and runner
 *
 * Copyright (c) 2014 Leny
 * Licensed under the MIT license.
 */

import speedtest from "speedtest-net";
import Duration from "duration";
import moment from "moment";
import chalk from "chalk";
import program from "commander";

let pkg = require( "../package.json" ),
    options = {},
    dStart;

program
    .version( pkg.version )
    .usage( "[options]" )
    .description( pkg.description )
    .option( "-m, --max-time <max-time>", "The maximum length of a single test run (upload or download)" )
    .option( "-p, --ping-count <ping-count>", "The number of close servers to ping to find thew fastest one" )
    .option( "-s, --servers <servers>", "The number of servers to run a download test on. The fastest is used for the upload test and the fastest result is reported at the end." )
    // headers: Headers to send to speedtest.net // TODO
    .option( "-i, --id <server-id>", "ID of the server to restrict the tests against." )
    .option( "-l, --log-output", "Show the complete output of the test." )
    .parse( process.argv );

// --- get options

if ( program[ "max-time" ] ) {
    options[ "max-time" ] = program[ "max-time" ];
}
if ( program[ "ping-count" ] ) {
    options[ "ping-count" ] = program[ "ping-count" ];
}
if ( program.servers ) {
    options.servers = program.servers;
}
if ( program[ "server-id" ] ) {
    options[ "server-id" ] = program[ "server-id" ];
}
if ( program[ "log-output" ] ) {
    options.log = !!program[ "log-output" ];
}

// --- start test
dStart = new Date();

speedtest.visual( options, ( error, results ) => {
    let oDuration = new Duration( dStart, new Date() );

    if ( error ) {
        console.log( chalk.red.underline( "error:" ) );
        console.log( error.message );
        process.exit( 1 );
    }
    console.log( chalk.underline( "results:" ) );
    console.log( "  started:", chalk.cyan( moment( dStart ).format( "DD MMMM YYYY, HH:mm:ss" ) ) );
    console.log( "  duration:", chalk.cyan( oDuration.toString( 1, 1 ) ) );
    console.log( "  ping:", chalk.cyan( `${ results.server.ping } ms` ) );
    console.log( "  download:", chalk.cyan( `${ results.speeds.download } Mbps` ) );
    console.log( "  upload:", chalk.cyan( `${ results.speeds.upload } Mbps` ) );
    console.log();
    console.log( chalk.underline( "client:" ) );
    console.log( "  ip:", chalk.cyan( results.client.ip ) );
    console.log( "  position:" );
    console.log( "    latitude:", chalk.cyan( results.client.lat ) );
    console.log( "    longitude:", chalk.cyan( results.client.lon ) );
    console.log( "  isp:", chalk.cyan( results.client.isp ) );
    console.log( "    rating:", chalk.cyan( `${ results.client.isprating }/5` ) );
    console.log( "    average download speed:", chalk.cyan( `${ results.client.ispdlavg } Mbps` ) );
    console.log( "    average upload speed:", chalk.cyan( `${ results.client.ispulavg } Mbps` ) );
    console.log();
    console.log( chalk.underline( "server:" ) );
    console.log( "  host (ID):", chalk.cyan( results.server.host ), `(${ chalk.cyan( results.server.id ) })` );
    console.log( "  position:", chalk.cyan( `${ results.server.location }, ${ results.server.country } (${ results.server.cc })` ) );
    console.log( "    distance:", chalk.cyan( `${ results.server.distance } km` ) );
    console.log( "    latitude:", chalk.cyan( results.server.lat ) );
    console.log( "    longitude:", chalk.cyan( results.server.lon ) );
    process.exit( 0 );
} );
