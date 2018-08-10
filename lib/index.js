"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-submodule-imports
var react_native_1 = require("react-native");
var resolveAssetSource_1 = __importDefault(require("react-native/Libraries/Image/resolveAssetSource"));
/**
 * @hidden
 */
var VKLogin = react_native_1.NativeModules.VkontakteManager;
/**
 * @hidden
 */
var VKShare = react_native_1.NativeModules.VkontakteSharing;
var VKError;
(function (VKError) {
    VKError["E_NOT_INITIALIZED"] = "E_NOT_INITIALIZED";
    VKError["E_VK_UNKNOWN"] = "E_VK_UNKNOWN";
    VKError["E_VK_API_ERROR"] = "E_VK_API_ERROR";
    VKError["E_VK_CANCELED"] = "E_VK_CANCELED";
    VKError["E_VK_REQUEST_NOT_PREPARED"] = "E_VK_REQUEST_NOT_PREPARED";
    VKError["E_VK_RESPONSE_STRING_PARSING_ERROR"] = "E_VK_RESPONSE_STRING_PARSING_ERROR";
    VKError["E_VK_AUTHORIZE_CONTROLLER_CANCEL"] = "E_VK_AUTHORIZE_CONTROLLER_CANCEL";
    VKError["E_VK_JSON_FAILED"] = "E_VK_JSON_FAILED";
    VKError["E_VK_REQUEST_HTTP_FAILED"] = "E_VK_REQUEST_HTTP_FAILED";
    VKError["E_ACTIVITY_DOES_NOT_EXIST"] = "E_ACTIVITY_DOES_NOT_EXIST";
    VKError["E_FINGERPRINTS_ERROR"] = "E_FINGERPRINTS_ERROR";
})(VKError = exports.VKError || (exports.VKError = {}));
/**
 * React-native wrapper around vk-ios-sdk and vk-android-sdk
 * Provides login and share functionality
 */
var VK = /** @class */ (function () {
    function VK() {
    }
    /**
     * Initializes VK SDK from JS code.
     * You only need to call this once before you call login or logout.
     * You can skip this call if you've added your VK App ID to your Android's resources or iOS's info.plist.
     * @param {number|string} vkAppId Your VK app id
     */
    VK.initialize = function (vkAppId) {
        VKLogin.initialize(typeof vkAppId === 'number' ? vkAppId : Number(vkAppId));
    };
    /**
     * Opens VK login dialog either via VK mobile app or via WebView (if app is not installed on the device).
     * If the user is already logged in and has all the requested permissions, then the promise is resolved
     * straight away, without VK dialog.
     * @param {string[]} scopesArray array which contains VK access permissions as strings,
     * e.g. `['friends', 'photos', 'email']`
     * List of available permissions can be found <a href="https://new.vk.com/dev/permissions">here</a>
     * @returns {Promise<VKLoginResult>} Promise will be resolved with VKLoginResult object
     */
    VK.login = function (scopesArray) {
        return VKLogin.login(scopesArray);
    };
    /**
     * Performs the logout
     * @returns {Promise} empty promise
     */
    VK.logout = function () {
        return VKLogin.logout();
    };
    /**
     * Checks if user is already logged in
     * @returns {Promise<boolean>} Promise that resolves with boolean value
     */
    VK.isLoggedIn = function () {
        return VKLogin.isLoggedIn();
    };
    /**
     * Opens VK share dialog either via VK mobile app or via WebView (if app is not installed on the device).
     * Make sure to have correct permissions!
     * @param {VKShareOptions} options VKShareOptions object
     * @returns {Promise<number>} Promise that resolves with postId number
     */
    VK.share = function (options) {
        if (options.image) {
            options.image = resolveAssetSource_1.default(options.image).uri;
        }
        return VKShare.share(options);
    };
    /**
     * **Android only** - helper method to get fingerprints on JS side
     * @returns {Promise<string[]>} Promise that resolves with array of string fingerprints
     */
    VK.getCertificateFingerprint = function () {
        if (react_native_1.Platform.OS !== 'android') {
            console.warn('getCertificateFingerprint is for Android only');
            return Promise.resolve([]);
        }
        return VKLogin.getCertificateFingerprint();
    };
    return VK;
}());
exports.VK = VK;
exports.default = VK;
//# sourceMappingURL=index.js.map