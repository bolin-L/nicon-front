import config from './config'
import BaseCache from '../base/cache'

const CACHE_KEY = 'repo_cache_key'
export default class RepoCache extends BaseCache {
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
     * 创建图标库
     *
     */
    createRepo (options) {
        this.sendRequest(
            'repo-create', options
        )
    }
    /**
     * 更新图标库
     *
     */
    updateRepo (options) {
        this.sendRequest(
            'repo-update', options
        )
    }
    /**
     * 获取图标库列表
     *
     */
    getList (options) {
        let key = `repo-${options.extOpt.reqType ? options.extOpt.reqType + '-' : ''}list`
        this.sendRequest(
            key, options
        )
    }
    /**
     * 添加图标到图标库
     *
     */
    addIconToRepo (options) {
        this.sendRequest(
            'repo-add-icon', options
        )
    }
    /**
     * 从图标库中删除图标
     *
     */
    deleteIconFromRepo (options) {
        this.sendRequest(
            'repo-delete-icon', options
        )
    }
    /**
     * 同步数据库数据到git仓库
     *
     */
    syncRepo (options) {
        this.sendRequest(
            'repo-sync', options
        )
    }
    /**
     * 同步数据库数据到git仓库
     *
     */
    getRepoInfo (options) {
        this.sendRequest(
            'repo-get', options
        )
    }
    /**
     * 添加仓库管理员权限
     *
     */
    addMember (options) {
        this.sendRequest(
            'repo-member-add', options
        )
    }
}
