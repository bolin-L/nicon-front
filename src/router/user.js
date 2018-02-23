// 个人主页相关
import userPage from '@/modules/user/ui'
import userRepoModule from '@/modules/user/repo/ui'
import userRepoListModule from '@/modules/user/repo/list/ui'
import userRepoAddModule from '@/modules/user/repo/add/ui'
import userRepoDetailModule from '@/modules/user/repo/detail/ui'

import userIconModule from '@/modules/user/icon/ui'
import userIconListModule from '@/modules/user/icon/list/ui'
import userIconAddModule from '@/modules/user/icon/add/ui'

export default [
    {
        path: '/user/:userId',
        name: 'userPage',
        component: userPage,
        children: [
            // 字体图标库
            {
                path: '/user/:userId/repo',
                name: 'userRepoModule',
                component: userRepoModule,
                children: [
                    {
                        path: '/user/:userId/repo/list',
                        name: 'userRepoListModule',
                        component: userRepoListModule
                    },
                    {
                        path: '/user/repo/add',
                        name: 'userRepoAddModule',
                        component: userRepoAddModule
                    },
                    {
                        path: '/user/:userId/repo/:repoId/edit',
                        name: 'userRepoEditModule',
                        component: userRepoAddModule
                    },
                    {
                        path: '/user/:userId/repo/:repoId',
                        name: 'userRepoDetailModule',
                        component: userRepoDetailModule
                    }
                ]
            },
            // 字体图标
            {
                path: '/user/:userId/icon',
                name: 'userIconModule',
                component: userIconModule,
                children: [
                    {
                        path: '/user/:userId/icon/list',
                        name: 'userIconListModule',
                        component: userIconListModule
                    },
                    {
                        path: '/user/:userId/icon/add',
                        name: 'userIconAddModule',
                        component: userIconAddModule
                    },
                    {
                        path: '/user/:userId/icon/add/:repoId',
                        name: 'userIconAdd2RepoModule',
                        component: userIconAddModule
                    }
                ]
            }
        ]
    }
]
