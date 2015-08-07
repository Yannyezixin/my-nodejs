var bin = new Buffer([0x65,  0x65, 0x6c, 0x6c, 0x6f]);
var dup = new Buffer(bin.lehth);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin);
console.log(dup);

