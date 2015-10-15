var path = require('path');

console.log(path.join('foo', 'bar')); // foo/bar
console.log(path.join('/foo', '/bar')); // /foo/bar
console.log(path.join('.', '/foo', '/bar')); // foo/bar
console.log(path.join('..', '/foo', '/bar')); // ../foo/bar
console.log(path.join('../', '/foo', '/bar')); // ../foo/bar
console.log(path.join('/', '/foo', '/bar')); // /foo/bar
console.log(path.join('/', '/foo', '/bar', '../bar')); // /foo/bar
