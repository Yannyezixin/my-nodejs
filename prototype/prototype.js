function Foo() {
    this.value = 42;
}

Foo.prototype = {
    method: function () {}
}

function Bar() {}

Bar.prototype = new Foo();
Bar.prototype.name = 'Yannyezixin';
Bar.prototype.constructor = Bar;

var test = new Bar();

console.log(test);
console.log(test.value);
console.log(Bar.prototype.constructor);
console.log(test.name);

console.log('for in:');
for (var i in test) {
    if (!test.hasOwnProperty(i)) {
        console.log(i);
    }
}
