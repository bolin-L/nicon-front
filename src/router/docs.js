import Docs from '@/modules/docs/ui'
import DocsIntroduce from '@/components/docs/introduce/ui'
import DocsTrouble from '@/components/docs/trouble/ui'
import DocsIconMaker from '@/components/docs/iconMaker/ui'

export default [
    {
        path: '/docs',
        name: 'docs',
        component: Docs,
        children: [
            {
                path: '/docs/introduce',
                name: 'docsIntroduce',
                component: DocsIntroduce
            },
            {
                path: '/docs/trouble',
                name: 'docsTrouble',
                component: DocsTrouble
            },
            {
                path: '/docs/iconMaker',
                name: 'docsIconMaker',
                component: DocsIconMaker
            }
        ]
    }
]
