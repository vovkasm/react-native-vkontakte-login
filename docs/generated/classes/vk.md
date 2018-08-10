[API](../README.md) > [VK](../classes/vk.md)

# Class: VK

React-native wrapper around vk-ios-sdk and vk-android-sdk Provides login and share functionality

## Hierarchy

**VK**

## Index

### Methods

* [getCertificateFingerprint](vk.md#getcertificatefingerprint)
* [initialize](vk.md#initialize)
* [isLoggedIn](vk.md#isloggedin)
* [login](vk.md#login)
* [logout](vk.md#logout)
* [share](vk.md#share)

---

## Methods

<a id="getcertificatefingerprint"></a>

### `<Static>` getCertificateFingerprint

▸ **getCertificateFingerprint**(): `Promise`<`string`[]>

**Android only** \- helper method to get fingerprints on JS side

**Returns:** `Promise`<`string`[]>
Promise that resolves with array of string fingerprints

___
<a id="initialize"></a>

### `<Static>` initialize

▸ **initialize**(vkAppId: * `number` &#124; `string`*): `void`

Initializes VK SDK from JS code. You only need to call this once before you call login or logout. You can skip this call if you've added your VK App ID to your Android's resources or iOS's info.plist.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| vkAppId |  `number` &#124; `string`|  Your VK app id |

**Returns:** `void`

___
<a id="isloggedin"></a>

### `<Static>` isLoggedIn

▸ **isLoggedIn**(): `Promise`<`boolean`>

Checks if user is already logged in

**Returns:** `Promise`<`boolean`>
Promise that resolves with boolean value

___
<a id="login"></a>

### `<Static>` login

▸ **login**(scopesArray: *`string`[]*): `Promise`<[VKLoginResult](../interfaces/vkloginresult.md)>

Opens VK login dialog either via VK mobile app or via WebView (if app is not installed on the device). If the user is already logged in and has all the requested permissions, then the promise is resolved straight away, without VK dialog.

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| scopesArray | `string`[] |  array which contains VK access permissions as strings, e.g. `\['friends', 'photos', 'email'\]` List of available permissions can be found <a href="[https://new.vk.com/dev/permissions">here</a](https://new.vk.com/dev/permissions">here</a)> |

**Returns:** `Promise`<[VKLoginResult](../interfaces/vkloginresult.md)>
Promise will be resolved with VKLoginResult object

___
<a id="logout"></a>

### `<Static>` logout

▸ **logout**(): `Promise`<`void`>

Performs the logout

**Returns:** `Promise`<`void`>
empty promise

___
<a id="share"></a>

### `<Static>` share

▸ **share**(options: *[VKShareOptions](../interfaces/vkshareoptions.md)*): `Promise`<`number`>

Opens VK share dialog either via VK mobile app or via WebView (if app is not installed on the device). Make sure to have correct permissions!

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| options | [VKShareOptions](../interfaces/vkshareoptions.md) |  VKShareOptions object |

**Returns:** `Promise`<`number`>
Promise that resolves with postId number

___

