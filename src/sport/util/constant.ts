import MobileLeftMenuHomeIcon from '@sport/assets/img/mobile/bn_home.png'
import MobileLeftMenuInplayIcon from '@sport/assets/img/mobile/btn_inplay.png'
import MobileLeftMenuSoonIcon from '@sport/assets/img/mobile/btn_soon.png'
import MobileBaseballMain from '@sport/assets/img/mobile/icon-baseball-main.png'
import MobilePopularMain from '@sport/assets/img/mobile/icon-popular-main.png'
import MobileTennisMain from '@sport/assets/img/mobile/icon-tennis-main.png'
import MobileLeftBaseballIcon from '@sport/assets/img/mobile/icon_baseball.png'
import MobileLeftBasketballIcon from '@sport/assets/img/mobile/icon_basketball.png'
import MobileLeftFootballIcon from '@sport/assets/img/mobile/icon_soccer.png'
import MobileLeftTennisIcon from '@sport/assets/img/mobile/icon_tennis.png'
import {
    MobileMenuBaseballIcon,
    MobileMenuBasketballIcon,
    MobileMenuFootballIcon,
    MobileMenuTennisIcon,
    NavBaseballIcon,
    NavBasketballIcon,
    NavFootballIcon,
    NavTennisIcon,
} from '@sport/components/icons'
import { ApiSportType } from '@services/sportData/types'
import { Language } from '@services/sportGlobal/types'
import { SportTypeEnum } from '@services/sportLive/types'
import { RouteDateType, RouteSportType } from '@services/sportMenu/types'

export interface SportsTypeDetails {
    sportsType: string
    key: RouteSportType
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    subTitles: { market: string; path: string }[]
}

export const sportOddsDomain =
    process.env.NODE_ENV === 'production' ? 'https://tesla20.doc.uatio.com' : 'http://192.168.240.12:30001'

// interface MenuItem {
//     link: string
//     title: string
// }

// const footballMatchStatus = (status: string) => {
//     switch (status) {
//         case 'Q1':
//             return '第一节';
//         case 'Q2':
//             return '第二节';
//         case 'Q3':
//             return '第三节';
//         case 'Q4':
//             return '第四节';
//         case '1H':
//             return '上半场';
//         case '2H':
//             return '下半场';
//         case 'HT':
//             return '半场';
//         case 'OT':
//             return '加时';
//         default:
//             return status;
//     }
// };

// const headerMenuItems: Array<MenuItem> = [
//     {
//         link: '/',
//         title: '体育赛事',
//     },
//     {
//         link: '/',
//         title: '滚球盘',
//     },
//     {
//         link: '/',
//         title: '真人荷官',
//     },
//     {
//         link: '/',
//         title: '彩票PK10',
//     },
//     {
//         link: '/',
//         title: '捕鱼游戏',
//     },
//     {
//         link: '/',
//         title: '老虎机',
//     },
//     {
//         link: '/',
//         title: '优惠',
//     },
//     {
//         link: '/',
//         title: '代理加盟',
//     },
//     {
//         link: '/',
//         title: '手机版',
//     },
// ];

