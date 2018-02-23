import Base from '@/base/base.vue'
import UserCache from '@/cache/user/cache'
import { Poptip } from 'iview'
import { mapState } from 'vuex'
import searchInput from '@/components/common/searchInput/ui'
export default Base.extend({
    name: 'hello',
    components: { Poptip, searchInput },
    data () {
        return {
            title: 'Welcome to Icon App',
            menuList: [
                {
                    moduleName: 'indexHello',
                    text: '首页',
                    noNeedLogin: true
                },
                {
                    moduleName: 'userRepoListModule',
                    text: '我的图标库'
                },
                {
                    moduleName: 'userRepoAddModule',
                    text: '创建图标库'
                },
                {
                    moduleName: 'userIconListModule',
                    text: '我的图标'
                },
                {
                    moduleName: 'userIconAddModule',
                    text: '上传图标'
                },
                {
                    moduleName: 'docsIntroduce',
                    text: '帮助文档',
                    noNeedLogin: true
                }
            ]
        }
    },
    computed: {
        ...mapState([
            'isLogin'
        ]),
        userInfo () {
            return this.$store.state.webUser
        },
        userPageInfoId () {
            return parseInt(this.$route.params.userId)
        },
        currentModuleName () {
            return this.$route.name
        },
        showSearchInput () {
            return this.currentModuleName !== 'indexHello'
        },
        q () {
            return this.$route.params.q
        }
    },
    methods: {
        login (type) {
            this.$store.commit('loginDialogType', type)
            this.$store.commit('showLoginModal', true)
        },
        logout () {
            this.cache.logout({
                data: {},
                onload: function (result) {
                    this.$store.commit('webUser', result.result)
                }.bind(this)
            })
        },
        // tab active only is owner of current repo
        getActiveTab (moduleName) {
            if (this.currentModuleName === moduleName && this.userPageInfoId === this.userInfo.userId) {
                return 'active'
            } else {
                return ''
            }
        },
        /**
         * 功能
         *
         * @param    {String}           moduleName                  module name
         * @param    {Boolean}          noNeedLogin                 no need pre login
         * @return   {void}
         */
        goModule (moduleName, noNeedLogin) {
            if (this.userInfo.userId || noNeedLogin) {
                this.$router.push({name: moduleName, params: { userId: this.userInfo.userId }})
            } else if (this.userInfo.loginUrl) {
                window.open(this.userInfo.loginUrl, '_self')
            } else {
                this.login('login')
            }
        },

        search (value) {
            this.$router.push({name: value ? 'searchQ' : 'search', params: { q: value }})
        }
    },
    created () {
        this.cache = new UserCache({})
    }
})
