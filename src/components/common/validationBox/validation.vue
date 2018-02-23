<style lang="scss">
    @import "component.scss";
</style>
<script>
    import Component from './component'
    import validator from '@/util/validator'
    import validataionBox from './validationBox.vue'
    export default Component.extend({
        name: 'validation',
        template: require('./component.html'),
        data: function () {
            return {
                type: 'warn',
                message: '必填项',
                error: {} // 错误信息更新
            }
        },
        props: ['rules', 'value'],
        created: function () {
            this.addToControl();
            this.$watch('value', (n, o) => {
                this.validate(n, this.rules)
            })
        },
        methods: {
            /**
             * 功能
             *
             * @param    {Variable}         val        watch改变的值
             * @param    {Array}            rules      校验条件数组
             * @return   {Object}
             */
            validate (val, rules) {
                val = val || this.value
                rules = rules || this.rules
                let ret = validator.validate(val, rules)
                if (ret.success) {
                    this.$emit('valid', ret)
                } else {
                    this.$emit('invalid', ret)
                }
                this.error = ret
                return ret
            },
            /**
             * validation组件寻找最近的validationBox组件委托管理
             *
             * @return   {void}
             */
            addToControl () {
                let $parent = this.$parent
                let isGetContainer
                do {
                    while ($parent) {
                        if ($parent instanceof validataionBox) {
                            $parent.controls.push(this)
                            this.$on('destroyed', function () {
                                let index = this.parentContainer.controls.indexOf(this)
                                this.parentContainer.controls.splice(index, 1)
                            });
                            this.parentContainer = $parent
                            isGetContainer = true
                            break
                        } else {
                            $parent = $parent.$parent
                        }
                    }
                    if (isGetContainer) {
                        break
                    }
                } while ($parent)
            }
        }
    })
</script>
