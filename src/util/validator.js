/* eslint-disable */
import validatorUtil from './validatorUtil'

export default {
    /**
     * 校验方法
     *
     * @param    {String}             value          需要校验的值
     * @param    {Array}              rules          校验规则对象数组
     * @return   {Object}                            校验结果
     */
    validate: function (value, rules) {
        let conclusion = {
                success: true,
                message: ""
            },
            success = true,
            rule;

        if(!rules || rules.length == 0){
            return conclusion;
        }

        for(let i = 0, len = rules.length; i < len; i++){
            rule = rules[i];

            switch (rule.type){
                case 'is':
                    success = rule.reg.test(value);//个性化的正则表达式校验
                    break;
                case 'isRequired':
                    success = !!validatorUtil.toString(value);
                    break;
                case 'isFilled':
                    success = !!validatorUtil.toString(value).trim();
                    break;
                case 'isEmail':
                    success = validatorUtil.isEmail(value);
                    break;
                case 'isMobilePhone':
                    success = validatorUtil.isMobilePhone(value, 'zh-CN');
                    break;
                case 'isURL':
                    success = validatorUtil.isURL(value);
                    break;
                case 'isNumber':
                    success = validatorUtil.isInt(value, rule);  //同int
                    break;

                case 'isId':
                    success = validatorUtil.isId(value); //isInt 的首位不能为0， isID可以
                    break;
                case 'isInt':
                    success = validatorUtil.isInt(value, rule);
                    break;
                case 'isFloat':
                    success = validatorUtil.isFloat(value, rule);
                    break;
                case 'isSoftDecimal2':
                    success = validatorUtil.isSoftDecimal2(value, rule.min, rule.max);
                    break;
                case 'isLength':
                    success = validatorUtil.isLength(value, rule.min, rule.max);
                    break;
                default:
                    if(!rule.method){
                        conclusion = {
                            success: false,
                            message: "找不到此规则的校验方法"
                        }
                    }else {
                        success = rule.method(val); //个性化函数,校验特定的变量+特定规则
                    }
                    break;
            }
            if(!success || !conclusion.success){
                conclusion.message = rule.message || conclusion.message;
                conclusion.success = false;
                break; // 有错误则跳出
            }
        }

        return conclusion;
    },
    /**
     * 服务器校验错误反馈到 UI
     *
     * @param    {Object}             result                    请求结果
     * @param    {Array}              result.message            校验消息对象数组
     * @param    {Object}             uiIns                     组件对象实例
     * @return   {void}
     */
    feedbackError: function (result={}, uiIns) {
        if (typeof result.message === 'object') {
            for (let field of Object.keys(result.message)) {
                uiIns.$refs[field] && (uiIns.$refs[field].error = result.message[field]);
                uiIns[field + 'Err'] = true;
            }
        } else {
            uiIns.$Modal.error({
                title: '错误提示！',
                content: result.message || '内部错误！'
            });
        }
    }
}
