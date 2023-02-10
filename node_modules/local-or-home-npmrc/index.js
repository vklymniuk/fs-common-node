const fs = require('fs');
const join = require('path').join;
const parent = require('pkg-dir');
const userHome = require('user-home');

function findrc() {
  const localrc = join(parent.sync(), '.npmrc');

  if (!fs.existsSync(localrc)) {
    return join(userHome, '.npmrc');
  } else if (fs.existsSync(localrc)) {
    return localrc;
  }
}

module.exports = findrc;
