import Base from '@/base/base.vue'
import {
    Menu as IMenu,
    MenuItem as IMenuItem,
    Icon
} from 'iview'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            menus: [
                {
                    label: '功能介绍',
                    name: 'docsIntroduce',
                    content: '功能介绍',
                    icon: 'ios-paper'
                },
                {
                    label: '图标绘制',
                    name: 'docsIconMaker',
                    content: '图标绘制',
                    icon: 'hammer'
                },
                {
                    label: '常见问题',
                    name: 'docsTrouble',
                    content: '常见问题',
                    icon: 'settings'
                }
            ]
        }
    },
    components: { IMenu, IMenuItem, Icon },
    computed: {
        currentRouterPathName () {
            return this.$route.name || this.tabs[0].name
        },
        currentRouterPath () {
            return this.$route.fullPath
        }
    },
    methods: {
        changeTab (name) {
            this.$router.push({name: name})
        }
    }
})
