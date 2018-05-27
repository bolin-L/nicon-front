import Base from '@/base/base.vue'
import CommonCache from '@/cache/common/cache'
import {
    Input as IInput,
    Button as IButton,
    Row as IRow,
    Col as ICol,
    Tabs as ITabs,
    TabPane as ITabPane
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
                },
                {
                    name: 'productType',
                    value: 'default',
                    description: '产品类型，自定义上传服务与登录服务文件夹名称，不使用则默认',
                    necessary: true
                }
            ],
            login: {
                index: '',
                config: ''
            },
            upload: {
                index: '',
                config: ''
            },
            uploadPlaceholder: `
                // index.js
    
                let config = require('./config');
                let qiniu = require('qiniu');
                
                class QiniuUpload {
                    async upload (dirPath) {
                        let fontMap = await this.uploadFonts(dirPath);
                        // 上传font完毕后替换css中的引用
                        let cssContent = await this.replaceFontsInCss(dirPath, fontMap);
                        let cssUrl = await this.uploadCss(dirPath, cssContent);
                        
                        // 上传返回数据格式
                        return {
                            url: cssUrl, // 必须
                            cssContent: cssContent // 必须
                        };
                    }
                }
                
                let uploadIns = new QiniuUpload();
                module.exports = uploadIns.upload.bind(uploadIns);
                `,
            loginPlaceholder: `
                // index.js
    
                require('request');
                let rp = require('request-promise');
                let config = require('./config');
                
                class GithubOpenIdLogin {
                    async login (ctx) {
                        return this.getUserBaseInfo(ctx);
                    }
                
                    async getUserBaseInfo (ctx) {
                        // your code
                        
                        // login 方法返回的数据格式
                        return {
                            userName: tokenInfo.sub, // 必须且唯一
                            password: tokenInfo.sub,
                            email: openIdUserInfo.email,
                            nickName: openIdUserInfo.nickname,
                            fullName: openIdUserInfo.fullname
                        }
                    }
                }
                
                let loginIns = new GithubOpenIdLogin();
                module.exports = loginIns.login.bind(loginIns);
                `,
            configPlaceholder: `
                let pe = process.env;
                
                module.exports = {
                    accessKey: pe.QINIU_UPLOAD_ACCESS_KEY,
                    secretKey: pe.QINIU_UPLOAD_SECRET_KEY,
                    bucket: pe.QINIU_UPLOAD_BUCKET,
                    cdnHost: pe.QINIU_UPLOAD_CDN_HOST
                };`
        }
    },
    components: { IInput, IButton, IRow, ICol, ITabs, ITabPane },
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
            let data = {
                config: this.config.filter(item => {
                    return item.value !== '';
                }),
                login: this.login,
                upload: this.upload
            };
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
