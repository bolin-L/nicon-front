import Base from '@/base/base.vue'
import {
    Input as IInput,
    Button as IButton
} from 'iview'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            isSearching: false,
            value: ''
        }
    },
    props: {
        initValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '搜索全部图标'
        }
    },
    components: { IInput, IButton },
    watch: {
        value: function (val, oldVal) {
            if (val !== oldVal) {
                this.isSearching = true
            }
        }
    },
    methods: {
        doSearch () {
            // forbidden search when init
            if (!this.isSearching) {
                return
            }
            this.isSearching = false
            this.$emit('search', this.value)
        }
    },
    created: function () {
        this.value = this.initValue
    }
})
