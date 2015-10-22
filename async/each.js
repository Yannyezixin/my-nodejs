var async = require('async'),
    helper = require('./lib/helper'),
    log = helper.log;


var arr = [{name: 'yann', delay: 1000},{name: 'yezixin', delay: 100},{name: 'zixin', delay: 200}];

// 没有异步, 顺序调用
// 与async.eachSeries 相似
arr.forEach(function (item, index) {
    log("1.1 Enter: " + item.name);
    setTimeout(function () {
        log("1.1 Handle: " + item.name + " delay:" + item.delay)
    }, item.delay);
});

// 所有操作并发执行
// 没有err
async.each(arr, function (item, callback) {
    log("1.2 Enter: " + item.name);
    setTimeout(function () {
        log("1.2 Handle: " + item.name + " delay:" + item.delay)
        callback();
    }, item.delay);
}, function (err) {
    log('1.2 err: ' + err);
});

// 中途出现错误，立刻调用callback, 其他继续执行
async.each(arr, function (item, callback) {
    log("1.3 Enter: " + item.name);
    setTimeout(function () {
        log("1.3 Handle: " + item.name + " delay:" + item.delay)
        if (item.name == 'yezixin') {
            callback('This is a err');
        }
    }, item.delay);
}, function (err) {
    log('1.3 err: ' + err);
});

// 顺序执行
async.eachSeries(arr, function (item, callback) {
    log("1.4 Enter: " + item.name);
    setTimeout(function () {
        log("1.4 Handle: " + item.name + " delay:" + item.delay)
        callback();
    }, item.delay);
}, function (err) {
    log('1.4 err: ' + err);
});

// 分批并发执行, 批与批之间顺序执行
async.eachLimit(arr, 2, function (item, callback) {
    log("1.5 Enter: " + item.name);
    setTimeout(function () {
        log("1.5 Handle: " + item.name + " delay:" + item.delay)
        callback();
    }, item.delay);
}, function (err) {
    log('1.5 err: ' + err);
});

// 分批并发执行, 批与批之间顺序执行, 同一批次的未执行的继续执行，下批次的不执行
async.eachLimit(arr, 2, function (item, callback) {
    log("1.6 Enter: " + item.name);
    setTimeout(function () {
        log("1.6 Handle: " + item.name + " delay:" + item.delay)
        if (item.name == 'yezixin') {
            callback('eachLimit Err');
        }
    }, item.delay);
}, function (err) {
    log('1.6 err: ' + err);
});
