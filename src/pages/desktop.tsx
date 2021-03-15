import { lazy } from 'react'

export default {
    about: {
        path: '/about',
        params: [':tab1?'],
        component: lazy(() => import(`@brand/pages/about/desktop`)),
    },
    home: {
        path: '/',
        component: lazy(() => import(`@brand/pages/home/desktop`)),
    },
    maintenance: {
        path: '/maintenance',
        component: lazy(() => import(`@brand/pages/maintenance/desktop`)),
    },
    downloadApp: {
        path: '/downloadApp',
        component: lazy(() => import(`@brand/pages/downloadApp/desktop`)),
    },
    contactUs: {
        path: '/contactUs',
        component: lazy(() => import(`@brand/pages/contactUs/desktop`)),
    },
    betRecord: {
        path: '/betRecord',
        params: [':section?'],
        component: lazy(() => import(`@brand/pages/betRecord/desktop`)),
    },
    esport: {
        path: '/esport',
        component: lazy(() => import(`@brand/pages/esport/desktop`)),
        isMaintainable: true,
    },
    slotMachine: {
        path: '/slotMachine',
        params: [':supplier?'],
        component: lazy(() => import(`@brand/pages/slotMachine/desktop`)),
        isMaintainable: true,
    },
    lottery: {
        path: '/lottery',
        component: lazy(() => import(`@brand/pages/lottery/desktop`)),
        isMaintainable: true,
    },
    liveCasino: {
        path: '/liveCasino',
        component: lazy(() => import(`@brand/pages/liveCasino/desktop`)),
        isMaintainable: true,
    },
    boardGame: {
        path: '/boardGame',
        component: lazy(() => import(`@brand/pages/boardGame/desktop`)),
        isMaintainable: true,
    },
    transfer: {
        path: '/transfer',
        component: lazy(() => import(`./transfer/desktop`)),
    },
    sportMaintenance: {
        path: '/sportMaintenance',
        component: lazy(() => import(`@brand/pages/sportMaintenance/desktop`)),
    },
}
