# Node.js log Dissector

[![NPM](https://nodei.co/npm/node-log-dissector.png?downloads=true)](https://nodei.co/npm/node-log-dissector/)

A toolkit for dissecting/parsing information from logfiles using Node.js.
If you add your own please shout them back if you think they'll be useful.

Originally crafted by [adamvr](https://github.com/adamvr/node-log-dissector.git)

## Build Status
[![Build Status](https://travis-ci.org/jujhars13/node-log-dissector.png?branch=master)](https://travis-ci.org/jujhars13/node-log-dissector)

## Example Usage

```javascript
//you don't have to specify the particular dissector here - but we do
const dissector = require('node-log-dissector').dissectors['s3'];

const stream = fs.createReadStream('./my_s3.log', {flags: 'r', encoding: 'utf-8', autoClose: true}).on('readable', function() {
    self.read(0);
});

stream.on('data', function(data) {
    console.log(dissector.dissect(data));
});
```

## Log Dissectors included

- ssh invalid users
- ssh login
- ssh logout
- sudo failure
- sudo sucess
- AWS S3 access logs
- AWS CloudFront access logs (v1.0)
- AWS Elastic Load Balancer (ELB)
- Level3 CDN access logs

## Changelog

### 2020-06-17 v2.0.0
- made it a bit more ES6
- removed support for Node < 12
- Changed licence to MIT- knock yourself out
- Was going to rip out lodash from tests but couldn't be bothered, just updated lib instead

### 2016-09-19
- Add disector to parse AWS Elastic Loade Balancer (ELB) logs

### 2013-10-18
- Added license.md - BSD
- Published independently of original project <adamvr> git://github.com/adamvr/node-log-dissector.git

### 2013-10-09
- Added level3 cdn access logs processor
- Added test for level3 parser using Mocha
- Added travis build support
- Improved s3 parsing
- Added test for s3 parser
- removed excess util ref

### 2015-02-07
- Added a cloudfront v1.0 log parser
- It's 2015 - Now using the docker to develop and test - it's the future (official Node v0.10.36 container):
```
    sudo docker run \
     -it --rm --name npm_test \ 
     -v $PWD:/app -w /app \ 
     node:0.10.36 \
     /bin/bash
```
