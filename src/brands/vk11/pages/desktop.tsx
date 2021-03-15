import { lazy } from 'react'

export default {
    downloadApp: {
        path: '/',
        component: lazy(() => import(`@brand/pages/downloadApp/desktop`)),
    },
}
