import { ReactComponent as Analyst2IconSvg } from '@sport/assets/img/icons/svg/icon_analyst2.svg'
import { ReactComponent as Mic2IconSvg } from '@sport/assets/img/icons/svg/icon_mic2.svg'
import { ReactComponent as Score2IconSvg } from '@sport/assets/img/icons/svg/icon_score2.svg'
import { ReactComponent as Team2IconSvg } from '@sport/assets/img/icons/svg/icon_team2.svg'
import { ReactComponent as VsIconSvg } from '@sport/assets/img/icons/svg/icon_vs.svg'
import '@sport/components/liveVideo/sportRadar/index.scss'
import '@sport/components/liveVideo/sportRadar/mobile/index.scss'
import SportRadarContext from '@sport/components/liveVideo/sportRadar/SportRadarContext'
import SwitchNavbar from '@sport/components/liveVideo/switchNavbar'
import { setIsSrNavbarLoaded, toggleIsShownSrTabPopup } from '@sport/hooks/useLiveSportApi/actions'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React, { Dispatch, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { Platform } from '@services/sportGlobal/types'
import { CurrentVendorEnum, SportTypeEnum } from '@services/sportLive/types'

interface IProps {
    matchId: string
    sportType: SportTypeEnum
    widgetLoader: string
    currentVendor: CurrentVendorEnum | null
    switchLiveSport: Dispatch<ActionTypes>
    overlap: boolean
    isShownToggleBar: boolean
    isSrNavbarLoaded: boolean
    isShownSrTabPopup: boolean
}

declare global {
    interface Window {
        SIR: any
    }
}

let lastTabIndex: number = 0
let checkFullyLoadedTimer: ReturnType<typeof setTimeout>
const sportRadarContext: SportRadarContext = new SportRadarContext()

const SportRadar: React.FC<IProps> = ({
    matchId,
    sportType,
    widgetLoader,
    overlap,
    currentVendor,
    isShownToggleBar,
    isShownSrTabPopup,
    isSrNavbarLoaded,
    switchLiveSport,
}) => {
    const [, setIsUpdated] = useState(false)
    const themeName = useSelector((state) => state.sportGlobal.themeName)
    const platform = useSelector((state) => state.sportGlobal.platform)
    const dispatch = useDispatch()

    useEffect(() => {
        sportRadarContext.setContext(sportType)
        setIsUpdated(true)
        appendWidgetLoaderScriptTag(matchId, sportType, widgetLoader, platform, switchLiveSport)
        return () => {
            setIsUpdated(false)
            unmountComponent()
        }
    }, [dispatch, matchId, sportType, widgetLoader, platform, switchLiveSport])

    return (
        <>
            {currentVendor === CurrentVendorEnum.SR && (
                <SwitchNavbar
                    isShownToggleBar={isShownToggleBar}
                    currentVendor={currentVendor}
                    switchLiveSport={switchLiveSport}
                    isSrNavbarLoaded={isSrNavbarLoaded}
                    isShownSrTabPopup={isShownSrTabPopup}
                />
            )}
            <div
                className={`${sportRadarContext.srCssSelector()}
                    ${themeName}
                    ${sportType}
                    ${overlap ? 'overlap' : ''}
                    ${platform === 'mobile' ? 'mobile' : 'desktop'}
                    ${isShownSrTabPopup ? 'show-tab-popup' : ''}`}></div>
        </>
    )
}

function unmountComponent() {
    document.body?.classList.remove('no-scrolling')
    clearTimeOut()
    removeWidgetAndWidgetLoaderScriptTag()
}

function clearTimeOut() {
    clearTimeout(checkFullyLoadedTimer)
}

function removeWidgetAndWidgetLoaderScriptTag() {
    window.SIR && window.SIR('removeWidget', `.${sportRadarContext.srCssSelector()}`)
}

function appendWidgetLoaderScriptTag(
    matchId: string,
    sportType: SportTypeEnum,
    widgetLoader: string,
    platform: Platform,
    dispatchLiveVideoHook: Dispatch<ActionTypes>,
) {
    if (typeof widgetLoader !== 'string') widgetLoader = ''

    const sportRadarScriptTag = document.querySelector(`script[src="${widgetLoader}"]`)

    if (sportRadarScriptTag) {
        initialWidgetLoader(matchId, sportType)
        checkFullyLoaded(sportType, platform, dispatchLiveVideoHook)
        return
    }

    if (widgetLoader) {
        // const self = this;
        const headTag = document.getElementsByTagName('head')[0]
        const scriptTag = document.createElement('script')
        // define script properties
        scriptTag['type'] = 'text/javascript'
        scriptTag['src'] = widgetLoader
        scriptTag.setAttribute('data-sr-language', 'zh')
        scriptTag.setAttribute('data-sr-theme', 'sportradar')
        // append script tag
        headTag.appendChild(scriptTag)

        scriptTag.addEventListener('load', () => {
            initialWidgetLoader(matchId, sportType)
            checkFullyLoaded(sportType, platform, dispatchLiveVideoHook)
        })
        scriptTag.addEventListener('error', (e) => {
            // console.error('%%%% error from appending widget loader script tag to DOM ', e);
        })
    }
}

function initialWidgetLoader(matchId: string, sportType: SportTypeEnum) {
    try {
        if (!window.SIR) return

        const lmtType = sportRadarContext.lmtType()
        const sirSelector = `.${sportRadarContext.srCssSelector()}`
        const tabs = {
            [`${SportTypeEnum.Football}`]: ['statistics', 'commentary', 'head_to_head', 'lineups', 'table'],
            [`${SportTypeEnum.Basketball}`]: ['statistics', 'commentary', 'head_to_head', 'table'],
            [`${SportTypeEnum.Tennis}`]: {
                sportId1: ['statistics', 'head_to_head', 'standings', 'timeline', 'point_by_point'],
            },
        }
        const pitchCustomBgColor = {
            [`${SportTypeEnum.Football}`]: '#047102',
            [`${SportTypeEnum.Basketball}`]: '#aa6a2d',
            [`${SportTypeEnum.Tennis}`]: '#145e93',
        }

        if (sportType === SportTypeEnum.Football || sportType === SportTypeEnum.Basketball) {
            return window.SIR('addWidget', sirSelector, lmtType, {
                language: 'zh',
                matchId,
                pitchCustomBgColor: pitchCustomBgColor[sportType],
                showTabs: tabs[sportType],
                goalBannerImage: '/static/media/sport-radar/logo.svg',
                disableScoreboard: true,
                disableWidgetHeader: true,
                disableMomentum: true,
                disableEventStats: true,
                disableFooterStats: true,
                disableAds: true,
                disableOverlayPanels: true,
            })
        } else if (sportType === SportTypeEnum.Tennis) {
            return window.SIR('addWidget', sirSelector, lmtType, {
                language: 'zh',
                matchId,
                pitchCustomBgColor: pitchCustomBgColor[sportType],
                tabs: tabs[sportType],
                goalBannerImage: '/static/media/sport-radar/logo.svg',
                disableWidgetheader: true,
                scoreboard: 'disable',
                collapseTo: 'disable',
                momentum: 'disable',
                tabsPosition: 'bottom',
                showOdds: false,
                adsFrequency: false,
                layout: 'topdown',
                disableOverlayPanels: true,
            })
        }
    } catch (error) {
        // console.log('%%%% error from updating sport radar');
    }
}

function checkFullyLoaded(sportType: SportTypeEnum, platform: Platform, dispatchLiveVideoHook: Dispatch<ActionTypes>) {
    const defaultInterval = 500
    if (isFullyLoaded()) {
        document.getElementsByClassName('srm-fullyloaded')[0].classList.add('loaded')

        customizeInitial(sportType, platform, dispatchLiveVideoHook)
        dispatchLiveVideoHook(setIsSrNavbarLoaded(true)) // toggle mobile video navbar
    } else {
        checkFullyLoadedTimer = setTimeout(() => {
            checkFullyLoaded(sportType, platform, dispatchLiveVideoHook)
        }, defaultInterval)
    }
}

function isFullyLoaded() {
    const isFootballAndBasketballFullyLoaded =
        document.getElementsByClassName('srm-fullyloaded')[0] &&
        document.getElementsByClassName('sr-tabbedanimnav__wrapper')[0] &&
        document.getElementsByClassName('sr-soccer-lmtcustom__cmp-wrap')[0] &&
        document.getElementsByClassName('sr-soccer-lmtcustom__tab-cont')[0]

    const isTennisFullyLoaded =
        document.getElementsByClassName('srm-fullyloaded')[0] &&
        document.getElementsByClassName('sr-lmt-plus-tabs__wrapper')[0] &&
        document.getElementsByClassName('sr-lmt-plus__comp')[0] &&
        document.getElementsByClassName('sr-lmt-plus__comp-size')[0] &&
        document.getElementsByClassName('sr-lmt')[0]

    return isFootballAndBasketballFullyLoaded || isTennisFullyLoaded
}

function customizeInitial(sportType: SportTypeEnum, platform: Platform, dispatchLiveVideoHook: Dispatch<ActionTypes>) {
    createTabHeader(sportType)
    addTabChangeEvent(sportType, platform)
    addCloseLiveCenterBtn(dispatchLiveVideoHook)
}

function createTabHeader(sportType: SportTypeEnum) {
    const isTagPageHeaderExist = document.getElementById('tabPageHeader')
    if (isTagPageHeaderExist) return

    const defaultHeaderTitle = '数据统计'

    const tabPageHeader = document.createElement('div')
    tabPageHeader.id = 'tabPageHeader'
    tabPageHeader.classList.add('tab-page-header')

    const tabHeaderTitle = document.createElement('div')
    tabHeaderTitle.id = 'tabHeaderTitle'
    tabHeaderTitle.textContent = defaultHeaderTitle

    if (sportType === 'football' || sportType === 'basketball') {
        tabPageHeader.appendChild(tabHeaderTitle)
    }

    const target = sportRadarContext.navBarTabCont()
    target?.parentNode?.insertBefore(tabPageHeader, target)
}

function createCloseButton(dispatchLiveVideoHook: Dispatch<ActionTypes>) {
    const closeBtn = document.createElement('div')

    closeBtn.textContent = '关闭 ✕'
    closeBtn.id = 'closeTabBtn'
    closeBtn.addEventListener('click', () => {
        document.body?.classList.remove('no-scrolling')
        dispatchLiveVideoHook(toggleIsShownSrTabPopup())
    })

    return closeBtn
}

function clearNavButtonActiveClassForLmtSR() {
    const targets = document.querySelectorAll('.nav-tab-is-active')

    if (targets) {
        for (let i = 0; i < targets.length; i++) {
            targets[i].classList.remove('nav-tab-is-active')
        }
    }
}

function addNavBarActiveClass() {
    const target = document.querySelector(sportRadarContext.navBarTabSwitch())

    target?.classList.add('nav-tab-is-active')
}

function addTabChangeEvent(sportType: SportTypeEnum, platform: Platform) {
    const tabs = document.querySelectorAll(sportRadarContext.navBarTabSwitch())

    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i]

        const lmtCustomPressedTabIndex = tab.getAttribute('data')
        const lmtPlusPressedTabIndex = tab.classList[3]?.slice(-1)
        const pressedTabIndex = lmtCustomPressedTabIndex || lmtPlusPressedTabIndex

        ReactDOM.render(renderIconSVG(i), tab)
        i === 0 && addNavBarActiveClass()

        tab.addEventListener('click', () => {
            clearNavButtonActiveClassForLmtSR()
            changeTabHeader(sportType, pressedTabIndex)
            showTab(platform, tab, i)
            showLoadingIcon(platform)
        })
    }
}