export const SPORT_TYPE_ARRAY: SportsTypeDetails[] = [
    {
        sportsType: 'sports.soccer',
        key: 'football',
        icon: NavFootballIcon,
        subTitles: [
            {
                market: 'menu.markets.soccer.am',
                path: 'am/1',
            },
            {
                market: 'menu.markets.soccer.had',
                path: 'had/1',
            },
            {
                market: 'menu.markets.soccer.oe',
                path: 'oe/1',
            },
            {
                market: 'menu.markets.soccer.tg',
                path: 'tg/1',
            },
            {
                market: 'menu.markets.soccer.htft',
                path: 'htft/1',
            },
            {
                market: 'menu.markets.soccer.cs',
                path: 'cs/1',
            },
            {
                market: 'menu.markets.soccer.or',
                path: 'or/1',
            },
        ],
    },
    {
        sportsType: 'sports.basketball',
        key: 'basketball',
        icon: NavBasketballIcon,
        subTitles: [
            {
                market: 'menu.markets.basketball.am',
                path: 'am/1',
            },
            {
                market: 'menu.markets.basketball.ml',
                path: 'ml/1',
            },
            {
                market: 'menu.markets.basketball.oe',
                path: 'oe/1',
            },
            {
                market: 'menu.markets.basketball.or',
                path: 'or/1',
            },
        ],
    },
    {
        sportsType: 'sports.baseball',
        key: 'baseball',
        icon: NavBaseballIcon,
        subTitles: [
            {
                market: 'menu.markets.baseball.am',
                path: 'am/1',
            },
            {
                market: 'menu.markets.baseball.ml',
                path: 'ml/1',
            },
            {
                market: 'menu.markets.baseball.oe',
                path: 'oe/1',
            },

            {
                market: 'menu.markets.baseball.or',
                path: 'or/1',
            },
        ],
    },
    {
        sportsType: 'sports.tennis',
        key: 'tennis',
        icon: NavTennisIcon,
        subTitles: [
            {
                market: 'menu.markets.tennis.am',
                path: 'am/1',
            },
            {
                market: 'menu.markets.tennis.ml',
                path: 'ml/1',
            },
            {
                market: 'menu.markets.tennis.cs',
                path: 'cs/1',
            },
            {
                market: 'menu.markets.tennis.or',
                path: 'or/1',
            },
        ],
    },
]

export const menuTitles: { name: string; path: RouteDateType }[] = [
    {
        name: 'menu.date.inplay',
        path: 'inplay',
    },
    {
        name: 'menu.date.today',
        path: 'today',
    },
    {
        name: 'menu.date.all',
        path: 'all',
    },
    {
        name: 'menu.date.parlay',
        path: 'parlay',
    },
]

export const sportSId: { [name: string]: string } = {
    football: '1',
    basketball: '2',
    tennis: '3',
    baseball: '4',
}

export const mobileMenuItemList = [
    { title: 'upcoming', number: 4, icon: MobilePopularMain, path: '/sport/upcoming/football' },
    { title: 'tennis', number: 75, icon: MobileTennisMain, path: '/sport/select-competition/all/tennis' },
    { title: 'baseball', number: 0, icon: MobileBaseballMain, path: '/sport/select-competition/all/baseball' },
    // { title: '真人荷官', number: null, icon: MobileLiveCasinoMain, path: '/' },
    // { title: '老虎机', number: null, icon: MobileSlotMachineMain, path: '/' },
    // { title: '彩票', number: null, icon: MobileLotteryMain, path: '/' },
    // { title: '赛果', number: null, icon: MobileResultMain, path: '/' },
    // { title: 'APP下载', number: null, icon: MobileDownloadAppMain, path: '/' },
]

export const mobileLeftMenuItemList = [
    {
        title: 'menu.leftMenu.sportsMain',
        icon: MobileLeftMenuHomeIcon,
        path: '/sport/home',
        type: 'home',
    },
    {
        title: 'menu.leftMenu.inplay',
        icon: MobileLeftMenuInplayIcon,
        path: '/sport/inplay/football',
        type: 'inplay',
    },
    {
        title: 'menu.leftMenu.upcoming',
        icon: null,
        path: '/sport/upcoming/football',
        type: 'upcoming',
    },
    {
        title: 'menu.leftMenu.today',
        icon: MobileLeftMenuSoonIcon,
        path: '/sport/select-competition/today/football',
        type: 'today',
    },

    {
        title: 'menu.leftMenu.all',
        icon: null,
        path: '/sport/select-competition/future/football',
        type: 'future',
    },
    {
        title: 'menu.leftMenu.parlay',
        icon: null,
        path: '/sport/select-competition/parlay/football',
        type: 'parlay',
    },
    {
        title: 'menu.leftMenu.outright',
        icon: null,
        path: '/sport/select-competition/outright/football',
        type: 'outright',
    },
    {
        title: 'sports.soccer',
        icon: MobileLeftFootballIcon,
        path: '/sport/select-competition/all/football',
        type: 'all/football',
    },
    {
        title: 'sports.basketball',
        icon: MobileLeftBasketballIcon,
        path: '/sport/select-competition/all/basketball',
        type: 'all/basketball',
    },
    {
        title: 'sports.tennis',
        icon: MobileLeftTennisIcon,
        path: '/sport/select-competition/all/tennis',
        type: 'all/tennis',
    },
    {
        title: 'sports.baseball',
        icon: MobileLeftBaseballIcon,
        path: '/sport/select-competition/all/baseball',
        type: 'all/baseball',
    },
]

