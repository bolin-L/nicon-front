import Base from '@/base/base.vue'
import IconList from '@/components/common/iconList/ui'
import searchInput from '@/components/common/searchInput/ui'
import RepoCache from '@/cache/repo/cache'
import {
    Modal,
    Input as IInput,
    Select as ISelect,
    Option as IOption,
    Button as IButton,
    Checkbox as ICheckbox
} from 'iview'

/**
 *  showIconListDialog=false            显示添加图标弹框
 *  listOpt                             字体图标列表参数
 *  listOptUnique                       字体图标列表去重参数
 *  totalCount                          该仓库下的图标总数
 *  repo                                仓库信息对象
 *  repo.iconIds                        仓库下所有图标id数组
 *  repo.unSync                         仓库是否更新到最新
 *  iconControl                         图标卡片操作控制项对象
 *  iconControl.iconActiveSelected      图标是否可以被选中
 *  iconControl.iconOperatorOptions     控制图标操作项显示
 *  isSyncRepo                          是否正在同步仓库数据
 *  addMemberStatus                     添加成员按钮状态
 */

/* 添加成员输入类型-用户ID */
const MEMBER_ACCOUNT_TYPE_USER_ID = 1;

/* 添加成员输入类型-邮箱 */
const MEMBER_ACCOUNT_TYPE_USER_NAME = 5;

export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            listOpt: {
                pageSize: 60,
                pageIndex: 1,
                userId: this.$route.params.userId,
                repoId: (this.$route.params || {}).repoId
            },
            totalCount: 0,
            repo: {},
            showIconListDialog: false,
            selectedAllIconFlag: false,
            isSyncRepo: false,
            member: {
                addMemberStatus: false,
                accountType: MEMBER_ACCOUNT_TYPE_USER_NAME,
                typeList: [
                    {
                        value: MEMBER_ACCOUNT_TYPE_USER_NAME,
                        text: 'corp前缀'
                    },
                    {
                        value: MEMBER_ACCOUNT_TYPE_USER_ID,
                        text: '用户Id'
                    }
                ],
                account: ''
            }
        }
    },
    components: { IconList, Modal, IInput, ISelect, IOption, IButton, ICheckbox, searchInput },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        listOptUnique () {
            return {
                pageSize: 500,
                pageIndex: 1,
                userId: this.userInfo.userId,
                repoId: (this.$route.params || {}).repoId,
                unique: true
            }
        },
        iconControl () {
            return {
                iconActiveSelected: true,
                iconOperatorOptions: {
                    allowCopy: true,
                    allowEdit: false,
                    allowDelete: this.repo.isMember,
                    allowDownload: true,
                    allowCollect: true,
                    popDelete: true
                }
            }
        }
    },
    methods: {
        /**
         * 获取图标库基本信息
         *
         * @return   {void}
         */
        getRepoInfo () {
            this.cache.getRepoInfo({
                data: {
                    repoId: this.listOpt.repoId
                },
                onload: (result) => {
                    this.repo = result.result
                    // update automatically
                    if (this.repo.unSync) {
                        this.syncRepo();
                    } else {
                        this.updateFontStyle(result.result.cssUrl);
                    }
                }
            })
        },
        /**
         * 从图标库中删除图标的引用
         *
         * @param    {Number}           iconId                      图标Id
         * @return   {void}
         */
        deleteIcon (iconId) {
            this.cache.deleteIconFromRepo({
                data: {
                    iconId: iconId,
                    repoId: this.listOpt.repoId
                },
                onload: function (result) {
                    if (result.result) {
                        this.$Message.success(result.message || '删除成功,请保存更新！')
                        this.$refs.repoIconList.getList()
                        this.getRepoInfo()
                    } else {
                        this.$Message.error(result.message)
                    }
                }.bind(this)
            })
        },

        /**
         * 全选|取消全选图标
         *
         */
        selectAllIcon () {
            this.$refs.addIconListRef.selectedAllIcon(this.selectedAllIconFlag)
        },
        /**
         * 添加字体图标Id到图标库对象中
         *
         */
        addIconToRepo () {
            let icons = this.$refs.addIconListRef.selectedIcons;
            icons = icons.map((icon) => {
                return {
                    iconId: icon.iconId,
                    iconName: icon.iconName
                }
            })
            this.cache.addIconToRepo({
                data: {
                    icons: icons,
                    userId: this.userInfo.userId,
                    repoId: this.listOpt.repoId
                },
                onload: function (result) {
                    this.$Message.success(result.message || '添加成功,请保存更新！')
                    this.$refs.repoIconList.getList()
                    this.getRepoInfo()
                }.bind(this)
            })
        },
        /**
         * 更新仓库，同步数据库与git仓库
         *
         */
        syncRepo () {
            this.isSyncRepo = true
            this.cache.syncRepo({
                data: {
                    repoId: this.listOpt.repoId
                },
                onload: function (result) {
                    this.$Message.success(result.message || '保存更新成功！')
                    this.isSyncRepo = false
                    this.repo.unSync = false
                    this.repo.cssUrl = result.result.url
                    this.updateFontStyle(result.result.url)
                }.bind(this)
            })
        },
        /**
         * 添加仓库管理员
         *
         */
        addMember () {
            if (!this.member.account) {
                this.$Message.error('请输入用户Id或邮箱！')
            }
            this.cache.addMember({
                data: {
                    repoId: this.listOpt.repoId,
                    accountType: this.member.accountType,
                    account: this.member.account
                },
                onload: function (result) {
                    if (!result.result) {
                        this.$Message.error(result.message)
                    } else {
                        this.$Message.success(result.message || '添加成功！')
                        this.member.account = ''
                    }
                }.bind(this)
            })
        },
        search (q) {
            this.listOpt.q = q
            this.$refs.repoIconList.getList()
        },
        uniqueSearch (q) {
            this.listOptUnique.q = q
            this.$refs.addIconListRef.getList()
        },
        insertFontStyle (cssUrl) {
            let link = document.createElement('link')
            link.rel = 'stylesheet'
            link.id = 'currentRepoFontStyle'
            link.href = cssUrl
            document.getElementsByTagName('head').item(0).appendChild(link)
        },
        updateFontStyle (cssUrl) {
            if (cssUrl) {
                let link = document.getElementById('currentRepoFontStyle')
                if (link) {
                    link.href = cssUrl
                } else {
                    this.insertFontStyle(cssUrl)
                }
            }
        }
    },
    created () {
        this.cache = new RepoCache({})
        this.getRepoInfo()
    }
})
