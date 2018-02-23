<template>
    <div id="app">
        <top-bar></top-bar>
        <div class="app-content">
            <router-view :key="currentRouterPath"></router-view>
        </div>
        <login-dialog v-if="showLoginModal"></login-dialog>
    </div>
</template>

<script>
    import Base from './base.vue'
    import '../css/iview.less'
    import { mapState } from 'vuex'
    import TopBar from '@/components/common/topBar/ui'
    import LoginDialog from '@/components/common/loginDialog/ui'
    import UserCache from '@/cache/user/cache'
    import Clipboard from 'clipboard'

    export default Base.extend({
        name: 'app',
        components: { TopBar, LoginDialog },
        computed: {
            ...mapState([
                'showLoginModal'
            ]),
            // 当用户改变时重新请求数据
            currentRouterPath () {
                return this.$route.fullPath
            }
        },
        methods: {
            onGetUserInfo (result) {
                window.webUser = result.result
                this.$store.commit('webUser', result.result)
            }
        },
        created: function () {
            this.userCache = new UserCache({})
            this.userCache.getCurLoginUserInfo({
                data: {},
                onload: this.onGetUserInfo.bind(this)
            })
            if (!this.clipBoardIns) {
                this.clipBoardIns = new Clipboard('.copy-button', {
                    text: function (trigger) {
                        return trigger.getAttribute('data-copy');
                    }
                })
                this.clipBoardIns.on('success', (e) => {
                    this.$Message.success('拷贝成功！')
                    e.clearSelection();
                })
                this.clipBoardIns.on('error', function (e) {
                    this.$Message.error('此浏览器不支持拷贝，请更换chrome浏览器')
                    e.clearSelection();
                })
            }
        }
    })
</script>

<style>
    /*base color #336、#C03、#666  #CCC*/

    @import "../css/common.css";
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }

    .app-content{

    }

    .ivu-modal-body {
        min-height: inherit!important;
    }
</style>
