import Base from '@/base/base.vue'
export default Base.extend({
    data () {
        return {
            cache: this._getCacheInstance(),
            index: 1,
            totalPageCount: 1,
            totalCount: 0,
            list: []
        }
    },
    props: {
        listOpt: {
            type: Object,
            default: function () {
                return {
                    pageIndex: 1,
                    pageSize: 6
                }
            }
        },
        deleteOpt: Object,
        extOpt: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    beforeCreate () {
        this.$on('refresh', () => {
            this.getList()
        })
    },
    methods: {
        /**
         * 获取接口cache
         *
         * @override
         * @return   {Object}           接口cache对象
         */
        _getCacheInstance () {
            return this.cache
        },
        /**
         * 获取列表
         *
         * @param    {Object}       options                 请求参数，默认{}
         * @return   {void}
         */
        getList (options = {}) {
            this.cache.getList({
                params: Object.assign({}, this.listOpt, options.data),
                extOpt: Object.assign({}, this.extOpt, options.extOpt),
                onload: this.onGetList.bind(this)
            })
        },
        /**
         * 获取列表成功回调
         *
         * @param    {Object}       options                 请求参数，默认{}
         * @return   {void}
         */
        onGetList (result) {
            result = result.result || {};
            this.list = result.list
            let query = result.query || {}
            this.index = query.pageIndex
            this.totalCount = query.totalCount
            this.totalPageCount = query.totalPageCount
            this.$emit('ongetlist', result);
            this.afterGetList(result);
        },
        /**
         * 获取列表成功回调
         *
         * @param    {Number}       page                 页数
         * @return   {void}
         */
        go (page) {
            this.listOpt.pageIndex = page;
            this.getList();
        },
        /**
         * 获取列表成功后
         *
         * @param    {Object}       result                 列表结果
         * @override
         * @return   {void}
         */
        afterGetList (result) {
        },
        /**
         * 删除项
         *
         * @param    {Object}          options          实体Id对象，数据结构由上层定
         * @return   {void}
         */
        delete (options) {
            options.onload = options.onload || this.onDelete
            this.cache.delete({
                data: Object.assign({}, this.deleteOpt, options.data),
                extOpt: Object.assign({}, this.extOpt, options.extOpt),
                onload: options.onload.bind(this)
            })
        },
        onDelete (result) {
            this.$emit('refresh');
            this.$emit('ondelete');
            this.afterDelete(result)
        },
        /**
         * 删除成功后
         *
         * @param    {Object}       result                 删除结果
         * @override
         * @return   {void}
         */
        afterDelete (result) {
        },
        /**
         * 更新项
         *
         * @param    {Object}          options          实体Id对象，数据结构由上层定
         * @return   {void}
         */
        update (options) {
            this.cache.update({
                data: Object.assign({}, this.deleteOpt, options.data),
                extOpt: Object.assign({}, this.extOpt, options.extOpt),
                onload: this.onUpdate.bind(this)
            })
        },
        /**
         * 下载项
         *
         * @param    {Object}          options          实体Id对象，数据结构由上层定
         * @return   {void}
         */
        download (options) {
            this.cache.download({
                data: Object.assign({}, options.data),
                params: Object.assign({}, options.params),
                extOpt: Object.assign({}, this.extOpt, options.extOpt),
                onload: this.onUpdate.bind(this)
            })
        },
        onUpdate (result) {
            this.$emit('refresh');
            this.$emit('ondelete');
            this.afterUpdate(result)
        },
        /**
         * 删除成功后
         *
         * @param    {Object}       result                 删除结果
         * @override
         * @return   {void}
         */
        afterUpdate (result) {
        }
    },
    created () {
        this.getList();
    }
})
