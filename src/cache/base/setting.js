// 后端返回数据格式定义
// 后端操作成功
// {
//     code: 0,
//     result: true | Array | Object | ...
//     message: ""
// }

// 后端操作失败
// {
//     code: 0,
//     result: false | null
//     message: "后端返回的错误信息，由前端上层toast或弹框显示或input框报错"
// }

// 后端操作通用提示
// {
//     code: -5,
//     result: null
//     message: "后端返回的错误信息，统一toast处理"
// }

// 后端操作通用提示
// {
//     code: -10,
//     result: null
//     message: "后端返回的错误信息，统一弹框处理"
// }

export default {
    // 服务器状态码
    httpStatus: {
        CODE_OK: [200, 201, 202, 203, 204, 205, 206], // 成功
        CODE_WARM: [100, 101], // 警告
        CODE_ERROR: [500, 501, 502, 503, 504, 505], // 内部错误
        CODE_NO_AUTH: [401], // 未登录
        CODE_NO_PRIVILEGE: [403] // 无权限
    },
    // 客户端专题码
    clientCode: {
        CODE_OK: 0, // 成功 业务层处理
        CODE_WARM: -5, // 错误 全局toast提示
        CODE_ERROR: -10, // 错误 全局弹框报错
        CODE_NO_AUTH: -30, // 未登录 全局弹登陆框或跳转登陆页
        CODE_NO_PRIVILEGE: -50 // 无权限 跳转无权限页
    }
}
