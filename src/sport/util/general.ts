import { liveVideoSettings } from '@sport/components/liveVideo/config'
import crypto from 'crypto'
import cloneDeep from 'lodash/cloneDeep'
import { IAllBgSrLiveStreamData, SportIconEnum, SportTypeEnum, VendorEnum } from '@services/sportLive/types'
import { SportItem } from '@services/sportMenu/types'
import { sportOddsDomain } from './constant'
import axios from 'axios'

const oddsDomain = { lastUpdate: 0, domain: '' }

export const getDiffMinutes = (d2: Date, d1: Date) => {
    const diff = (d2.getTime() - d1.getTime()) / (1000 * 60)
    return Math.abs(Math.round(diff))
}

export const getIOSVersion = () => {
    let agent = window.navigator.userAgent
    let start = agent.indexOf('OS ')

    if (/iphone|ipod|ipad/.test(agent.toLowerCase()) && start > -1) {
        return window.Number(agent.substr(start + 3, 3).replace('_', '.'))
    } else {
        return 0
    }
}

export const getOddsDomain = async () => {
    // const defaultOddsDomain = store.getState().sportGlobalSetting?.setting?.ODDS_API_DOMAIN ?? ''

    // let oddsHost = domain?.oddsHost?.oddsHostv2 || sportOddsDomain

    let oddsHost = ''

    if (process.env.NODE_ENV === 'development') {
        oddsHost = sportOddsDomain
    } else {
        const shouldOddsDomainUpdate = Date.now() - oddsDomain.lastUpdate > 60 * 1000

        if (shouldOddsDomainUpdate) {
            const { data: domain } = await axios.get('/odds5/oddsHost6?bbfcocfneutfczcbnkvacijizfxg')
            oddsHost = domain?.oddsHost?.oddsHostv2

            if (oddsHost) {
                oddsDomain.domain = oddsHost
                oddsDomain.lastUpdate = Date.now()
            }
        } else {
            oddsHost = oddsDomain.domain
        }
    }

    return `${oddsHost}/api/fn`
}

export const goBackOldVersion = (additionalQuery: string = '') => {
    const loginReferer = getCookieByName('loginReferer')

    if (!loginReferer) {
        return console.log('172015 general.ts no loginReferer is found')
    }

    const result = decodeURIComponent(loginReferer)

    // split the url with ?
    const urlWithoutQuery = result.split('?')[0]
    ;(window as any).location.href = `${urlWithoutQuery}${additionalQuery}`
}

export const randomNumber = (length = 20) => crypto.randomBytes(length).toString('hex')

export const isEmptyObject = (obj?: Object) =>
    !obj ? true : Object.entries(obj).length === 0 && obj.constructor === Object

// eslint-disable-next-line import/no-unused-modules
export const getPosition = (element: any) => {
    let x = 0
    let y = 0

    while (element) {
        x += element.offsetLeft - element.scrollLeft + element.clientLeft
        y += element.offsetTop - element.scrollLeft + element.clientTop
        element = element.offsetParent
    }

    return { x: x, y: y }
}

// eslint-disable-next-line import/no-unused-modules
export function getValueFromObject<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

export const deepCloneObject = (obj: Object): any => cloneDeep(obj)

// eslint-disable-next-line import/no-unused-modules
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getCookieByName = (name: string) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift()
    }
}

export const isLiveMatchExist = (menuData: SportItem) => {
    return Object.entries(menuData).some(([sport, dataInfo]) => {
        return dataInfo.Live > 0
    })
}

export const getDefaultPath = (menu: SportItem) => {
    let selectSportType = ''
    let selectDate = ''

    Object.entries(menu).forEach(([sport, dateInfo]) => {
        if (dateInfo.Live && !selectSportType) {
            selectSportType = sport
            selectDate = 'inplay'
        }
    })

    if (!selectSportType) {
        selectSportType = 'football'
        selectDate = 'today'
    }

    return `/fn/d/sports/${selectDate}/${selectSportType}/am/1`
}

export const showStatPopup = (matchId: string, source: string, sid: '1' | '2' | '3' | '4') => {
    const height = 767
    const width = 1210
    const top = window.top.outerHeight / 2 + window.top.screenY - height / 2
    const left = window.top.outerWidth / 2 + window.top.screenX - width / 2

    window.open(
        `https://s5sir.yonghuai5515.com/v2landing?sid=${sid}&matchid=${matchId}&source=${source}`,
        matchId,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`,
    )
}

export const isUnderIframe = () => {
    return window.location !== window.parent.location
}

// eslint-disable-next-line import/no-unused-modules
export const shouldRenderLiveIcon = (
    source: string,
    matchId: string | number,
    liveData: IAllBgSrLiveStreamData[] | null,
    sportType: SportTypeEnum,
): SportIconEnum => {
    const matchIdBySource = `${source}_${matchId}`
    const singleMatch = liveData && liveData.filter((el) => el.sourceMid === matchIdBySource)[0]

    if (singleMatch) {
        const { animationProviderVendor, videoVendor } = singleMatch
        const vendorMapping = {
            bg: VendorEnum.BG,
            sr: VendorEnum.SR,
        }
        const vendorMapResult = animationProviderVendor && vendorMapping[animationProviderVendor]

        if (videoVendor !== null) {
            return SportIconEnum.LiveIcon
        }

        if (
            vendorMapResult &&
            ((vendorMapResult === VendorEnum.BG && liveVideoSettings[sportType][VendorEnum.BG]) ||
                (vendorMapResult === VendorEnum.SR && liveVideoSettings[sportType][VendorEnum.SR]))
        ) {
            return SportIconEnum.AnimationIcon
        }

        return SportIconEnum.None
    }

    return SportIconEnum.None
}
