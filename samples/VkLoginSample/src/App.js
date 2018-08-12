import React from 'react';
import { Button, View, TextInput, Text, StyleSheet } from 'react-native';
import VKLogin from '@vovkasm/react-native-vkontakte-login';
import Logs from './Logs';

const TEST_IMAGE = require('./assets/ycombinator.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#507299',
  },
  permissionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  permissionsInput: {
    flex: 1,
    height: 36,
    fontSize: 12,
  },
  permissionsLabel: {
    fontSize: 12,
    color: '#507299',
  },
});

export default class App extends React.Component {
  state = {
    auth: null,
    logs: [],
    permissions: 'friends email',
  };

  componentDidMount() {
    VKLogin.initialize(6658972);
  }

  onLogin = async () => {
    const permissions = this.state.permissions.trim().split(/[ ,]+/);
    this.pushLog('Login', `Logging in with permissions: ${permissions}`);
    try {
      const auth = await VKLogin.login(permissions);
      this.pushLog('Login', `Login response:\n${JSON.stringify(auth, null, 2)}`);
      this.setState({ auth });
    } catch (error) {
      this.pushLog('Login', error.message, true);
    }
  };

  onLogout = async () => {
    this.pushLog('Logout', 'Logging out...');
    try {
      await VKLogin.logout();
      this.pushLog('Login', 'Logged out successfully');
      this.setState({ auth: null });
    } catch (error) {
      this.pushLog('Logout', error.message, true);
    }
  };

  onCheck = async () => {
    try {
      const isLoggedIn = await VKLogin.isLoggedIn();
      this.pushLog('isLoggedIn', `isLoggedIn: ${isLoggedIn}`);
    } catch (error) {
      this.pushLog('isLoggedIn', error.message, true);
    }
  };

  onRequest = async () => {
    this.pushLog('request', 'Making test request... asking for friends online');
    const { auth } = this.state;
    if (!auth) {
      this.pushLog('request', 'Must be logged in to make requests', true);
      return;
    }

    const { user_id, access_token } = auth;
    // eslint-disable-next-line camelcase
    const reqUrl = `https://api.vk.com/method/friends.getOnline?user_id=${user_id}&access_token=${access_token}`;
    try {
      const response = await fetch(reqUrl, { method: 'POST' });
      const data = await response.json();
      if (data.error) {
        this.pushLog('request', JSON.stringify(data.error, null, 2), true);
      } else {
        this.pushLog('request', `Friends online:\n${data.response}`);
      }
    } catch (error) {
      this.pushLog('request', error.message, true);
    }
  };

  onShare = async () => {
    this.pushLog('share', 'Trying to share image...');
    try {
      const shareResponse = await VKLogin.share({
        linkText: 'Cool site',
        linkUrl: 'https://news.ycombinator.com/',
        description: 'Check out this cool site!',
        image: TEST_IMAGE,
      });
      this.pushLog('share', `Share result: ${JSON.stringify(shareResponse, null, 2)}`);
    } catch (error) {
      this.pushLog('share', error.message, true);
    }
  };

  pushLog = (who, message, error = false) => {
    const logItem = { who, when: Date.now(), error, message };
    this.setState({ ...this.state, logs: [logItem, ...this.state.logs] });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Logs logs={this.state.logs} />
        </View>
        <View style={styles.buttonsContainer}>
          <Button onPress={this.onLogin} title="Login" />
          <Button onPress={this.onLogout} title="Logout" />
          <Button onPress={this.onCheck} title="Is Logged" />
          <Button onPress={this.onRequest} title="Request" />
          <Button onPress={this.onShare} title="Share" />
        </View>
        <View style={styles.permissionsContainer}>
          <Text style={styles.permissionsLabel}>Permissions:</Text>
          <TextInput
            value={this.state.permissions}
            style={styles.permissionsInput}
            onChangeText={permissions => this.setState({ permissions })}
          />
          <Button onPress={() => this.setState({ permissions: '' })} title="empty" />
          <Button onPress={() => this.setState({ permissions: 'friends email' })} title="friends email" />
          <Button onPress={() => this.setState({ permissions: 'friends email photos wall' })} title="+ photos wall" />
        </View>
      </View>
    );
  }
}
