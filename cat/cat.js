var fs = require('fs');

function write(dst, content) {
    fs.stat(dst, function (err, stat) {
        if (err == null) {
            fs.appendFile(dst, content, function (err) {
                console.log('append');
                if (err) throw(err);
            });
        } else if (err.code == 'ENOENT') {
            fs.writeFile(dst, content, function (err) {
                console.log('write');
                if (err) throw(err);
            });
        }
    });
}

function getContent(argvs) {
    return argvs.join(' ');
}

write(process.argv.slice(2)[0], getContent(process.argv.slice(3)));
