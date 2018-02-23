import config from './config'
import BaseCache from '../base/cache'

const CACHE_KEY = 'icon_cache_key'
export default class IconCache extends BaseCache {
    constructor () {
        super()
        this.settingKey = CACHE_KEY
    }

    init () {
        this.doFlushSetting(
            CACHE_KEY, config
        )
    }

    addItem (options = {}) {
        let key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}add`
        this.sendRequest(
            key, options
        )
    }

    collectIcon (options = {}) {
        let key = `icon-draft-collect`
        this.sendRequest(
            key, options
        )
    }

    delete (options = {}) {
        let key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}delete`
        this.sendRequest(
            key, options
        )
    }

    update (options = {}) {
        let key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}update`
        this.sendRequest(
            key, options
        )
    }

    download (options = {}) {
        let key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}download`
        this.sendRequest(
            key, options
        )
    }

    getList (options = {}) {
        let key = `icon-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}list`
        this.sendRequest(
            key, options
        )
    }

    submitIconDraft2Icon (options = {}) {
        this.sendRequest(
            'icon-draft-to-icon', options
        )
    }
}
