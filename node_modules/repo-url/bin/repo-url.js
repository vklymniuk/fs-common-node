#!/usr/bin/env node

var repoUrl = require('..');

var module = process.argv.pop();
var flag = process.argv.pop();

var get =
  flag == '--ssh' ? repoUrl.ssh :
  flag == '--https' ? repoUrl.https :
  repoUrl;

get(module, function (err, url) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  process.stdout.write(url);
});
