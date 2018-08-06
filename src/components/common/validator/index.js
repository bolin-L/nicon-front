/* eslint-disable */

import defaultRules from './defaultRules';
import validator from './validator';
import utils from './utils';

class VCheck {
    /**
     * Vue plugin entry method
     *
     * @param  {Function}    Vue                            Vue constructor
     * @param  {Object  }    options                        Global validation config
     * @param  {Array   }    options.defaultRules           Global validation rules
     * @param  {String  }    options.directiveName          User custom directive eg. validation
     * @param  {String  }    options.defaultCheckAttr       The attribute of component instance to validation. default is value
     * @param  {Function}    options.errorHandle            Global error handle function
     * @param  {Function}    options.successHandle          Global success handle function
     * @param  {Object  }    options.eventPatch             Add prefix to all|part of event. eg. on-
     * @param  {Array|String}options.triggerEvent           set default event that component trigger
     * @param  {Object  }    options.checkTypeText          The error text of default validation type
     * @param  {String  }    options.checkContainerRef      check container component's value of ref
     * @param  {String  }    options.eventPatch.prefix      Event prefix
     * @param  {Array   }    options.eventPatch.events      The event need to add event prefix, add to all when undefined
     * @return {void}
     */
    install(Vue, options) {
        this.config = options || {};
        this.defaultRules = Object.assign(defaultRules, this.config.defaultRules);
        this.Vue = Vue;

        Vue.directive(this.config.directiveName || 'check', {
            inserted: this.initCheck.bind(this),
            unbind: this.removeComp.bind(this),
        });
    }

    /**
     * Vue directive inserted hook
     *
     * @param  {Object}    el         The element the directive is bound to. This can be used to directly manipulate the DOM.
     * @param  {Object}    binding    An object containing the properties of expression.
     * @param  {Object}    vnode      The virtual node produced by Vue’s compiler
     * @return  {void}
     */
    async initCheck(el, binding, vnode) {
        const checkDataChoice = {
            string: { type: binding.value },
            array: { rules: binding.value },
            object: binding.value,
        };
        const checkData = checkDataChoice[utils.typeof(binding.value)] || {};
        const options = {
            checkType: checkData.type,
            rules: checkData.rules || [],
            checkAttr: checkData.checkAttr || this.config.defaultCheckAttr || 'value',
            eventType: this.addEventPrefix(checkData.trigger || this.config.triggerEvent || (checkData.isRealTime ? 'change' : 'blur')),
            compIns: this.resolveComponentInstance(el, vnode),
            noGlobalHandler: checkData.noGlobalHandler,
            el,
            checkData,
            validator,
        };

        let value = utils.getValueStepIn(options.checkAttr, options.compIns) || utils.getValueStepIn(options.checkAttr, checkData);

        if (checkData.checkInit) {
            await this.check(value, options);
        }

        options.compIns.$on(options.eventType, async () => {
            // value may be change
            options.compIns.$nextTick(async () => {
                value = utils.getValueStepIn(options.checkAttr, options.compIns) || utils.getValueStepIn(options.checkAttr, checkData);
                await this.check(value, options);
            });
        });

        this.addSelfToContainer(options);
    }