export const sportsMenuLevel1 = [
    { title: 'menu.date.sport', path: '/sport/home', type: 'home' },

    { title: 'menu.date.inplay', path: '/sport/inplay', type: 'inplay' },
    { title: 'menu.date.upcoming', path: '/sport/upcoming', type: 'upcoming' },
    { title: 'menu.date.today', path: '/sport/select-competition/today', type: 'today' },
    { title: 'menu.date.all', path: '/sport/select-competition/future', type: 'future' },
    { title: 'menu.date.parlay', path: '/sport/select-competition/parlay', type: 'parlay' },
    { title: 'menu.date.outright', path: '/sport/select-competition/outright', type: 'outright' },
]

export const sportsMenuLevel2 = [
    { title: 'sports.soccer', icon: MobileMenuFootballIcon, slug: 'football', path: '/sport/football' },
    { title: 'sports.basketball', icon: MobileMenuBasketballIcon, slug: 'basketball', path: '/sport/basketball' },
    { title: 'sports.tennis', icon: MobileMenuTennisIcon, slug: 'tennis', path: '/sport/basketball' },
    { title: 'sports.baseball', icon: MobileMenuBaseballIcon, slug: 'baseball', path: '/sport/baseball' },
    // { title: 'menu.search', icon: MobileMenuSearchIcon, path: '' },
    // { title: '真人荷官', number: null, icon: MobileMenuLiveCasinoIcon, path: '/sport/basketball' },
    // { title: '老虎机', number: null, icon: MobileMenuSlotMachineIcon, path: '/sport/basketball' },
    // { title: '彩票', number: null, icon: MobileMenuLotteryIcon, path: '/sport/basketball' },
    // { title: '赛果', number: null, icon: MobileMenuBasketballIcon, path: '/sport/basketball' },
    // { title: 'APP下载', number: null, icon: MobileMenuDownloadIcon, path: '/sport/basketball' },
]

export const langToISOCode: Record<Language, string> = {
    zh: 'zh-cn',
    zht: 'zh-tw',
    id: 'id',
    en: 'us-en',
}

// interface MenuItems {
//     id: number
//     title: string
//     path: string
//     image: string
//     selectable: boolean
//     style?: { height: string }
//     subTitle?: { title: string; path: string }[]
// }

// export const menuItems: MenuItems[] = [
//     { id: 0, title: '代理加盟', path: '/', image: 'i-join mobile-menu-icon', selectable: false },
//     {
//         id: 1,
//         title: '帮助',
//         path: '/',
//         image: 'i-question-mark mobile-menu-icon',
//         selectable: true,
//         subTitle: [
//             { title: '联系我们', path: '/' },
//             { title: '游戏规则', path: '/' },
//         ],
//     },
//     {
//         id: 2,
//         title: '在线客服',
//         path: '/',
//         image: 'i-customer-service-white mobile-menu-icon',
//         selectable: false,
//     },
// ];

export const useHyphenCtid = [12, 13, 41, 42, 208, 209]
export const useSpMarketCodeCtid = [12, 13, 41, 42, 2, 1, 208, 209]

export const sportTypeMap = {
    football: SportTypeEnum.Football,
    basketball: SportTypeEnum.Basketball,
    tennis: SportTypeEnum.Tennis,
    baseball: SportTypeEnum.Baseball,
}

export const apiSportType: Record<RouteSportType, ApiSportType> = {
    football: 'Soccer',
    basketball: 'Basketball',
    tennis: 'Tennis',
    baseball: 'Baseball',
}

// eslint-disable-next-line
export const betRecordsMenuItems = [
    { title: 'today', t_path: 'betRecord.menu.today', gte: 0, lte: 0 },
    { title: 'yesterday', t_path: 'betRecord.menu.yesterday', gte: 1, lte: 1 },
    { title: '7day', t_path: 'betRecord.menu.last-7-days', gte: 7, lte: 0 },
    { title: '30day', t_path: 'betRecord.menu.last-30-days', gte: 30, lte: 0 },
    { title: 'custom', t_path: 'betRecord.menu.last-custom' },
]
