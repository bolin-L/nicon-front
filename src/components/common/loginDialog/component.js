import Base from '@/base/base.vue'
import LoginForm from '../loginForm/ui.vue'
import RegisterForm from '../registerForm/ui.vue'
import { Modal } from 'iview'
import { mapState } from 'vuex'
export default Base.extend({
    data () {
        return {
            footerHide: true
        }
    },
    components: { LoginForm, Modal, RegisterForm },
    computed: {
        ...mapState([
            'showLoginModal',
            'loginDialogType'
        ]),
        showModal: {
            get: function () {
                return this.showLoginModal
            },
            set: function (v) {
                this.$store.commit('showLoginModal', v)
            }
        }
    },
    methods: {
        changeLoginType (type) {
            this.$store.commit('loginDialogType', type)
        }
    }
})
