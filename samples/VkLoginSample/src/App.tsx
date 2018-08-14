import VKLogin from '@vovkasm/react-native-vkontakte-login'
import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import Logs from './Logs'
import { ILogItem } from './types'

import TEST_IMAGE from './assets/ycombinator.png'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logsContainer: {
    borderBottomColor: '#507299',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    marginBottom: 4,
  },
  permissionsInput: {
    flex: 1,
    fontSize: 12,
  },
  permissionsLabel: {
    color: '#507299',
    fontSize: 12,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
})

interface IState {
  auth: any
  logs: ILogItem[]
  permissions: string
}
export default class App extends React.Component<{}, IState> {
  state: IState = {
    auth: null,
    logs: [],
    permissions: 'friends email',
  }

  componentDidMount() {
    VKLogin.initialize(6658972)
  }

  onLogin = async () => {
    const permissions = this.state.permissions.trim().split(/[ ,]+/)
    this.pushLog('Login', `Logging in with permissions: ${permissions}`)
    try {
      const auth = await VKLogin.login(permissions)
      this.pushLog('Login', `Login response:\n${JSON.stringify(auth, null, 2)}`)
      this.setState({ auth })
    } catch (error) {
      this.pushLog('Login', error.message, true)
    }
  }

  onLogout = async () => {
    this.pushLog('Logout', 'Logging out...')
    try {
      await VKLogin.logout()
      this.pushLog('Login', 'Logged out successfully')
      this.setState({ auth: null })
    } catch (error) {
      this.pushLog('Logout', error.message, true)
    }
  }

  onCheck = async () => {
    try {
      const isLoggedIn = await VKLogin.isLoggedIn()
      this.pushLog('isLoggedIn', `isLoggedIn: ${isLoggedIn}`)
    } catch (error) {
      this.pushLog('isLoggedIn', error.message, true)
    }
  }

  onRequest = async () => {
    this.pushLog('request', 'Making test request... asking for friends online')
    const { auth } = this.state
    if (!auth) {
      this.pushLog('request', 'Must be logged in to make requests', true)
      return
    }

    const { user_id, access_token } = auth
    // eslint-disable-next-line camelcase
    const reqUrl = `https://api.vk.com/method/friends.getOnline?user_id=${user_id}&access_token=${access_token}`
    try {
      const response = await fetch(reqUrl, { method: 'POST' })
      const data = await response.json()
      if (data.error) {
        this.pushLog('request', JSON.stringify(data.error, null, 2), true)
      } else {
        this.pushLog('request', `Friends online:\n${data.response}`)
      }
    } catch (error) {
      this.pushLog('request', error.message, true)
    }
  }

  onShare = async () => {
    this.pushLog('share', 'Trying to share image...')
    try {
      const shareResponse = await VKLogin.share({
        description: 'Check out this cool site!',
        image: TEST_IMAGE,
        linkText: 'Cool site',
        linkUrl: 'https://news.ycombinator.com/',
      })
      this.pushLog('share', `Share result: ${JSON.stringify(shareResponse, null, 2)}`)
    } catch (error) {
      this.pushLog('share', error.message, true)
    }
  }

  pushLog = (who: string, message: string, error?: boolean) => {
    const logItem: ILogItem = { who, when: Date.now(), error, message }
    this.setState({ ...this.state, logs: [logItem, ...this.state.logs] })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logsContainer}>
          <Logs logs={this.state.logs} />
        </View>
        <View style={styles.row}>
          <Button onPress={this.onLogin} title="Login" />
          <Button onPress={this.onLogout} title="Logout" />
          <Button onPress={this.onCheck} title="Is Logged" />
          <Button onPress={this.onRequest} title="Request" />
          <Button onPress={this.onShare} title="Share" />
        </View>
        <View style={styles.row}>
          <Text style={styles.permissionsLabel}>Permissions:</Text>
          <TextInput
            value={this.state.permissions}
            style={styles.permissionsInput}
            onChangeText={this.onCustomPermissionsChange}
          />
        </View>
        <View style={styles.row}>
          <Button onPress={this.setPermissionsEmpty} title="empty" />
          <Button onPress={this.setPermissionsDefault} title="friends email" />
          <Button onPress={this.setPermissions3} title="+ photos wall" />
        </View>
      </View>
    )
  }

  private onCustomPermissionsChange = (permissions: string) => {
    this.setState({ permissions })
  }
  private setPermissionsEmpty = () => {
    this.setState({ permissions: '' })
  }
  private setPermissionsDefault = () => {
    this.setState({ permissions: 'friends email' })
  }
  private setPermissions3 = () => {
    this.setState({ permissions: 'friends email photos wall' })
  }
}
