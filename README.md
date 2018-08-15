# React Native Vkontakte login (vovkasm's fork)

This module is a wrapper around native VK SDKs for [Android](https://new.vk.com/dev/android_sdk) and [iOS](https://new.vk.com/dev/ios_sdk).

It allows to log in to VK and obtain access token, which you can later use to make VK API calls.

## Differences with origianl module

- [x] Precompile all files, so module can be installed from git repo (no postinstall script)
- [x] Remove all linking scripts (users supposed to make it by hands, sorry... I need control on my sources)
- [x] Cleanup codebase
- [x] Remote images can be shared

## Installation

### Prepare your application (iOS).

Follow [Vkontakte iOS SDK](https://vk.com/dev/ios_sdk) documentation.

1. Prepare for Using VK SDK
2. Setup URL-schema of Your Application
3. Add LSApplicationQueriesSchemes to Info.plist so SDK will allow to talk with Vkontakte application

```
	<key>LSApplicationQueriesSchemes</key>
	<array>
		<string>vk</string>
		<string>vk-share</string>
		<string>vkauthorize</string>
	</array>
```

4. Implement `application:openURL:options:` in `AppDelegate.m`

```
- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
    BOOL ret = [VKSdk processOpenURL:url fromApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]];
    return ret;
}
```

### Prepare your application (Android).

(TODO)

### Install module

1. Add this module to your js dependencies and istall it (`npm install -P @vovkasm/react-native-vkontakte-login`)
2. (iOS) Add it to `Podfile`:

```ruby
pod 'react-native-vkontakte-login', :path => '../node_modules/@vovkasm/react-native-vkontakte-login'
```

Run `pod install`
Sorry, I don't support other linking methods for now. I'm using RN on iOS only with CocoaPods, it simplifies build infrastructure and reduces number of bugs.

### SDK initialization

Also VKLogin have initialize method, I recommend do it authomatically (you have to modify Info.plist anyway). So place your app id to Info.plist:

```
	<key>VK_APP_ID</key>
	<integer>6658972</integer>
```

In this case you should not call initialize from JS.

## Usage

Import module in your JS code

```js
import VKLogin from 'react-native-vkontakte-login'
```

Initialize VK with your APP ID once somewhere during your app startup:

```js
componentDidMount() {
  VKLogin.initialize(5514471);
}
```

Check if user is logged in, perform login and logout:

```js
const isLoggedIn = await VKLogin.isLoggedIn()
const auth = await VKLogin.login(['friends', 'photos', 'email'])
console.log(auth.access_token)
await VKLogin.logout()
```

The module also provides share method:

```js
const shareResponse = await VKLogin.share({
  linkText: 'Cool site',
  linkUrl: 'https://news.ycombinator.com/',
  description: 'Check out this cool site!',
  image: TEST_IMAGE,
})
```

Check [API Reference](docs/API.md) for more information.

## Examples

Example project where this module is installed via Cocoapods: [here](https://github.com/doomsower/react-native-vkontakte-login/tree/master/example-cocoapods)
Example project where this module is installed by modifying XCode project: [here](https://github.com/doomsower/react-native-vkontakte-login/tree/master/example-xcodeproj)

## Contributing

Feel free to submit pull requests
