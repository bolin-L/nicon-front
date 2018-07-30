/* eslint-disable */
import validator from 'validator';

const CHINESE_REG = /^[\u4e00-\u9fa5]{0,}$/;
const CHINESE_COUNT_REG = /[\u4e00-\u9fa5]/g;
const QQ_REG = /[1-9][0-9]{4,}/;
const ID_CARD_REG = /^\d{15}$|\d{17}[Xx]$|\d{18}$/;
// Password (start with character, the length between 6 and 18, just contain character、number、underline)
const BASE_PASSWORD_REG = /^[a-zA-Z]\w{5,17}$/;
// Complex password (must be compose of character、number、UpperCase, can not container special character, the length between 8 and 18
const SAFE_PASSWORD_REG = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;

export default Object.assign({}, validator, {
    is(value, rule) {
        return rule.reg.test(value);
    },
    isRequired(value = '') {
        return value.length > 0;
    },
    isFilled(value = '', rule) {
        return validator.trim(value, rule.chars).length > 0;
    },
    isChinese(value) {
        return CHINESE_REG.test(value);
    },
    isCnLength(value = '', rule) {
        // chinese word length is 2
        const cns = (value || '').match(CHINESE_COUNT_REG) || [];

        return validator.isLength(value + cns.join(''), rule.options);
    },
    isIdCard(value) {
        return ID_CARD_REG.test(value);
    },
    isQQ(value) {
        return QQ_REG.test(value);
    },
    isBasePassword(value) {
        return BASE_PASSWORD_REG.test(value);
    },
    isSafePassword(value) {
        return SAFE_PASSWORD_REG.test(value);
    },
    contains(value, rule) {
        return validator.contains(value, rule.seed || '');
    },
    equals(value, rule) {
        return validator.equals(value, rule.comparison || '');
    },
    isAfter(value, rule) {
        return validator.isAfter(value, rule.now);
    },
    isBefore(value, rule) {
        return validator.isBefore(value, rule.now);
    },
    isAlpha(value, rule) {
        return validator.isAlpha(value, rule.locale);
    },
    isAlphanumeric(value, rule) {
        return validator.isAlphanumeric(value, rule.locale);
    },
    isByteLength(value, rule) {
        return validator.isByteLength(value, rule.options);
    },
    isCurrency(value, rule) {
        return validator.isCurrency(value, rule.options);
    },
    isDecimal(value, rule) {
        return validator.isDecimal(value, rule.options);
    },
    isDivisibleBy(value, rule) {
        return validator.isDivisibleBy(value, rule.number || 1);
    },
    isEmail(value, rule) {
        return validator.isEmail(value, rule.options);
    },
    isFQDN(value, rule) {
        return validator.isFQDN(value, rule.options);
    },
    isFloat(value, rule) {
        return validator.isFloat(value, rule.options);
    },
    isHash(value, rule) {
        return validator.isHash(value, rule.algorithm || 'md5');
    },
    isIP(value, rule) {
        return validator.isIP(value, rule.version);
    },
    isISBN(value, rule) {
        return validator.isISBN(value, rule.version);
    },
    isISSN(value, rule) {
        return validator.isISSN(value, rule.options);
    },
    isIn(value, rule) {
        return validator.isIn(value, rule.values || []);
    },
    isInt(value, rule) {
        return validator.isInt(value, rule.options);
    },
    isLength(value, rule) {
        return validator.isLength(value, rule.options);
    },
    isMobilePhone(value, rule) {
        return validator.isMobilePhone(value, rule.locale || 'zh-CN', rule.options);
    },
    isPostalCode(value, rule) {
        return validator.isPostalCode(value, rule.locale || 'zh-CN');
    },
    isURL(value, rule) {
        return validator.isURL(value, rule.options);
    },
    isUUID(value, rule) {
        return validator.isUUID(value, rule.version);
    },
    isWhitelisted(value, rule) {
        return validator.isWhitelisted(value, rule.chars);
    },
    matches(value, rule) {
        return validator.matches(value, rule.pattern || rule.reg || '', rule.modifiers);
    },
});