    /**
     * Check value use rules and default rules of checkType
     *
     * @param  {String  }    value                      The value of need to validate
     * @param  {Object  }    options                    Check config
     * @param  {Array   }    options.rules              The rules of check component's value
     * @param  {String  }    options.checkType          The type of the value must to be
     * @param  {Object  }    options.compIns            Component instance
     * @param  {String  }    options.checkAttr          A key of component instance
     * @param  {Boolean }    options.noGlobalHandler     Do not use globalHandler method when validation fail
     * @return {Object}
     */
    async check(value, options) {
        options.rules = (this.defaultRules[options.checkType] || []).concat(options.rules);

        if (validator[options.checkType]) {
            options.rules.unshift({
                type: options.checkType,
                message: ((this.config.checkTypeText || {})[options.checkType] || {}).text || `value must match ${options.checkType}`,
            });
        }

        let conclusion = {
            success: true,
            message: '',
            checkAttr: options.checkAttr,
        };
        let success = true;
        let rule;

        if (options.rules.length === 0) {
            return conclusion;
        }

        for (let i = 0, len = options.rules.length; i < len; i++) {
            rule = options.rules[i] || {};

            if (validator[rule.type]) {
                success = validator[rule.type].call(null, value, rule);
            } else if (rule.method && typeof rule.method === 'function') {
                conclusion = await rule.method.call(null, value, rule, options);

                if (typeof conclusion === 'boolean') {
                    conclusion = {
                        success: conclusion,
                        message: rule.message,
                        checkAttr: options.checkAttr,
                    };
                }
            } else {
                conclusion = {
                    success: false,
                    message: '找不到此规则的校验方法',
                    checkAttr: options.checkAttr,
                };
            }

            if (!success || !conclusion.success) {
                conclusion.message = rule.message || conclusion.message;
                conclusion.success = false;
                break;
            }
        }

        this.resultHandler(conclusion, value, options);

        return conclusion;
    }

    /**
     * Check result handler
     *
     * @param  {Object  }    conclusion                 check result
     * @param  {String  }    value                      The value of need to validate
     * @param  {Object  }    options                    Check config
     * @param  {Array   }    options.rules              The rules of check component's value
     * @param  {String  }    options.checkType          The type of the value must to be
     * @param  {Object  }    options.compIns            Component instance
     * @param  {String  }    options.checkAttr          A key of component instance
     * @param  {Boolean }    options.noGlobalHandler     Do not use globalHandler method when validation fail
     * @return {void}
     */
    resultHandler(conclusion, value, options) {
        const ev = this.addEventPrefix(conclusion.success ? 'valid' : 'invalid');
        const errHandler = this.config.errorHandler;
        const successHandler = this.config.successHandler;

        if (options.compIns) {
            options.compIns.$emit(ev, conclusion);
        }

        if (!conclusion.success && typeof errHandler === 'function' && !options.noGlobalHandler) {
            errHandler.call(this, conclusion, value, options);
        }

        if (conclusion.success && typeof successHandler === 'function' && !options.noGlobalHandler) {
            successHandler.call(this, conclusion, value, options);
        }
    }

    /**
     * Check all component instance which has directive v-check
     *
     * @param  {Object  }    container          The check box which has ref=checkContainer attribute
     * @param  {Boolean }    returnWhenError    Return errors once check fail
     * @param  {Boolean }    noGlobalHandler     Do not use globalHandle method when check fail
     * @return {Array}
     */
    async checkAll(container, returnWhenError, noGlobalHandler) {
        const comps = container.$checkControls || [];
        const errors = [];
        let comp;
        let value;

        for (let i = 0; i < comps.length; i++) {
            comp = comps[i];

            value = utils.getValueStepIn(comp.checkAttr, comp.compIns) || utils.getValueStepIn(comp.checkAttr, comp.checkData);

            const result = await this.check(value, Object.assign(comp, { noGlobalHandler }));

            if (!result.success) {
                errors.push(result);
            }

            if (!result.success && returnWhenError) {
                break;
            }
        }

        return errors.length > 0 ? Promise.reject(errors) : Promise.resolve(true);
    }

    /**
     * Add component instance to check box component instance which has ref=checkContainer attribute
     *
     * @param  {Array   }    options.rules         Check rules
     * @param  {String  }    options.checkType     The type of the value must to be
     * @param  {Object  }    options.compIns       Component instance
     * @param  {String  }    options.checkAttr     A key of component instance
     * @return {void}
     */
    addSelfToContainer(options) {
        let parent = options.compIns.$parent;
        let hasGetContainer;

        do {
            while (parent) {
                if (parent.$refs[this.config.checkContainerRef || 'checkContainer']) {
                    parent.$checkControls = parent.$checkControls || [];
                    parent.$checkControls.push(Object.assign(options, { parent }));

                    parent.$checkAll = this.checkAll.bind(this, parent);
                    parent.$feedbackErrors = this.feedbackErrors.bind(this);
                    options.compIns.$checkParent = parent; // for remove

                    parent.$on('destroyed', this.cleanControls.bind(this, parent));

                    hasGetContainer = true;
                    break;
                } else {
                    parent = parent.$parent;
                }
            }

            if (hasGetContainer) {
                break;
            }
        } while (parent);
    }

