'use strict'
const path = require('path')

const projectDir = path.resolve(__dirname, '.')
const sampleDir = path.join(projectDir, 'samples/VkLoginSample')

module.exports = {
  extraNodeModules: {
    '@vovkasm/react-native-vkontakte-login': projectDir,
  },
  getProjectRoots: function () {
    return [sampleDir, projectDir]
  }
}
