import Base from '@/base/base.vue'
export default Base.extend({
    data () {
        return {
            title: 'Welcome to Icon App',
            coverIcons: []
        }
    },
    props: {
        iconRepo: Object
    },
    computed: {
        userInfo () {
            return this.$store.state.webUser
        },
        isOwner () {
            return this.iconRepo.ownerId === this.userInfo.userId
        }
    },
    methods: {

    },
    created () {
        this.coverIcons = this.iconRepo.icons.slice(0, 15)
    }
})
