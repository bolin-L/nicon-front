import Base from '@/base/base.vue'
import validatorRules from './validateRules'
import LoginCache from '@/cache/user/cache'
import md5 from 'blueimp-md5'
import {
    Input as IInput,
    Button as IButton,
    Row as IRow,
    Col as ICol
} from 'iview'

export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            userName: '',
            password: '',
            rePassword: '',
            rules: validatorRules
        }
    },
    components: { IInput, IButton, IRow, ICol },
    methods: {
        submit () {
            this.$checkAll().then(() => {
                this.cache.userRegister({
                    data: {
                        userName: this.userName,
                        password: md5(this.password),
                        rePassword: md5(this.rePassword)
                    },
                    onload: this.registerSuccess.bind(this)
                })
            }).catch(result => {
                for (let attr in result.message) {
                    if (result.message.hasOwnProperty(attr)) {
                        this.$feedbackErrors(result.message[attr], {
                            compIns: this.$refs[attr]
                        })
                    }
                }
            })
        },
        registerSuccess (result) {
            // 注册成功
            if (result.result) {
                window.webUser = result.result
                this.$store.commit('showLoginModal', false)
                this.$store.commit('webUser', result.result)
            } else {
                for (let attr in result.message) {
                    if (result.message.hasOwnProperty(attr)) {
                        this.$feedbackErrors(result.message[attr], {
                            compIns: this.$refs[attr]
                        })
                    }
                }
            }
        }
    },
    created () {
        this.cache = new LoginCache()
    }
})
