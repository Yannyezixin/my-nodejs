var request = require('superagent');
var express = require('express');
var cheerio = require('cheerio');

var app = express();
var _url = 'https://cnodejs.org/';

app.get('/', function (req, res) {
    var body;
    var data = [];
    var resA = res;

    request.get(_url).end(function(err, res) {
        if (err) throw err;

        $ = cheerio.load(res.text);
        $('.topic_title').each(function (idx, element) {
            var $this = $(this);
            data.push({
                title: $this.attr('title'),
                href: $this.attr('href')
            });
        });

        resA.send(data);
    });

});


app.listen(3000, function () {
    console.log('listen on port 3000');
});
