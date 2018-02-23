<script>
    import Vue from 'vue'

    export default Vue.extend({
        data: function () {
            return {
            }
        },
        filters: {
            capitalize: function (value) {
                if (!value) return ''
                value = value.toString()
                return value.charAt(0).toUpperCase() + value.slice(1)
            },
            toDate: function (val) {
                val = val || new Date()
                return new Date(val).toLocaleDateString()
            }
        }
    })
</script>