function changeTabHeader(sportType: SportTypeEnum, tabIndex: any) {
    const tabHeaderTitle = document.getElementById('tabHeaderTitle')

    if (!tabHeaderTitle) {
        return
    }

    const tabNames = {
        football: ['数据统计', '赛况', '单对单', '阵容', '积分榜'],
        basketball: ['数据统计', '赛况', '单对单', '积分榜'],
        tennis: ['数据统计', '一对一', '排名', '时间线', '点对点'],
        baseball: ['数据统计', '赛况', '单对单', '积分榜'],
    }

    tabHeaderTitle.textContent = tabNames[sportType][tabIndex - 1]
}

function showTab(platform: Platform, tab: Element, index: number) {
    if (index !== lastTabIndex) {
        // const tabContent = sportRadarContext.navBarTabCont();

        /* while (tabContent?.firstChild) {
            tabContent.removeChild(tabContent.firstChild);
        } */
        lastTabIndex = index
    }

    tab.className = sportRadarContext.navBarTabSwitchActive(index)

    const tabWrapper = sportRadarContext.dataSectionWrapper()
    tabWrapper && tabWrapper.classList.remove('hidden')

    document.getElementById('tabPageHeader')?.classList.remove('hidden')

    if (platform === 'mobile') {
        document.body?.classList.add('no-scrolling')
    }
}

