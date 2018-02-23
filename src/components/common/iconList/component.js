import ListView from '@/components/common/listView/component'
import IconCache from '@/cache/icon/cache'
import IconCard from '@/components/common/iconCard/ui'
import CommonEmpty from '@/components/common/empty/ui'
import {
    Page as IPage
} from 'iview'

export default ListView.extend({
    data () {
        return {
            list: [],
            selectedIcons: [],
            selectedAllIconFlag: false
        }
    },
    components: { IconCard, IPage, CommonEmpty },
    props: [ 'listOpt', 'extOpt', 'iconOperatorOptions', 'iconActiveSelected', 'emptyText', 'copyTextPrefix' ],
    computed: {
        userInfo () {
            return this.$store.state.webUser
        }
    },
    methods: {
        _getCacheInstance () {
            return new IconCache()
        },
        turnPage (page) {
            this.go(page || 1)
        },
        afterUpdate (result) {
            this.$Message.success({
                content: result.message
            })
        },
        /**
         * 删除图标
         *
         * @param    {Integer}        iconId            字体图标Id
         * @return   {void}
         */
        deleteIcon (iconId) {
            this.$emit('delete-icon', iconId);
            // 把删除操作冒泡给外层, 由外层处理
            if ((this.iconOperatorOptions || {}).popDelete) {
                return
            }
            this.delete({
                data: {
                    iconId: iconId
                }
            })
        },

        /**
         * delete success callback
         *
         * @return   {void}
         */
        afterDelete (result) {
            this.$Message.success({
                content: result.message
            })
        },
        /**
         * 更新图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        updateIcon (icon = {}) {
            this.update({
                data: {
                    iconId: icon.iconId,
                    iconName: icon.iconName
                }
            })
        },
        /**
         * collect icon
         *
         * @param    {Object}        icon            icon object
         * @return   {void}
         */
        collectIcon (icon = {}) {
            this.cache.collectIcon({
                data: icon,
                onload: (result) => {
                    if (result.result) {
                        this.$Message.success('图标已收藏到 上传图标 中')
                    } else {
                        this.$Message.error(result.result.message || '收藏失败！')
                    }
                }
            })
        },
        /**
         * 选中图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        selectedIcon (icon) {
            if (!this.iconActiveSelected) {
                return
            }
            this.selectedIcons.push(icon)
            this.$emit('selected', icon)
        },
        /**
         * 取消选中图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        unselectedIcon (icon) {
            let index = this.selectedIcons.indexOf(icon)
            if (index !== -1) {
                this.selectedIcons.splice(index, 1)
            }
            this.$emit('unselected', icon)
        },
        /**
         * 全选|取消全选图标
         *
         * @param    {Boolean}        selected            全选|取消全选
         * @return   {void}
         */
        selectedAllIcon (selected) {
            this.selectedAllIconFlag = selected;
        },
        /**
         * 下载图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        downloadIcon (icon) {
            this.$emit('download', icon)
            this.download({
                data: {},
                params: {
                    iconId: icon.iconId
                }
            })
        }
    }
})
