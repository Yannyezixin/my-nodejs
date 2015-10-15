var Foo = {
    value: 42,
    getName: function () {
        return 'Yannyezixin';
    }
};

function Bar () {
    this.value = 42;
    this.getName = function () {
        return 'Yann';
    };
}
Bar._cache = {};

var bar = new Bar();

console.log(Foo);
console.log(Foo.value);
console.log(Foo.getName());
console.log(bar);
console.log(bar.value);
console.log(bar.getName());
console.log(Bar._cache['name']);
