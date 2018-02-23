import axios from 'axios'
import config from './config'
import setting from './setting'
let _ = require('lodash')

const CACHE_KEY = 'axios-cache'
export default class AxiosCache {
    constructor () {
        // 请求配置
        this.__config = {}
        this.__httpStatus = setting.httpStatus
        this.__clientCode = setting.clientCode
        this.init()
    }

    init () {
        this.doFlushSetting(CACHE_KEY, config)
    }

    /**
     * 设置服务器端返回的状态码与前端使用的状态码的匹配关系
     *
     * @param    {Object}       http        服务器端返回的状态码
     * @param    {Object}       client      客户端使用的状态码
     * @return   {void}
     */
    doMapStatusCode (http, client) {
        this.__httpStatus = Object.assign(this.__httpStatus, http)
        this.__clientCode = Object.assign(this.__clientCode, client)
    }

    /**
     * 根据后端返回的http状态码获取客户端设置对应的状态码的KEY
     *
     * @param    {Integer}       status        服务器端返回的状态码
     * @return   {void}
     */
    getMapStatusCodeKey (status) {
        for (let code in this.__httpStatus) {
            if (this.__httpStatus.hasOwnProperty(code)) {
                if (this.__httpStatus[code].indexOf(status) !== -1) {
                    return code
                }
            }
        }
    }

    /**
     * 设置请求配置
     *
     * @param       {String}   key          整个cache的唯一性key
     * @param       {Object}   conf         该cache的全部请求配置
     * @return      {void}
     */
    doFlushSetting (key, conf) {
        if (!key && typeof key !== 'string') {
            return
        }
        this.__config[key] = conf
    }
    /**
     * 处理后端返回错误状态码，子类重写
     * @override
     *
     * @param       {Integer}   code        客户端状态码
     * @param       {Object}    result      客户端返回的数据
     * @return      {void}
     */
    handleErrorCase (code, result) {}

    /**
     * 发送请求
     *
     * @param       {String}   key        配置请求的key
     * @param       {Object}   options      请求发送的数据
     * @return      {void}
     */
    sendRequest (key, options) {
        let conf = _.cloneDeep((this.__config[this.settingKey] || {})[key])
        if (!conf) {
            throw new Error(`can not find config key ${this.settingKey}`)
        }
        let reg0 = /\{(.*?)\}/gi
        /* eslint-disable */
        let reg1 = /:([^-\/|\.]*)/gi
        if (!key && typeof key !== 'string' || !conf) {
            return
        }
        conf = Object.assign(conf, options)
        let params = options.params || {}
        let data = options.data || {}
        // rest接口参数替换
        if (conf.rest) {
            conf.url = conf.url.replace(reg0, function ($0, $1) {
                return params[$1] ? params[$1] : (data[$1] ? data[$1] : $0)
            }).replace(reg1, function ($0, $1) {
                return params[$1] ? params[$1] : (data[$1] ? data[$1] : $0)
            });
        }
        // 非异步接口
        if (conf.ajax === false) {
            window.open(conf.url, conf.target ? conf.target : '_blank')
            return
        }
        axios(conf)
            .then(function (response) {
                let codeKey = this.getMapStatusCodeKey(options.resetReturnCode === undefined ? response.data.code : options.resetReturnCode)
                if (this.__clientCode[codeKey] === this.__clientCode.CODE_OK) {
                    options.onload && options.onload(response.data)
                } else {
                    options.onerror && options.onerror(response.data)
                    this.handleErrorCase(this.__clientCode[codeKey], response.data)
                }
            }.bind(this))
    }
}
