import Base from '@/base/base.vue'
import iconRepoList from '@/components/common/iconRepoList/ui'
import searchInput from '@/components/common/searchInput/ui'
export default Base.extend({
    name: 'hello',
    data () {
        return {
            msg: 'Welcome to Your Icon Library',
            value: '',
            listOpt: {
                pageSize: 8,
                pageIndex: 1,
                userId: 'all'
            },
            extOpt: {
                reqType: 'recommend'
            }
        }
    },
    components: { iconRepoList, searchInput },
    methods: {
        search (value) {
            this.$router.push({name: 'searchQ', params: { q: value }})
        }
    }
})
