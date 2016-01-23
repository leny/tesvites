"use strict";

var _speedtestNet = require("speedtest-net");

var _speedtestNet2 = _interopRequireDefault(_speedtestNet);

var _duration = require("duration");

var _duration2 = _interopRequireDefault(_duration);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require("../package.json"),
    options = {},
    dStart = undefined; /* tankipas
                         * https://github.com/leny/tankipas
                         *
                         * JS/COFFEE Document - /cli.js - cli entry point, commander setup and runner
                         *
                         * Copyright (c) 2014 Leny
                         * Licensed under the MIT license.
                         */

_commander2.default.version(pkg.version).usage("[options]").description(pkg.description).option("-m, --max-time <max-time>", "The maximum length of a single test run (upload or download)").option("-p, --ping-count <ping-count>", "The number of close servers to ping to find thew fastest one").option("-s, --servers <servers>", "The number of servers to run a download test on. The fastest is used for the upload test and the fastest result is reported at the end.")
// headers: Headers to send to speedtest.net // TODO
.option("-i, --id <server-id>", "ID of the server to restrict the tests against.").option("-l, --log-output", "Show the complete output of the test.").parse(process.argv);

// --- get options

if (_commander2.default["max-time"]) {
    options["max-time"] = _commander2.default["max-time"];
}
if (_commander2.default["ping-count"]) {
    options["ping-count"] = _commander2.default["ping-count"];
}
if (_commander2.default.servers) {
    options.servers = _commander2.default.servers;
}
if (_commander2.default["server-id"]) {
    options["server-id"] = _commander2.default["server-id"];
}
if (_commander2.default["log-output"]) {
    options.log = !!_commander2.default["log-output"];
}

// --- start test
dStart = new Date();

_speedtestNet2.default.visual(options, function (error, results) {
    var oDuration = new _duration2.default(dStart, new Date());

    if (error) {
        console.log(_chalk2.default.red.underline("error:"));
        console.log(error.message);
        process.exit(1);
    }
    console.log(_chalk2.default.underline("results:"));
    console.log("  started:", _chalk2.default.cyan((0, _moment2.default)(dStart).format("DD MMMM YYYY, HH:mm:ss")));
    console.log("  duration:", _chalk2.default.cyan(oDuration.toString(1, 1)));
    console.log("  ping:", _chalk2.default.cyan(results.server.ping + " ms"));
    console.log("  download:", _chalk2.default.cyan(results.speeds.download + " Mbps"));
    console.log("  upload:", _chalk2.default.cyan(results.speeds.upload + " Mbps"));
    console.log();
    console.log(_chalk2.default.underline("client:"));
    console.log("  ip:", _chalk2.default.cyan(results.client.ip));
    console.log("  position:");
    console.log("    latitude:", _chalk2.default.cyan(results.client.lat));
    console.log("    longitude:", _chalk2.default.cyan(results.client.lon));
    console.log("  isp:", _chalk2.default.cyan(results.client.isp));
    console.log("    rating:", _chalk2.default.cyan(results.client.isprating + "/5"));
    console.log("    average download speed:", _chalk2.default.cyan(results.client.ispdlavg + " Mbps"));
    console.log("    average upload speed:", _chalk2.default.cyan(results.client.ispulavg + " Mbps"));
    console.log();
    console.log(_chalk2.default.underline("server:"));
    console.log("  host (ID):", _chalk2.default.cyan(results.server.host), "(" + _chalk2.default.cyan(results.server.id) + ")");
    console.log("  position:", _chalk2.default.cyan(results.server.location + ", " + results.server.country + " (" + results.server.cc + ")"));
    console.log("    distance:", _chalk2.default.cyan(results.server.distance + " km"));
    console.log("    latitude:", _chalk2.default.cyan(results.server.lat));
    console.log("    longitude:", _chalk2.default.cyan(results.server.lon));
    process.exit(0);
});
