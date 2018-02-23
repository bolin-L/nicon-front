<style lang="scss">
    @import "component.scss";
</style>
<script>
    import Component from './component'
    export default Component.extend({
        name: 'user-module',
        template: require('./component.html')
    })
</script>
