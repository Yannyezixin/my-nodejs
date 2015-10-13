var fs = require('js');
var src = process.argv.slice(2)[0];
var dst = process.argv.slice(2)[1];
console.log(src);
console.log(dst);
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);


rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});
