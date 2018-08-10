[API](../README.md) > [VKLoginResult](../interfaces/vkloginresult.md)

# Interface: VKLoginResult

Response from login method

## Hierarchy

**VKLoginResult**

## Index

### Properties

* [access_token](vkloginresult.md#access_token)
* [email](vkloginresult.md#email)
* [expires_in](vkloginresult.md#expires_in)
* [https_required](vkloginresult.md#https_required)
* [secret](vkloginresult.md#secret)
* [user_id](vkloginresult.md#user_id)

---

## Properties

<a id="access_token"></a>

###  access_token

**● access_token**: * `string` &#124; `null`
*

String token for use in request parameters

___
<a id="email"></a>

###  email

**● email**: * `string` &#124; `null`
*

User email, or null, if permission was not given

___
<a id="expires_in"></a>

### `<Optional>` expires_in

**● expires_in**: * `undefined` &#124; `number`
*

Time when token expires

___
<a id="https_required"></a>

### `<Optional>` https_required

**● https_required**: * `undefined` &#124; `true` &#124; `false`
*

**Android only** If user sets "Always use HTTPS" setting in his profile, it will be true

___
<a id="secret"></a>

###  secret

**● secret**: * `string` &#124; `null`
*

User secret to sign requests (if nohttps used)

___
<a id="user_id"></a>

###  user_id

**● user_id**: * `string` &#124; `null`
*

Current user id for this token

___

