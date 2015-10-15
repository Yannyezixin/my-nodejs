Object.prototype.bar = 1;
var foo = {goo: undefined};


console.log(foo.bar); // 1
console.log('bar' in foo); // true
console.log(foo.hasOwnProperty('bar')); // false
console.log(foo.hasOwnProperty('goo')); // true
