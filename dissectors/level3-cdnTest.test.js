const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const dissector = require('../index').dissectors['level3-cdn'];

const valid_log_lines = {
    1: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 1 9 200 "curl/7.32.0" "-" "-" 347',
    100: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 100 9 200 "curl/7.32.0" "-" "-" 347',
    1000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 1000 9 200 "curl/7.32.0" "-" "-" 347',
    10000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 10000 9 200 "curl/7.32.0" "-" "-" 347',
    100000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 0 100000 2479 200 "curl/7.32.0" "-" "-" 371',
    87054: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440005 0 87054 140 200 "curl/7.32.0" "-" "-" 371'
};

describe('Level3-cdn', function () {
    describe('.dissect', function () {
        it('should return a suitable array for valid log lines', function () {
            Object.entries(valid_log_lines).forEach(function ([key, line]) {
                const data_should_be = {
                    date: '2013-10-08',
                    time: '10:13:24.250',
                    verb: 'GET',
                    uri: '/butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg',
                    protocol: 'HTTP/1.1',
                    client_ip: '135.221.31.26',
                    bytes_sent: key,
                    status_code: '200',
                    'user-agent': 'curl/7.32.0',
                    type: 'level3-cdn'
                };
                const data = dissector.dissect(line);

                Object.entries(data_should_be).forEach(function ([data_key, value]) {
                    assert.equal(data[data_key], value);
                });
            });
        });
    });
});
