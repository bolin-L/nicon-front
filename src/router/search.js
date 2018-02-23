import Search from '@/modules/search/ui'

export default [
    {
        path: '/search',
        name: 'search',
        component: Search,
        children: [
            {
                path: '/search/:q',
                name: 'searchQ',
                component: Search
            }
        ]
    }
]
