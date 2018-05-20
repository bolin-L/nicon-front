import Base from '@/base/base.vue'
import CommonCache from '@/cache/common/cache'
import {
    Input as IInput,
    Button as IButton,
    Row as IRow,
    Col as ICol
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
            config: [
                {
                    name: 'MONGODB_NAME',
                    value: 'iconRepo',
                    description: 'mongo数据库名称',
                    necessary: true
                },
                {
                    name: 'MONGODB_HOST',
                    value: '127.0.0.1',
                    description: 'mongo数据库IP',
                    necessary: true
                },
                {
                    name: 'MONGODB_PORT',
                    value: '27017',
                    description: 'mongo数据库端口',
                    necessary: true
                },
                {
                    name: 'MONGODB_USERNAME',
                    value: '',
                    description: 'mongo数据库用户名',
                    necessary: true
                },
                {
                    name: 'MONGODB_PASSWORD',
                    value: '',
                    description: 'mongo数据库密码',
                    necessary: true
                },
                {
                    name: 'REDIS_HOST',
                    value: '127.0.0.1',
                    description: 'redis数据库IP',
                    necessary: true
                },
                {
                    name: 'REDIS_PORT',
                    value: '6379',
                    description: 'redis数据库端口',
                    necessary: true
                },
                {
                    name: 'REDIS_PASSWORD',
                    value: '',
                    description: 'redis数据库密码',
                    necessary: true
                },
                {
                    name: 'productHost',
                    value: 'icon.bolin.site',
                    description: '访问网站host',
                    necessary: true
                }
            ]
        }
    },
    components: { IInput, IButton, IRow, ICol },
    methods: {
        addItem () {
            this.config.push({
                name: '',
                value: '',
                description: ''
            })
        },
        deleteItem (index) {
            this.config.splice(index, 1);
        },
        submit () {
            let data = this.config.filter(item => {
                return item.value !== '';
            })
            this.cache.installApplication({
                data: data,
                onload: result => {
                    if (result.result) {
                        let seconds = 5;
                        let timer = setInterval(() => {
                            if (seconds > 0) {
                                seconds--
                            } else {
                                clearInterval(timer);
                                location.href = location.protocol + '//' + location.host;
                            }
                        }, 1000)
                        this.$Modal.success({
                            title: '提示',
                            content: `应用将在${seconds}秒之后自动重启`
                        })
                    }
                }
            })
        }
    },
    created: function () {
        this.cache = new CommonCache({});
    }
})
