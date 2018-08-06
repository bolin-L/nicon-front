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
            userNameErr: '',
            passwordErr: '',
            rules: validatorRules
        }
    },
    components: { IInput, IButton, IRow, ICol },
    methods: {
        submit () {
            this.$checkAll().then(() => {
                this.cache.userLogin({
                    data: {
                        userName: this.userName,
                        password: md5(this.password)
                    },
                    onload: this.loginSuccess.bind(this)
                })
            }).catch(errors => {
                console.log(errors)
            })
        },
        loginSuccess (result) {
            // 登录成功
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
