import Base from '@/base/base.vue'
import UserCache from '@/cache/user/cache'
import {
    Input as IInput,
    Button as IButton,
    Row as IRow,
    Col as ICol,
    Radio as IRadio,
    RadioGroup,
    Modal,
    Message,
    Menu as IMenu,
    MenuItem as IMenuItem
} from 'iview'
/**
 * 用户模块
 * tabs                                 菜单对象数组
 * user                                 主页用户基本信息(可能跟当前用户不同)
 * userInfo                             当前登录用户
 * currentRouter                        当前路由名称
 * isOwner                              当前主页是否为当前登录用户
 *
 */
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            tabs: [
                {
                    label: '图标库',
                    name: 'userRepoListModule',
                    content: '图标库'
                },
                {
                    label: '图标',
                    name: 'userIconListModule',
                    content: '图标'
                }
            ],
            user: {}
        }
    },
    components: { IInput, IButton, Modal, Message, IRow, ICol, RadioGroup, IRadio, IMenu, IMenuItem },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        currentRouterPathName () {
            return this.$route.name || this.tabs[0].name
        },
        currentRouterPath () {
            return this.$route.fullPath
        },
        isOwner () {
            return this.userInfo.userId === this.user.userId
        }
    },
    methods: {
        changeTab (name) {
            this.$router.push({name: name})
        }
    },
    created () {
        this.cache = new UserCache({});
        // 只有公开的path才会带userId
        if (this.$route.params.userId) {
            this.cache.getUserInfo({
                data: {},
                params: {
                    userId: this.$route.params.userId
                },
                onload: function (result) {
                    this.user = result.result
                }.bind(this)
            })
        }
    }
})
