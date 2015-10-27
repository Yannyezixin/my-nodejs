var moment = require('moment');

exports.log = function (msg, obj) {
    process.stdout.write(moment().format('ss.SSSS') + '> ');
    console.log(msg);
}
