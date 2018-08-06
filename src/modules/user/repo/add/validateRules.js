let validator = {
    repoName: [
        {
            type: 'isRequired',
            message: '请填写仓库名称'
        }
    ],
    iconPrefix: [
        {
            type: 'isRequired',
            message: '请填写字体图标类型前缀'
        },
        {
            type: 'is',
            reg: /^[a-zA-Z_-]+$/,
            message: '请填写正确格式的字体图标类型前缀'
        }
    ],
    repoDescription: [
        {
            message: '描述不能超过300字',
            options: {
                min: 0,
                max: 300
            },
            method: function (value, rule, options) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve({
                            success: options.validator.isCnLength(value, rule),
                            message: rule.message
                        });
                    }, 100);
                })
            }
        }
    ]
}

export default validator
