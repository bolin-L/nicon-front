import Base from '@/base/base.vue'
import IconAdd from '@/components/common/iconAdd/ui'
import IconList from '@/components/common/iconList/ui'
import IconCache from '@/cache/icon/cache'
import {
    Button as IButton
} from 'iview'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            disabledSubmitBtn: false,
            listOpt: {
                pageSize: 500
            },
            extOpt: {
                reqType: 'draft'
            },
            totalCount: 0,
            iconOperatorOptions: {
                allowCopy: true,
                allowEdit: true,
                allowDelete: true,
                allowDownload: true,
                allowCollect: false
            }
        }
    },
    components: { IconAdd, IconList, IButton },
    methods: {
        updateIconCount (result) {
            this.totalCount = (result.query || {}).totalCount || 0;
        },
        updateIconList () {
            this.$refs.iconList.getList();
        },
        submit () {
            this.disabledSubmitBtn = true;
            this.cache.submitIconDraft2Icon({
                data: {
                    repoId: this.$route.params.repoId
                },
                onload: this.submitSuccess.bind(this)
            })
        },
        submitSuccess (result) {
            this.disabledSubmitBtn = false
            if (result.result) {
                this.$Message.success('提交成功!')
                setTimeout(() => {
                    if (this.$route.params.repoId) {
                        this.$router.push({name: 'userRepoDetailModule', params: {repoId: this.$route.params.repoId}})
                    } else {
                        this.$router.push({name: 'userIconListModule'})
                    }
                }, 500)
            } else {
                this.$Message.error(result.message);
            }
        }
    },
    created () {
        this.cache = new IconCache({});
    }
})
