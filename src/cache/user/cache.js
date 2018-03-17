import config from './config'
import BaseCache from '../base/cache'

const CACHE_KEY = 'login_cache_key'
export default class LoginCache extends BaseCache {
    constructor () {
        super()
        this.settingKey = CACHE_KEY
    }

    init () {
        super.init()
        this.doFlushSetting(
            CACHE_KEY, config
        )
    }
    /**
     * 手机号登录
     *
     * @param    {Object}           options        请求对象
     * @return   {void}
     */
    userLogin (options) {
        this.sendRequest(
            'user-login', options
        )
    }
    /**
     * 手机号注册
     *
     * @param    {Object}           options        请求对象
     * @return   {void}
     */
    userRegister (options) {
        this.sendRequest(
            'user-register', options
        )
    }
    /**
     * 获取用户基本信息
     *
     * @param    {Object}           options        请求对象
     * @return   {void}
     */
    getUserInfo (options) {
        this.sendRequest(
            'user-get', options
        )
    }
    /**
     * 获取当前登录用户基本信息
     *
     * @param    {Object}           options        请求对象
     * @return   {void}
     */
    getCurLoginUserInfo (options) {
        return this.sendRequest(
            'user-cur-get', options
        )
    }
    /**
     * 登出操作
     * 清楚cookie，webUser置空
     *
     * @param    {Object}           options        请求对象
     * @return   {void}
     */
    logout (options) {
        this.sendRequest(
            'user-logout', options
        )
    }
}
