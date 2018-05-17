# perj

A simple, fast JSON logger.

[![Maintainability][cc-maintain-badge]][cc-maintain-url]
[![Test Coverage][cc-coverage-badge]][cc-coverage-url]
[![Build Status][travisci-image]][travisci-url]
[![js-standard-style][js-standard-image]][js-standard-url]
[![NSP Status][nsp-image]][nsp-url]
[![Patreon Donation][patreon-image]][patreon-url]

[![perj][perj-image]][perj-url]

[![NPM][nodei-npm-image]][nodei-npm-url]

## Status

__Under heavy development. Do not use. API is changing.__

## Installing

* Node: Works with v6.0.0 and above. Not tested under v6.0.0.
* Browser: Not tested (🤔 working on it.)

```sh

npm install --save perj

```
## Goals

The `perj` project has the following goals:

* KISS: Keep it simple smiley. ✔️
* Designed to be integrated rather than used out of the box (DIY). ✔️
* Cross platform (Node.js and Browser) with no platform dependencies. ✔️
* Flexible log and additional property options. ✔️
* Fast. ✔️
* Feature limited. ✔️

## Features

* No dependencies.
* Flexible log methods:
  * Log items can be any number in any order of any type.
* The first string is nested under the 'msg' key:
  * First string includes a string argument or an Error message.
  * Additional string arguments are nested under the data key.
* Objects are nested under the 'data' key as an object or array of objects.
* No transports included (see primary goal).

## Quick Start

### Node.js Usage

The following example adds a log format version `ver`, `name`, `host`, `pid` and `file` top level property to the log output.

```js

const perj = require('perj')

// Customise the variables below as needed. They are not required.
const ver = 1
const name = 'QuickStart'
const host = require('os').hostname()
const pid = process.pid
const file = require('path').basename(module.filename)

const log = perj.create({ver, name, host, pid, file})

log.info('the quick brown fox jumps over the lazy dog')

/*

The following string is sent to standard out:

{"level":"info","lvl":30,"ver":1,"name":"QuickStart","host":"Dev","pid":233241,"file":"quick.js","time":1526102959677,"msg":"the quick brown fox jumps over the lazy dog","data":""}

*/

```

### Browser Usage

__Total size is 2.8kB minified index file.__

The following example adds a format version `ver`, `name`, and `host` top level property to the log entries.

```js

const perj = require('perj')

// Customise the variables below as needed. They are not required.
const ver = 1
const name = 'QuickStart'
const host = location.hostname

const log = perj.create({ver, name, host})

log.info('the quick brown fox jumps over the lazy dog')

/*

The following string is sent to the console:

{"level":"info","lvl":30,"ver":1,"name":"QuickStart","host":"http://Dev","time":1526103303019,"msg":"the quick brown fox jumps over the lazy dog","data":""}

*/

```

## Documentation

For full documentation see the [Wiki][perj-wiki].

## About the Owner

I, Grant Carthew, am a technologist, trainer, and Dad from Queensland, Australia. I work on code in a number of personal projects and when the need arises I build my own packages.

This project exists because I was not happy with other logging packages.

Everything I do in open source is done in my own time and as a contribution to the open source community.

If you are using my projects and would like to thank me or support me, please click the Patreon link below.

[![Patreon Donation][patreon-image]][patreon-url]

See my [other projects on NPM](https://www.npmjs.com/~grantcarthew).

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

[travisci-image]: https://travis-ci.org/grantcarthew/node-perj.svg?branch=master
[travisci-url]: https://travis-ci.org/grantcarthew/node-perj
[cc-maintain-badge]: https://api.codeclimate.com/v1/badges/14946690a2410b71177e/maintainability
[cc-maintain-url]: https://codeclimate.com/github/grantcarthew/node-perj/maintainability
[cc-coverage-badge]: https://api.codeclimate.com/v1/badges/14946690a2410b71177e/test_coverage
[cc-coverage-url]: https://codeclimate.com/github/grantcarthew/node-perj/test_coverage
[js-standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[js-standard-url]: http://standardjs.com/
[nsp-image]: https://nodesecurity.io/orgs/openjs/projects/4367c7cb-163d-4335-be3c-fe3429c69385/badge
[nsp-url]: https://nodesecurity.io/orgs/openjs/projects/4367c7cb-163d-4335-be3c-fe3429c69385
[patreon-image]: https://img.shields.io/badge/patreon-donate-yellow.svg
[patreon-url]: https://www.patreon.com/grantcarthew
[nodei-npm-image]: https://nodei.co/npm/perj.png?downloads=true&downloadRank=true&stars=true
[nodei-npm-url]: https://nodei.co/npm/perj/
[perj-image]: https://rawgit.com/grantcarthew/node-perj/master/perj.svg
[perj-url]: https://github.com/grantcarthew/node-perj
[perj-wiki]: https://github.com/grantcarthew/node-perj/wiki
[pino-url]: https://www.npmjs.com/package/pino
