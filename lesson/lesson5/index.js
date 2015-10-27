var express = require('express'),
    superagent = require('superagent'),
    cheerio = require('cheerio'),
    async = require('async'),
    url = require('url'),
    moment = require('moment'),
    h = require('../lib/helper');

var _url = "https://cnodejs.org/";

var concurrencyCount = 0;
var fetchPage = function (data, callback) {
    concurrencyCount++;
    console.log('当前并发数: ' + concurrencyCount);
    var startTime = moment().format('ss.SSS');
    superagent.get(data.href).end(function (err, sRes) {
        if (err) throw err;
        else {
            concurrencyCount--;
            var delay = moment().format('ss.SSS') - startTime;
            h.log('链接: ' + data.href + '爬取完成， 延时:' + delay);

            var $ = cheerio.load(sRes.text);
            data.comment1 = $('.reply_content').eq(0).html();
            callback(null, data);
        }
    });
}

superagent.get(_url).end(function (err, sRes) {
    if (err) throw err;

    var datas = [];
    var $ = cheerio.load(sRes.text);
    $('.cell').each(function (idx, element) {
        var $this = $(this);
        var user = $this.find('img').attr('title');
        var target = $this.find('.topic_title');
        datas.push({
            user: user,
            title: target.attr('title'),
            href: url.resolve(_url, target.attr('href')),
        });
    });

    async.mapLimit(datas, 5, function (data, callback) {
        fetchPage(data, callback);
    }, function (err, topics) {
        h.log(topics);
    });
});

