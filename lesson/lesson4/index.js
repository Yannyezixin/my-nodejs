var express = require('express'),
    eventproxy = require('eventproxy'),
    superagent = require('superagent'),
    cheerio = require('cheerio');
    url = require('url');

var app = express();
var _url = 'https://cnodejs.org';


app.get('/', function (req, res) {

    superagent.get(_url).end(function (err, sRes) {
        if (err) throw err;

        var data = [];
        var $ = cheerio.load(sRes.text);
        $('.cell').each(function (idx, element) {
            var $this = $(this);
            var user = $this.find('img').attr('title');
            var target = $this.find('.topic_title');
            data.push({
                user: user,
                title: target.attr('title'),
                href: url.resolve(_url, target.attr('href')),
            });
        });

        var eq = new eventproxy();
        eq.after('topic_html', data.length, function (topics) {
            topics = topics.map(function (topicPair) {
                var item = topicPair[0];
                var commentHtml = topicPair[1];
                var $ = cheerio.load(commentHtml);
                return {
                    user: item.user,
                    title: item.title,
                    href: item.href,
                    comment1: $('.reply_content').eq(0).html(),
                }
            });

            res.send(topics);
        });

        data.forEach(function (item) {
            var item = item;
            superagent.get(item.href).end(function (err, sRes) {
                console.log('fetch ' + item.href + ' successful!');
                eq.emit('topic_html', [item, sRes.text]);
            });
        });
    });

});


app.listen(3000, function () {
    console.log('listen on port 3000');
});