function showLoadingIcon(platform: Platform) {
    const srLmtCmpWrap = sportRadarContext.dataSectionWrapper()

    const loadingIcon = document.getElementById('loading-icon')
    if (loadingIcon) return

    // create div element
    const loadingIconDiv = document.createElement('div')
    loadingIconDiv.id = 'loading-icon'
    loadingIconDiv.classList.add(`${platform === 'mobile' ? 'mobile' : 'desktop'}`)
    srLmtCmpWrap?.appendChild(loadingIconDiv)

    // set timeout to remove loading-icon div
    const randomNumber = Math.floor(Math.random() * 4000)
    setTimeout(() => {
        const loadingIconId = document.getElementById('loading-icon')
        if (loadingIconId) {
            srLmtCmpWrap?.removeChild(loadingIconId)
        }
    }, randomNumber)
}

function addCloseLiveCenterBtn(dispatchLiveVideoHook: Dispatch<ActionTypes>) {
    const tabs = document.querySelectorAll(sportRadarContext.navBarTabSwitch())
    const closeLiveCenterTab = document.getElementsByClassName('close-live-center')[0]
    const navBarTabsClass = sportRadarContext
        .navBarTabSwitch()
        .split('.')
        .filter((elem) => elem !== '')
    const classToAdd = ['srt-base-1', 'srt-text-secondary'].concat(navBarTabsClass)

    if (!closeLiveCenterTab && tabs[0]) {
        const newLiveTab = document.createElement('div')
        newLiveTab.classList.add(...classToAdd)
        newLiveTab.appendChild(createCloseButton(dispatchLiveVideoHook))
        tabs[tabs.length - 1].parentNode?.appendChild(newLiveTab)
    } else {
        return
    }
}

function renderIconSVG(index: number) {
    switch (index) {
        case 0:
            return <Analyst2IconSvg className="tab-nav-icon" />
        case 1:
            return <Mic2IconSvg className="tab-nav-icon" />
        case 2:
            return <VsIconSvg className="tab-nav-icon" />
        case 3:
            return <Team2IconSvg className="tab-nav-icon" />
        case 4:
            return <Score2IconSvg className="tab-nav-icon" />
        default:
            return <div></div>
    }
}

export default SportRadar
