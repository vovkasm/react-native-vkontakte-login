'use strict'
const path = require('path')

const sampleDir = path.resolve(__dirname)
const projectDir = path.resolve(path.join(sampleDir, '../..'))

module.exports = {
  extraNodeModules: {
    '@vovkasm/react-native-vkontakte-login': projectDir,
  },
  getProjectRoots: function() {
    return [sampleDir, projectDir]
  },
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx']
  },
}
