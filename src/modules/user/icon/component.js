import Base from '@/base/base.vue'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App'
        }
    },
    components: {},
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        currentRouter () {
            return this.$router.currentRoute.name || this.tabs[0].name
        }
    },
    methods: {
    }
})
