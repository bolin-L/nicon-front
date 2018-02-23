import Base from '@/base/base.vue'
/**
 * operatorOptions                              操作选项
 * operatorOptions.allowCopy=false              是否允许复制
 * operatorOptions.allowEdit=false              是否允许编辑
 * operatorOptions.allowDelete=false            是否允许删除
 * operatorOptions.allowDownload=false          是否允许下载
 * iconActiveSelected=false                     允许选择状态,与operatorOptions互斥，优先级高
 * selected=false                               是否选中
 * isEdit=false                                 可编辑状态
 *
 */
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            selected: false,
            isEdit: false,
            preIconName: ''
        }
    },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        isOwner () {
            return this.icon.ownerId === this.userInfo.userId
        }
    },
    props: {
        icon: Object,
        iconOperatorOptions: {
            type: Object,
            default: function () {
                return {
                    allowCopy: true,
                    allowEdit: true,
                    allowDelete: true,
                    allowDownload: true,
                    allowCollect: true
                }
            }
        },
        copyTextPrefix: {
            type: String,
            default: ''
        },
        iconActiveSelected: {
            type: Boolean,
            default: false
        },
        selectedAllIconFlag: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        selectedAllIconFlag: function (newVal, oldVal) {
            if (newVal === oldVal) {
                return;
            }
            this.selectedIcon(newVal)
        }
    },
    methods: {
        /**
         * 删除图标
         *
         * @param    {Integer}        iconId            字体图标Id
         * @return   {void}
         */
        deleteIcon () {
            let that = this
            this.$Modal.confirm({
                content: '是否确定删除图标？',
                onOk () {
                    that.$emit('delete', that.icon.iconId)
                }
            })
        },
        /**
         * 拷贝图标名称
         *
         * @param    {String}        iconName            字体图标名称
         * @return   {void}
         */
        copyIconName () {
            this.$emit('copy', this.icon.iconName)
        },
        /**
         * collect icon | add to draft
         *
         * @return   {void}
         */
        collectIcon () {
            this.$emit('collect', this.icon)
        },
        /**
         * icon编辑状态改变
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        changeEditStatus () {
            this.isEdit = true
            // 保留编辑钱状态
            this.preIconName = this.icon.iconName
            this.$emit('editStatus', this.isEdit)
        },
        /**
         * 编辑图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        editIcon () {
            this.isEdit = false
            if (this.preIconName === this.icon.iconName) {
                return
            }
            this.$emit('edit', this.icon)
        },
        /**
         * 选中图标
         *
         * @param    {Boolean}        selected            字体图标对象
         * @return   {void}
         */
        selectedIcon (selected) {
            if (!this.iconActiveSelected) {
                return
            }
            this.selected = (selected === undefined) ? !this.selected : selected
            this.$emit(this.selected ? 'selected' : 'unselected', this.icon)
        },
        /**
         * 下载图标
         *
         * @param    {Object}        icon            字体图标对象
         * @return   {void}
         */
        downloadIcon () {
            this.$emit('download', this.icon)
        }
    },
    created () {}
})
