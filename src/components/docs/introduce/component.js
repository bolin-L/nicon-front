import Base from '@/base/base.vue'
import {
    Collapse,
    Panel
} from 'iview'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            code: 'asdfa'
        }
    },
    computed: {
        currentRouterPath () {
            return this.$route.fullPath
        }
    },
    components: { Collapse, Panel },
    methods: {

    }
})
