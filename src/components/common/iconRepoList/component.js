import ListView from '@/components/common/listView/component'
import RepoCache from '@/cache/repo/cache'
import IconRepoCard from '@/components/common/iconRepoCard/ui'
import CommonEmpty from '@/components/common/empty/ui'
import {
    Page as IPage
} from 'iview'

export default ListView.extend({
    data () {
        return {
            list: []
        }
    },
    components: { IconRepoCard, IPage, CommonEmpty },
    props: [ 'listOpt', 'extOpt' ],
    computed: {
        userInfo () {
            return this.$store.state.webUser
        }
    },
    methods: {
        _getCacheInstance () {
            return new RepoCache()
        },
        turnPage (page) {
            this.go(page || 1)
        }
    }
})
