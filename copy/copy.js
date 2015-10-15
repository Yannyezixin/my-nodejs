var fs = require('fs');

function copy(src, dst) {
    fs.writeFile(dst, fs.readFile(src), function (err) {
        if (err == null) {
            console.log('writefile success');
        } else {
            throw err;
        }
    });
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
