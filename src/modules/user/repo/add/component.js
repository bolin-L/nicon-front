import Base from '@/base/base.vue'
import validatorRules from './validateRules'
import RepoCache from '@/cache/repo/cache'
import { mapState } from 'vuex'
import {
    Input as IInput,
    Button as IButton,
    Row as IRow,
    Col as ICol,
    Radio as IRadio,
    RadioGroup,
    Modal,
    Message
} from 'iview'
/**
 * 创建字体图标库
 * @param    {String}           repoName                    git仓库中文名称
 * @param    {String}           iconPrefix                  字体图标前缀|git仓库真实名称
 * @param    {String}           repoDescription             git仓库描述
 * @return   {void}
 */
export default Base.extend({
    data () {
        return {
            repoName: '',
            iconPrefix: '',
            repoDescription: '',
            rules: validatorRules,
            isLoading: false,
            isEdit: false
        }
    },
    components: { IInput, IButton, Modal, Message, IRow, ICol, RadioGroup, IRadio },
    computed: {
        ...mapState([
            'webUser'
        ])
    },
    methods: {
        submit () {
            this.$checkAll().then(() => {
                // 验证通过后避免重复点击提交
                this.isLoading = true
                let data = {
                    repoName: this.repoName,
                    iconPrefix: this.iconPrefix,
                    repoDescription: this.repoDescription,
                    userId: this.webUser.userId,
                    repoId: this.$route.params.repoId
                }
                if (this.isEdit) {
                    this.cache.updateRepo({
                        data: data,
                        onload: this.createSuccess.bind(this),
                        onerror: function () {
                            this.isLoading = false;
                        }.bind(this)
                    })
                } else {
                    this.cache.createRepo({
                        data: data,
                        onload: this.createSuccess.bind(this),
                        onerror: function () {
                            this.isLoading = false;
                        }.bind(this)
                    })
                }
            }).catch(errors => {
                console.log(errors)
            })
        },
        createSuccess (result) {
            if (result.result) {
                this.$Message.success(result.message || '创建成功！')
                setTimeout(() => {
                    this.$router.push({name: 'userRepoListModule', params: {userId: this.webUser.userId}})
                })
            } else {
                this.isLoading = false;
            }
        },
        getRepoInfo () {
            let that = this
            this.cache.getRepoInfo({
                data: {
                    repoId: that.$route.params.repoId
                },
                onload (result) {
                    if (result.result) {
                        that.repoName = result.result.repoName
                        that.iconPrefix = result.result.iconPrefix
                        that.repoDescription = result.result.repoDescription
                    }
                }
            })
        }
    },
    created: function () {
        this.cache = new RepoCache()
        if (this.$route.params.repoId) {
            this.isEdit = true
            this.getRepoInfo()
        }
    }
})
