export default {
    'user-login': {
        url: '/api/user/login',
        method: 'post'
    },
    'user-register': {
        url: '/api/user/register',
        method: 'post'
    },
    'user-cur-get': {
        url: '/api/user/get',
        method: 'get'
    },
    'user-get': {
        url: '/api/user/:userId/get',
        method: 'get',
        rest: true
    },
    'user-logout': {
        url: '/api/user/logout',
        method: 'post'
    }
}
