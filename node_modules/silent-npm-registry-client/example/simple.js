var RegClient = require('..');
var os = require('os');

var client = new RegClient();

client.get('http://registry.npmjs.org/browserify', {}, function (err, pkg) {
  if (err) throw err;
  console.log('got pkg with keys [%s]', Object.keys(pkg).join(', '));
});
