'use strict'
const path = require('path')

module.exports = {
  watchFolders: [__dirname],

  resolver: {
    extraNodeModules: {
      'react-native-vkontakte-login': __dirname,
    },
  },
}
