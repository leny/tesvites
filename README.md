# Tès Vitès

[![NPM version](http://img.shields.io/npm/v/tesvites.svg)](https://www.npmjs.org/package/tesvites) ![Dependency Status](https://david-dm.org/leny/tesvites.svg) ![Downloads counter](http://img.shields.io/npm/dm/tesvites.svg)

> CLI wrapper around speedtest.net package

* * *

**Tès Vitès** is a simple command-line wrapper around the [speedtest.net](https://github.com/ddsol/speedtest.net) package, allowing you to use it from your terminal.

## Usage

### Installation

To use **tesvites** install it globally.

    (sudo) npm install -g tesvites

### Usage

Using **tesvites** is simple :

    tesvites [options]

    Options:

        -h, --help                     output usage information
        -V, --version                  output the version number
        -m, --max-time <max-time>      The maximum length of a single test run (upload or download)
        -p, --ping-count <ping-count>  The number of close servers to ping to find thew fastest one
        -s, --servers <servers>        The number of servers to run a download test on. The fastest is used for the upload test and the fastest result is reported at the end.
        -i, --id <server-id>           ID of the server to restrict the tests against.
        -l, --log-output               Show the complete output of the test.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint your code using [Grunt](http://gruntjs.com/).

## Release History

* **0.2.0**: Add duration & starting date (*28/08/15*)
* **0.1.0**: Initial release (*30/07/15*)

## License
Copyright (c) 2015 Leny  
Licensed under the MIT license.
