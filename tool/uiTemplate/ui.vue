<style lang="scss">
    @import "component.scss";
</style>
<script>
    import Component from './component'
    export default Component.extend({
        name: '{{pageName}}-{{ uiName }}',
        template: require('./component.html')
    })
</script>
