export default {
    'icon-add': {
        url: '/api/icon/add',
        method: 'post'
    },
    'icon-delete': {
        url: '/api/icon/delete/:iconId',
        method: 'post',
        rest: true
    },
    'icon-list': {
        url: '/api/icon/list/:userId',
        method: 'get',
        rest: true
    },
    'icon-download': {
        url: '/api/icon/download/:iconId',
        method: 'get',
        rest: true,
        ajax: false,
        target: '_self'
    },
    'icon-draft-add': {
        url: '/api/icon/draft/add',
        method: 'post'
    },
    'icon-draft-collect': {
        url: '/api/icon/draft/collect',
        method: 'post'
    },
    'icon-draft-delete': {
        url: '/api/icon/draft/delete',
        method: 'post'
    },
    'icon-draft-update': {
        url: '/api/icon/draft/update',
        method: 'post'
    },
    'icon-draft-download': {
        url: '/api/icon/draft/download/:iconId',
        method: 'get',
        rest: true,
        ajax: false,
        target: '_self'
    },
    'icon-draft-list': {
        url: '/api/icon/draft/list',
        method: 'get'
    },
    'icon-draft-to-icon': {
        url: '/api/icon/draft/2icon',
        method: 'post'
    }
}
