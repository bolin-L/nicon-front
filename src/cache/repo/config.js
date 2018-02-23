export default {
    'repo-create': {
        url: '/api/repo/add',
        method: 'post'
    },
    'repo-update': {
        url: '/api/repo/:repoId/update',
        method: 'post',
        rest: true
    },
    'repo-list': {
        url: '/api/repo/list/:userId',
        method: 'get',
        rest: true
    },
    'repo-add-icon': {
        url: '/api/repo/add/icon',
        method: 'post'
    },
    'repo-delete-icon': {
        url: '/api/repo/:repoId/:iconId/delete',
        method: 'post',
        rest: true
    },
    'repo-sync': {
        url: '/api/repo/:repoId/sync',
        method: 'post',
        rest: true
    },
    'repo-get': {
        url: '/api/repo/:repoId/get',
        method: 'get',
        rest: true
    },
    'repo-member-add': {
        url: '/api/repo/:repoId/member/add',
        method: 'post',
        rest: true
    },
    'repo-recommend-list': {
        url: '/api/repo/recommend/list',
        method: 'get',
        rest: true
    },
    'repo-recommend-add': {
        url: '/api/repo/recommend/add',
        method: 'post',
        rest: true
    },
    'repo-recommend-delete': {
        url: '/api/repo/recommend/delete',
        method: 'post',
        rest: true
    }
}
