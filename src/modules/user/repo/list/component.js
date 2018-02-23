import Base from '@/base/base.vue'
import IconRepoList from '@/components/common/iconRepoList/ui'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            listOpt: {
                pageSize: 8,
                pageIndex: 1,
                userId: this.$route.params.userId
            },
            totalCount: 0
        }
    },
    components: { IconRepoList },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        }
    },
    methods: {
        changeTab (name) {
            this.$router.push({name: name})
        },
        updateRepoCount (result) {
            this.totalCount = (result.query || {}).totalCount || 0;
        }
    }
})
