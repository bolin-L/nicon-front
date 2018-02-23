<template>
    <div class="validation-box">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "component.scss";
</style>
<script>
    import Component from './component'
    export default Component.extend({
        name: 'validation-box',
        data () {
            return {
                controls: [],
                results: []
            }
        },
        methods: {
            validate () {
                // 清空
                this.results = []
                for (let i = 0; i < this.controls.length; i++) {
                    let conclusion = this.controls[i].validate()
                    if (!conclusion.success) {
                        this.results.push(conclusion);
                    }
                }
                return !this.results.length
            }
        }
    })
</script>
