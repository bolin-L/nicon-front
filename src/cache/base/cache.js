// import AxiosCache from 'axios-cache'
import AxiosCache from 'axios-cache'
import config from './config'
import setting from './setting'
import {Message, Modal} from 'iview'

const CACHE_KEY = 'cache-base'
export default class BaseCache extends AxiosCache {
    constructor () {
        super()
        this.globalCacheKey = CACHE_KEY
    }

    init () {
        super.init()
        // 设置工程通用请求配置
        this.doFlushSetting(this.globalCacheKey, config)
        // 设置后端返回状态码与客户端状态码对应关系
        this.doMapStatusCode(setting.httpStatus, setting.clientCode)
    }

    /**
     * 处理后端返回错误状态码，子类重写
     * @override
     *
     * @param       {Integer}   code        客户端状态码
     * @param       {Object}    result      客户端返回的数据
     * @return      {void}
     */
    handleErrorCase (code, result) {
        switch (code) {
        case setting.clientCode.CODE_WARM:
            // before show this modal is removing another modal, because executing destroy
            setTimeout(() => {
                Message.info({
                    title: '错误提示！',
                    content: result.message
                })
            }, 500)
            break
        case setting.clientCode.CODE_ERROR:
            setTimeout(() => {
                Modal.error({
                    title: '错误提示！',
                    content: result.message
                })
            }, 500)
            break
        case setting.clientCode.CODE_NO_AUTH:
            setTimeout(() => {
                Modal.error({
                    title: '错误提示！',
                    content: result.message
                })
            }, 500)
            break
        case setting.clientCode.CODE_NO_PRIVILEGE:
            setTimeout(() => {
                Modal.error({
                    title: '错误提示！',
                    content: result.message
                })
            }, 500)
            break;
        case setting.clientCode.CODE_INIT:
            location.href = `${location.protocol}//${location.host}/#/install`;
            break;
        default:
            console.log('code ' + code + ', message ' + result.message)
        }
    }
}
