var repoUrl = require('..');
var test = require('tape');

test('public repo url', function (t) {
  t.plan(2);
  repoUrl('repo-url', function (err, url) {
    t.error(err);
    t.equal(url, 'git://github.com/juliangruber/repo-url.git');
  });
});
