const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const dissector = require('../index').dissectors['elasticloadbalancer'];

const valid_log_lines = {
    1: '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 1 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2',
    100: '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 100 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2',
    1000: '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 1000 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2',
    10000: '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 10000 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2',
    100000: '2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 100000 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2'
};

describe('elasticloadbalancer', function () {
    describe('.dissect', function () {
        it('should return a suitable array for valid log lines', function () {
            Object.entries(valid_log_lines).forEach(function ([key, line]) {
                const data_should_be = {
                    timestamp: '2015-05-13T23:39:43.945958Z',
                    elb: 'my-loadbalancer',
                    client_ip: '192.168.131.39',
                    client_port: '2817',
                    backend_ip: '10.0.0.1',
                    backend_port: '80',
                    request_processing_time: '0.000086',
                    backend_processing_time: '0.001048',
                    response_processing_time: '0.001337',
                    elb_status_code: '200',
                    backend_status_code: '200',
                    received_bytes: '0',
                    sent_bytes: key,
                    method: 'GET',
                    request_host: 'https://www.example.com',
                    request_port: '443',
                    request_path: '/',
                    protocol: 'HTTP/1.1',
                    user_agent: 'curl/7.38.0',
                    ssl_cipher: 'DHE-RSA-AES128-SHA',
                    ssl_protocol: 'TLSv1.2',
                    type: 'elasticloadbalancer'
                };

                const data = dissector.dissect(line);

                Object.entries(data_should_be).forEach(function ([data_key, value]) {
                    assert.equal(value, data[data_key]);
                });
            });
        });

        it('should dissect all values from logs without failure', function () {
            const testData = '2015-11-07T18:45:37.679156Z elb1 88.247.42.54:58289 10.0.2.143:80 0.000023 0.000267 0.000023 200 200 0 381 "GET http://example.com:80/images/icon/article-comment-example.png HTTP/1.1" "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36" - -';

            const data_should_be = {
                timestamp: '2015-11-07T18:45:37.679156Z',
                elb: 'elb1',
                client_ip: '88.247.42.54',
                client_port: '58289',
                backend_ip: '10.0.2.143',
                backend_port: '80',
                request_processing_time: '0.000023',
                backend_processing_time: '0.000267',
                response_processing_time: '0.000023',
                elb_status_code: '200',
                backend_status_code: '200',
                received_bytes: '0',
                sent_bytes: '381',
                method: 'GET',
                request_host: 'http://example.com',
                request_port: '80',
                request_path: '/images/icon/article-comment-example.png',
                protocol: 'HTTP/1.1',
                user_agent: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
                ssl_cipher: '-',
                ssl_protocol: '-',
                type: 'elasticloadbalancer'
            };

            const data = dissector.dissect(testData);

            Object.entries(data_should_be).forEach(function ([data_key, value]) {
                assert.equal(value, data[data_key]);
            });
        });
    });
});
