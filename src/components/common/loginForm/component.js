import Base from '@/base/base.vue'
import validation from '@/components/common/validationBox/validation'
import validationBox from '@/components/common/validationBox/validationBox'
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
    components: { IInput, IButton, IRow, ICol, validation, validationBox },
    methods: {
        submit () {
            if (!this.$refs.validationBox.validate()) {
                return
            }
            this.cache.userLogin({
                data: {
                    userName: this.userName,
                    password: md5(this.password)
                },
                onload: this.loginSuccess.bind(this)
            })
        },
        loginSuccess (result) {
            // 登录成功
            if (result.result) {
                window.webUser = result.result
                this.$store.commit('showLoginModal', false)
                this.$store.commit('webUser', result.result)
            } else {
                // 登录失败，显示登录错误信息
                if (typeof result.message === 'object') {
                    for (let field of Object.keys(result.message)) {
                        this.$refs[field] && (this.$refs[field].error = result.message[field]);
                        this[field + 'Err'] = true;
                    }
                }
            }
        }
    },
    created () {
        this.cache = new LoginCache()
    }
})
