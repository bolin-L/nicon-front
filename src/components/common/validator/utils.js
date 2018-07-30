/* eslint-disable */
import validator from 'validator';

export default {
    isNullOrUndefined(value) {
        return value === null || value === undefined;
    },

    addEventListener(el, eventName, cb) {
        if (Array.isArray(eventName)) {
            for(let i = 0; i < eventName.length; i++) {
                el.addEventListener(eventName[i], cb, false);
            }
        } else {
            el.addEventListener(eventName, cb, false);
        }
    },

    isTextInput(el) {
        return validator.isIn(el.type, ['text', 'password', 'search', 'email', 'tel', 'url', 'textarea']);
    },

    isCheckboxOrRadioInput(el) {
        return validator.isIn(el.type, ['radio', 'checkbox']);
    },

    typeof(value) {
        const type = Object.prototype.toString.call(value);

        return type.slice(8, -1).toLowerCase();
    },

    getValueStepIn(attr, obj) {
        const dotReg = /[^.\[\]]+/g;
        const attrSteps = (attr || '').match(dotReg) || [];
        let tmp = obj;
        let i = 0;

        while (tmp && i < attrSteps.length) {
            tmp = tmp[attrSteps[i]];
            i++;
        }

        return tmp;
    }
}

