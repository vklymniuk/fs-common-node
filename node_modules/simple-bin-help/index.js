'use strict'

var updateNotifier = require('update-notifier')
var wrap = require('word-wrap')
var debug = require('debug')('simple-bin-help')

function isHelp (arg) {
  return arg === '-h' || arg === '--help'
}

function hasHelpArgument (args) {
  return args.some(isHelp)
}

function isVersion (arg) {
  return arg === '-v' || arg === '--version'
}

function hasVersionArgument (args) {
  return args.some(isVersion)
}

function noArguments (minLength, args) {
  console.assert(Array.isArray(args), 'missing arguments')
  return args.length < minLength
}

function getPackage (options) {
  var pkg = options.pkg || options.package

  if (!pkg && options.packagePath) {
    pkg = require(options.packagePath)
  }

  return pkg
}

function showHelp (options) {
  var helpMessage = options.help || options.helpMessage
  debug('showHelp options %j', options)

  var pkg = getPackage(options)

  var pkgInfo
  if (pkg) {
    pkgInfo = pkg.name ? pkg.name : ''
    if (pkg.version) {
      pkgInfo += '@' + pkg.version
    }
    if (pkg.description) {
      pkgInfo += '\n' + wrap(pkg.description, { width: 60, indent: ' > ' })
    }
  }

  if (pkgInfo) {
    console.log(pkgInfo)
  }
  if (helpMessage) {
    console.log(helpMessage)
  }
  if (!pkgInfo && !helpMessage) {
    console.log('Incorrect CLI arguments (could not find pkg or help)')
    if (pkg && pkg.name) {
      console.log('Check out instructions for this module using `npm home ' +
        pkg.name + '`')
    }
  }
}

function finish (options) {
  if (options.noExit) {
    return false
  }
  process.exit(0)
}

function showVersion (pkg) {
  console.log(pkg.name, pkg.version)
}

function simpleBinHelp (options, cliArguments) {
  console.assert(options, 'missing options')

  if (!cliArguments) {
    cliArguments = process.argv
  }
  debug('options %j cli arguments %j', options, cliArguments)

  if (hasHelpArgument(cliArguments)) {
    debug('has CLI help argument')
    showHelp(options)
    finish(options)
    return true
  }

  var pkg = getPackage(options)
  if (pkg) {
    debug('found package %s %s', pkg.name, pkg.version)
  } else {
    debug('could not get package from options %j', options)
  }

  if (pkg && hasVersionArgument(cliArguments)) {
    showVersion(pkg)
    finish(options)
    return true
  }

  if (pkg && pkg.name && pkg.version) {
    updateNotifier({ pkg: pkg }).notify()
  }

  var minArguments = options.minArguments ||
    options.min ||
    options.n

  if (noArguments(minArguments, cliArguments)) {
    showHelp(options)

    if (typeof options.onFail === 'function') {
      options.onFail()
    }

    return finish(options)
  }

  return true
}

module.exports = simpleBinHelp

if (!module.parent) {
  simpleBinHelp({
    packagePath: './package.json',
    help: 'test help message'
  })
}
