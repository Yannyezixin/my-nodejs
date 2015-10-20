var express = require('express'),
    eventproxy = require('eventproxy'),
    request = require('superagent'),
    cheerio = require('cheerio');
    url = require('url');

var app = express();
var _url = 'https://cnodejs.org';


app.get('/', function (req, res) {

    var data = [];

    request.get(_url).end(function (err, sRes) {
        if (err) throw err;
        $ = cheerio.load(sRes.text);
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
        res.send(data);
    });

    /*
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var url = _url + item.href;
        request.get(url).end(function (err, sRes) {
            if (err) throw err;
            $ = cheerio.load(sRes.text);
            var reply = $("#reply1");
            var user = reply.find('img').attr('title');
            var content = reply.find('.markdown-text').html();
            item.reply = {
                user: user,
                content: content
            };
            data[i] = item;
        });
    }
    */


});


app.listen(3000, function () {
    console.log('listen on port 3000');
});
