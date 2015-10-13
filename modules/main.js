var hw = require('./lib/hw'),
    join = require('./lib/join');

var hello_world = hw.hello();
var str = hw.trim(' my name i ');


console.log(hello_world);
console.log(str);
console.log(join());
