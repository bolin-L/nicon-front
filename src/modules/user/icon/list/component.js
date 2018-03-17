import Base from '@/base/base.vue'
import IconList from '@/components/common/iconList/ui'
import searchInput from '@/components/common/searchInput/ui'
import {
    Button as IButton,
    Radio as IRadio,
    Select as ISelect,
    Option as IOption
} from 'iview'

/**
 *  listOpt                 获取字体图标列表参数
 *  iconRepoList            用户拥有的字体图标库
 *  selectAllIcon=false     全选全部图标
 *  operatorAll=false       批量操作
 *  selectedIconLibId=null  需要加入的图标库Id
 *  showIconLibList=false   显示图标库列表
 *  iconOperatorOptions     控制图标卡片的操作
 */
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            listOpt: {
                pageSize: 60,
                userId: this.$route.params.userId,
                q: ''
            },
            totalCount: 0
        }
    },
    components: { IconList, IButton, IRadio, ISelect, IOption, searchInput },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        iconOperatorOptions () {
            return {
                allowCopy: true,
                allowEdit: false,
                allowDelete: this.userInfo.userId === parseInt(this.$route.params.userId),
                allowDownload: true,
                allowCollect: true
            }
        }
    },
    methods: {
        updateIconCount (result) {
            this.totalCount = (result.query || {}).totalCount || 0;
        },
        search (q) {
            this.listOpt.q = q
            this.listOpt.pageIndex = 1
            this.$refs.userIconList.getList()
        }
    }
})