    feedbackErrors(error, options, value) {
        this.resultHandler(error, value, options);
    }

    /**
     * clean parent controls
     *
     */
    cleanControls(parent) {
        parent.$checkControls = null;
    }

    /**
     * Get component instance from vnode when in directive hook
     *
     * @param  {Object  }    el         The element the directive is bound to. This can be used to directly manipulate the DOM.
     * @param  {Object  }    vnode      The virtual node produced by Vue’s compiler
     * @return {Object}
     */
    resolveComponentInstance(el, vnode) {
        const instance = vnode.componentInstance;

        return !utils.isNullOrUndefined(instance) ? instance : this.wrapComponentInstance(el, vnode);
    }

    /**
     * wrap el when directive was bind to custom tag and add listeners
     *
     * @param  {Object  }    el         The element the directive is bound to. This can be used to directly manipulate the DOM.
     * @param  {Object  }    vnode      The virtual node produced by Vue’s compiler
     * @return {Object}
     */
    wrapComponentInstance(el, vnode) {
        // for custom input or others htmlElement, add listeners
        const inputEvent = utils.isTextInput(el) ? ['focus', 'input', 'change', 'blur'] : ['change', 'select', 'click'];

        el = this.createVm(el, vnode, inputEvent);

        for (let i = 0; i < inputEvent.length; i++) {
            utils.addEventListener(el, inputEvent[i], () => {
                el.$emit(this.addEventPrefix(inputEvent[i]), {
                    target: el,
                });
            });
        }

        return el;
    }

    /**
     * wrap el when directive was bind to custom tag and add listeners
     *
     * @param  {Object  }    el         The element the directive is bound to. This can be used to directly manipulate the DOM.
     * @param  {Object  }    vnode      The virtual node produced by Vue’s compiler
     * @return {Object}
     */
    createVm(el, vnode) {
        const events = (vnode.data || {}).on || {};

        for (const ev in events) {
            if (events[ev] && !Array.isArray(events[ev])) {
                events[ev] = [events[ev]];
            }
        }

        return Object.assign(el, {
            $on: this.Vue.prototype.$on,
            $emit: this.Vue.prototype.$emit,
            _events: events,
            $parent: vnode.context,
        });
    }

    /**
     * remove component instance when unbind directive from check container
     *
     * @param  {Object  }    el         The element the directive is bound to. This can be used to directly manipulate the DOM.
     * @param  {Object  }    binding    An object containing the properties of expression.
     * @param  {Object  }    vnode      The virtual node produced by Vue’s compiler
     * @return {Object  }
     */
    removeComp(el, binding, vnode) {
        const compIns = this.resolveComponentInstance(el, vnode);
        const controls = (compIns.$checkParent || {}).$checkControls || [];
        const index = controls.indexOf(compIns);

        controls.splice(index, 1);
    }

    /**
     * Add prefix to event
     *
     * @param  {String|Array  }   ev    The event need to add prefix
     * @return {String|Array  }
     */
    addEventPrefix(ev) {
        if (!this.config.eventPatch) {
            return ev;
        }

        let evArr = Array.isArray(ev) ? ev : [ev];

        evArr = evArr.map(e => {
            if (this.config.eventPatch.events) {
                return validator.isIn(e, this.config.eventPatch.events) ? this.config.eventPatch.prefix + e : e;
            }

            return this.config.eventPatch.prefix + e;
        });

        return typeof ev === 'string' ? evArr[0] : evArr;
    }
}

export default new VCheck();
