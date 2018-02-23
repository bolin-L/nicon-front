import Base from '@/base/base.vue'
import IconList from '@/components/common/iconList/ui'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            listOpt: {
                pageSize: 60,
                pageIndex: 1,
                userId: 'all',
                q: this.$route.params.q
            },
            totalCount: 0,
            iconControl: {
                iconActiveSelected: true,
                iconOperatorOptions: {
                    allowCopy: true,
                    allowEdit: false,
                    allowDelete: false,
                    allowDownload: true,
                    allowCollect: true
                }
            }
        }
    },
    components: { IconList },
    methods: {
        updateIconCount (result) {
            this.totalCount = (result.query || {}).totalCount || 0;
        }
    }
})
