var path = require('path');

var cache = {};

function store(key, value) {
    cache[path.normalize(key)] = value;
}

store('foo/bar', 1); //  foo/bar
store('foo///bar//foo', 2); //  foo/bar/foo
store('../bar/foo', 3); // ../bar/foo
store('./../dir/file', 4); // ../dir/file
store('/.././dir/file', 5); // /dir/file

console.log(cache);

// PS: Normalize in window, it will be change as '\' .such as foo\bar
// you can use .replace(/\\/g, '/')

