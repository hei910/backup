import { lazy } from 'react'

export default {
    about: {
        path: '/about',
        hideSubheader: true,
        hideFooter: true,
        component: lazy(() => import(`@pages/about/mobile`)),
    },
    home: {
        path: '/',
        component: lazy(() => import(`@brand/pages/home/mobile`)),
    },
    maintenance: {
        path: '/maintenance',
        component: lazy(() => import(`@brand/pages/maintenance/mobile`)),
    },
    gameRules: {
        path: '/gameRules',
        params: [':tab1?'],
        hideSubheader: true,
        component: lazy(() => import(`@brand/pages/gameRules/mobile`)),
    },
    contactUs: {
        path: '/contactUs',
        hideSubheader: true,
        component: lazy(() => import(`@brand/pages/contactUs/mobile`)),
    },
    downloadAppTutorial: {
        path: '/downloadAppTutorial',
        hideHeader: true,
        hideFooter: true,
        component: lazy(() => import(`@brand/pages/downloadAppTutorial`)),
    },
    downloadApp: {
        path: '/downloadApp',
        component: lazy(() => import(`@brand/pages/downloadApp/mobile`)),
    },
    tutorIos: {
        path: '/tutorIos',
        component: lazy(() => import(`@brand/pages/tutorIos/mobile`)),
    },
    betRecord: {
        path: '/betRecord',
        hideSubheader: true,
        component: lazy(() => import(`@pages/betRecord/mobile`)),
    },
    esport: {
        path: '/esport',
        component: lazy(() => import(`@brand/pages/esport/mobile`)),
        isMaintainable: true,
    },
    slotMachine: {
        path: '/slotMachine',
        params: [':supplier?'],
        component: lazy(() => import(`@brand/pages/slotMachine/mobile`)),
        isMaintainable: true,
    },
    lottery: {
        path: '/lottery',
        component: lazy(() => import(`@brand/pages/lottery/mobile`)),
        isMaintainable: true,
    },
    liveCasino: {
        path: '/liveCasino',
        component: lazy(() => import(`@brand/pages/liveCasino/mobile`)),
        isMaintainable: true,
    },
    boardGame: {
        path: '/boardGame',
        component: lazy(() => import(`@brand/pages/boardGame/mobile`)),
        isMaintainable: true,
    },
    transfer: {
        path: '/transfer',
        component: lazy(() => import('@pages/transfer/mobile')),
        hideSubheader: true,
    },
    sport: {
        path: '/sport',
        component: lazy(() => import(`@sport/container/mobile`)),
        allowSubRoute: true,
    },
}
