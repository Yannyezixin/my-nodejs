#!/usr/bin/env node

var argv = require('argv'),
    echo = require('../lib/echo');

var args = argv.run();

console.log(echo(argv.run().targets.join(' ')));
