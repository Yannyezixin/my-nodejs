var express = require('express');
var utility = require('utility');

var app = express();

app.get('/', function (req, res) {
    var  q = req.query.q;

    if (q == undefined) {
        res.send("you should pass a param name q");
    } else {
        var md5Value = utility.md5(q);
        res.send(md5Value);
    }
});

app.listen(3000, function () {
    console.log('listen on on port 3000');
});
