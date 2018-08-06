let validator = {
    userName: [
        {
            type: 'isRequired',
            message: '请填写手机号码'
        },
        {
            type: 'isMobilePhone',
            message: '请填写正确的手机号码'
        }
    ],
    password: [
        {
            type: 'isFilled',
            message: '请填写密码'
        }
    ],
    rePassword: [
        {
            type: 'isFilled',
            message: '请确认密码'
        },
        {
            message: '两次输入密码不一致',
            method: function (value, rule, options) {
                return value === options.compIns.$checkParent.password;
            }
        }
    ]
}

export default validator
