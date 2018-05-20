import config from './config'
import BaseCache from '../base/cache'

const CACHE_KEY = 'common_cache_key'
export default class CommonCache extends BaseCache {
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

    installApplication (options = {}) {
        this.sendRequest(
            'install-application', options
        )
    }
}
