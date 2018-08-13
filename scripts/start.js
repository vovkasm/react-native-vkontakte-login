'use strict'
const path = require('path')

const rootDir = path.resolve(__dirname, '..')

// Select sample to run
const sampleDir = path.resolve(rootDir, 'samples/VkLoginSample')
const configFile = path.resolve(sampleDir, 'rn-cli.config.js')
const tsconfigFile = path.resolve(sampleDir, 'tsconfig.json')

// Essential configs for sample
const origPre = process.argv.slice(0, 2)
const origRest = process.argv.slice(2)
const cmds = ['start', '--config', configFile]
process.argv = origPre.concat(cmds, origRest)

// Specify tsconfig used by react-native-typescript-transformer
process.env.TSCONFIG_PATH = tsconfigFile

const cli = require('react-native/local-cli/cli')
cli.run()
