var Client = require('silent-npm-registry-client');
var os = require('os');

module.exports = repoUrl;

var client = new Client({
  registry: 'http://registry.npmjs.org/',
  cache: os.tmpdir() + '/git-url'
});

function repoUrl (module, fn) {
  getRepository(module, function (err, repo) {
    if (err) return fn(err);
    fn(null, repo.url
        .replace(/^git\+/, ''));
  });
}

repoUrl.ssh = function (module, fn) {
  getRepository(module, function (err, repo) {
    if (err) return fn(err);
    fn(null, repo.url
      .replace(/^.*github.com\//, 'git@github.com:'));
  });
};

repoUrl.https = function (module, fn) {
  getRepository(module, function (err, repo) {
    if (err) return fn(err);
    fn(null, repo.url
      .replace(/^git\+/, '')
      .replace('git://', 'https://'));
  });
};

function getRepository (module, fn) {
  client.get('/' + module, function (err, pkg) {
    if (err) return fn(err);
    if (!pkg.repository) return fn(new Error('no repository field'));
    fn(null, pkg.repository);
  });
}
