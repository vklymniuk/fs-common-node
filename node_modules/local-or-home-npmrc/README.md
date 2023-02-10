# local-or-home-npmrc [![Build Status](https://travis-ci.org/svnlto/local-or-home-npmrc.svg?branch=master)](https://travis-ci.org/svnlto/local-or-home-npmrc)

[![Greenkeeper badge](https://badges.greenkeeper.io/svnlto/local-or-home-npmrc.svg)](https://greenkeeper.io/)

> Get the local npmrc with fallback to the global one that's in your home directory

Useful in cases where you prefer a local .npmrc file over a global one.


## Install

```
$ npm install --save local-or-home-npmrc
```


## Usage

```js
const npmrcLocation = require('local-or-home-npmrc');

console.log(npmrcLocation());
//=> '/Users/svenlito/code/project/.npmrc'

// And if there is no local .npmrc file:

const npmrcLocation = require('local-or-home-npmrc');

console.log(npmrcLocation());
//=> '/Users/svenlito/.npmrc'

```


## License

MIT © [Sven Lito](https://svenlito.com)
