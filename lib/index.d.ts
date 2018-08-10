/**
 * Response from login method
 */
export interface VKLoginResult {
    /**
     * String token for use in request parameters
     */
    access_token: string | null;
    /**
     * User email, or null, if permission was not given
     */
    email: string | null;
    /**
     * **Android only** If user sets "Always use HTTPS" setting in his profile, it will be true
     */
    https_required?: boolean;
    /**
     * User secret to sign requests (if nohttps used)
     */
    secret: string | null;
    /**
     * Current user id for this token
     */
    user_id: string | null;
    /**
     * Time when token expires
     */
    expires_in?: number;
}
/**
 * Share dialog options
 */
export interface VKShareOptions {
    /**
     * Shared link name
     */
    linkText?: string;
    /**
     * Shared link URL
     */
    linkUrl?: string;
    /**
     * Shared text message
     */
    description?: string;
    /**
     * Shared image, local file resource, i.e. require('path/to/your/image.png')
     */
    image?: number;
}
export declare const enum VKError {
    E_NOT_INITIALIZED = "E_NOT_INITIALIZED",
    E_VK_UNKNOWN = "E_VK_UNKNOWN",
    E_VK_API_ERROR = "E_VK_API_ERROR",
    E_VK_CANCELED = "E_VK_CANCELED",
    E_VK_REQUEST_NOT_PREPARED = "E_VK_REQUEST_NOT_PREPARED",
    E_VK_RESPONSE_STRING_PARSING_ERROR = "E_VK_RESPONSE_STRING_PARSING_ERROR",
    E_VK_AUTHORIZE_CONTROLLER_CANCEL = "E_VK_AUTHORIZE_CONTROLLER_CANCEL",
    E_VK_JSON_FAILED = "E_VK_JSON_FAILED",
    E_VK_REQUEST_HTTP_FAILED = "E_VK_REQUEST_HTTP_FAILED",
    E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST",
    E_FINGERPRINTS_ERROR = "E_FINGERPRINTS_ERROR"
}
/**
 * React-native wrapper around vk-ios-sdk and vk-android-sdk
 * Provides login and share functionality
 */
export declare class VK {
    /**
     * Initializes VK SDK from JS code.
     * You only need to call this once before you call login or logout.
     * You can skip this call if you've added your VK App ID to your Android's resources or iOS's info.plist.
     * @param {number|string} vkAppId Your VK app id
     */
    static initialize(vkAppId: number | string): void;
    /**
     * Opens VK login dialog either via VK mobile app or via WebView (if app is not installed on the device).
     * If the user is already logged in and has all the requested permissions, then the promise is resolved
     * straight away, without VK dialog.
     * @param {string[]} scopesArray array which contains VK access permissions as strings,
     * e.g. `['friends', 'photos', 'email']`
     * List of available permissions can be found <a href="https://new.vk.com/dev/permissions">here</a>
     * @returns {Promise<VKLoginResult>} Promise will be resolved with VKLoginResult object
     */
    static login(scopesArray: string[]): Promise<VKLoginResult>;
    /**
     * Performs the logout
     * @returns {Promise} empty promise
     */
    static logout(): Promise<void>;
    /**
     * Checks if user is already logged in
     * @returns {Promise<boolean>} Promise that resolves with boolean value
     */
    static isLoggedIn(): Promise<boolean>;
    /**
     * Opens VK share dialog either via VK mobile app or via WebView (if app is not installed on the device).
     * Make sure to have correct permissions!
     * @param {VKShareOptions} options VKShareOptions object
     * @returns {Promise<number>} Promise that resolves with postId number
     */
    static share(options: VKShareOptions): Promise<number>;
    /**
     * **Android only** - helper method to get fingerprints on JS side
     * @returns {Promise<string[]>} Promise that resolves with array of string fingerprints
     */
    static getCertificateFingerprint(): Promise<string[]>;
}
export default VK;
