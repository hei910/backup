import GameSuppliers from '@constants/gameSuppliers'
import GameTypes from '@constants/gameTypes'
import { BetTickets } from '@brand/services/sportBet/types'
import { AppDispatch } from '@redux'
import { setDisplayLoginModal, setDisplayRegisterModal } from '@services/modal/action'
import { fetchUserInfoAction, setUserBalanceAction } from '@services/user/action'

export const appWindow = window as any

export const isInsideIframe = () => {
    return window.parent !== window
}

const v1Path: {
    [k: string]: Record<string, string>
} = {
    mobile: {
        home: '/mobile/main',
        sport: '/mobile/sports/home',
        sportInPlay: '/mobile/sports/football/in-play',
        liveCasino: '/mobile/casino/live',
        lottery: '/mobile/lottery',
        boardGame: '/mobile/board-game',
        slotMachine: '/mobile/casino',
        casinoDt: '/mobile/casinodt',
        casinoMg: '/mobile/casinomg',
        casinoPt: '/mobile/casinopt',
        casinoPg: '/mobile/casinopg',
        casinoCq9: '/mobile/casinocq9',
        casinoJdb: '/mobile/casinojdb',
        fishHunter: '/mobile/fish-hunter',
        agentJoin: '/mobile/agentJoin#agentJoin',
        jetso: '/mobile/jetso',
        friendship: '/mobile/friendship',
        contactCs: '/mobile/contactCs',
        deposit: '/mobile/account/deposit',
        transfer: '/mobile/account/transfer',
        withdraw: '/mobile/account/withdraw',
        downloadApp: '/mobile/downloadApp',
        aboutUs: '/mobile/main#about_us',
        gameRules: '/mobile/rules',
        esport: '/mobile/esport',
        msgCenterNotification: '/mobile/account/messagebox/notifications',
        msgCenterInbox: '/mobile/account/messagebox/inbox',
        transferRecord: '/mobile/account/transaction-record',
    },
    desktop: {
        home: 'btnWelcome',
        sport: 'btnSport',
        sportInPlay: 'btnSport',
        liveCasino: 'btnLiveCasino',
        lottery: 'btnLottery',
        boardGame: 'btnBoardGame',
        casinoDt: 'btnCasinoCombine',
        fishHunter: 'btnFishHunter',
        agentJoin: 'btnAgentJoin',
        jetso: 'btnPromotionVr2',
        contactCs: 'btnContact_us',
        downloadApp: 'btnMobile',
        deposit: 'btnDeposit',
        transfer: 'btnTrans',
        withdraw: 'btnWithdrawVr2',
        esport: 'btnAvia',
        transferRecord: 'btnTransferRecord',
    },
}

const directTo = (pathName: string) => {
    if (isInsideIframe()) {
        process.env.APP_PLATFORM === 'mobile'
            ? appWindow.parent.directTo(v1Path.mobile[pathName])
            : appWindow.parent[v1Path.desktop[pathName]]()
    } else {
        if (pathName === 'home') {
            window.location.href = process.env.APP_PLATFORM === 'mobile' ? '/mobile/main' : '/main.html'
        }
        console.log(`redirect to ${pathName} page`)
    }
}

export const locationTo = (link: string) => {
    if (isInsideIframe()) {
        appWindow.parent.location.href = link
    } else {
        console.log(`location to ${link}`)
    }
}

export const refreshBalance = () => {
    if (isInsideIframe()) {
        console.log('134513 v1Functions.ts trigger v1 balance update')
        appWindow.parent.ReactFunctions.updateBalance()
    } else {
        console.log('no parent is detected')
    }
}

export const showRegister = () => {
    if (isInsideIframe()) {
        window.scrollTo(0, 0)
        appWindow.parent.ReactFunctions.displayRegisterModal()
    } else {
        console.log('showRegister')
    }
}

export const submitBetv2 = (tickets: BetTickets) => {
    return () => appWindow.parent.ReactFunctions.submitBetv2(tickets)
}

export const showDesktopLoginPopup = () => {
    if (isInsideIframe()) {
        appWindow.parent.showLoginWithSetting()
    } else {
        console.log('showDesktopLoginPopup')
    }
}

export const showLoginPopUp = () => {
    if (isInsideIframe()) {
        window.scrollTo(0, 0)
        appWindow.parent.ReactFunctions.displayLoginModal()
    } else {
        console.log('showLoginPopUp')
    }
}

export const hideLoginPopUp = () => {
    if (isInsideIframe()) {
        // TODO: should be valid function
        appWindow.parent.ReactFunctions.hideLoginModal()
    } else {
        console.log('hideLoginPopUp')
    }
}

export const directToHomePage = () => directTo('home')
export const betRecordUi = (path: string) => {
    if (isInsideIframe()) {
        return appWindow.parent.switchBetRecordUi(path)
    }
}

export const directToSourceASportDetail = (matchId: string, isInplay: boolean) => {
    if (isInsideIframe()) {
        appWindow.parent.goToSportDetail(matchId, isInplay)
    } else {
        console.log(`redirect to sport detail`)
    }
}

export const directToSport = () => directTo('sport')
export const directToSportInPlay = () => directTo('sportInPlay')
export const directToLiveCasino = () => directTo('liveCasino')
export const directToLottery = () => directTo('lottery')
export const directToBoardGame = () => directTo('boardGame')
export const directToCasinoDt = () => directTo('casinoDt')
export const directToCasinoMg = () => directTo('casinoMg')
export const directToCasinoPt = () => directTo('casinoPt')
export const directToCasinoPg = () => directTo('casinoPg')
export const directToCasinoCq9 = () => directTo('casinoCq9')
export const directToCasinoJdb = () => directTo('casinoJdb')
export const directToSlotMachine = () => directTo('slotMachine')
export const directToFishHunter = () => directTo('fishHunter')
export const directToAgentJoin = () => directTo('agentJoin')
export const directToJetso = () => directTo('jetso')
export const directToFriendship = () => directTo('friendship')
export const directToContactCs = () => directTo('contactCs')
export const directToMsgCenterNotification = () => directTo('msgCenterNotification')
export const directToMsgCenterInbox = () => directTo('msgCenterInbox')
export const directToMessageBox = () => directTo('messageBox')
export const directToTransferRecord = () => directTo('transferRecord')

export const directFromLinkMap = (key: string) => {
    if (isInsideIframe()) {
        if (process.env.APP_PLATFORM === 'desktop') {
            if (appWindow.parent.linkMap[key]) {
                appWindow.parent.linkMap[key]()
            }
        }
    } else {
        console.log(`redirect from link map ${key}`)
    }
}
export const directToWithdraw = () => {
    if (isInsideIframe()) {
        process.env.APP_PLATFORM === 'mobile'
            ? appWindow.parent.ReactFunctions.btnWithdraw()
            : appWindow.parent[v1Path.desktop.withdraw]()
    } else {
        console.log(`redirect to withdraw page`)
    }
}
export const directToTransfer = () => directTo('transfer')
export const directToDeposit = () => directTo('deposit')
export const directToDownloadApp = () => directTo('downloadApp')
export const directToAboutUs = () => directTo('aboutUs')
export const directToGameRules = () => directTo('gameRules')
export const directToEsport = () => directTo('esport')

export const directToLiveChat = () => {
    if (isInsideIframe()) {
        process.env.APP_PLATFORM === 'mobile'
            ? appWindow.parent.openCustomerService(true)
            : appWindow.parent.openLiveChat()
    } else {
        console.log(`redirect to LiveChat`)
    }
}

export const directToJetsoArticle = (rowId: number, contentPath?: string) => {
    if (isInsideIframe()) {
        process.env.APP_PLATFORM === 'mobile'
            ? appWindow.parent.directTo(`/mobile/jetso/detail/${rowId}`)
            : appWindow.parent.btnPromotionVr2(rowId, contentPath ? 'old' : 'new')
    } else {
        console.log(`redirect to jetso ${rowId}`)
    }
}

export const directToBetHistory = (displayLoginFn: () => void) => {
    if (isInsideIframe()) {
        if (appWindow.parent.isReactLogon) {
            appWindow.parent.directTo('/mobile/account/betting-history/all-bets')
        } else {
            displayLoginFn()
        }
    } else {
        console.log(`redirect to BetHistory`)
    }
}

export const directToUserProfile = (displayLoginFn: () => void) => {
    if (isInsideIframe()) {
        if (appWindow.parent.isReactLogon) {
            appWindow.parent.directTo('/mobile/account/member-info')
        } else {
            displayLoginFn()
        }
    } else {
        console.log(`redirect to UserProfile`)
    }
}

export const openRule = () => {
    if (isInsideIframe()) {
        appWindow.open('/rules.html', '游戏规则', 'height=750,width=1300')
    } else {
        console.log(`open rule`)
    }
}

export const getSystemSetting = () => {
    if (isInsideIframe()) {
        if (appWindow.parent.AccountService) {
            return appWindow.parent.AccountService.getSystemSetting()
        } else {
            return appWindow.parent._AccountService.getSystemSetting()
        }
    } else {
        return null
    }
}

export const openMobileDrawer = () => {
    if (isInsideIframe()) {
        appWindow.parent.ReactFunctions.clickRightMenu()
    } else {
        console.log(`openMobileDrawer`)
    }
}

export const scrollToTop = () => {
    const option = { top: 0, behavior: 'smooth' }
    appWindow.scrollTo(option)
    if (isInsideIframe()) {
        appWindow.parent.scrollTo(option)
    }
}

export const getIsLoginModalOpened = () => {
    if (isInsideIframe()) {
        return appWindow.parent.document.querySelector('.loginPopupWrap') ? true : false
    } else {
        return false
    }
}

export const getIsRegisterModalOpened = () => {
    if (isInsideIframe()) {
        return appWindow.parent.document.querySelector('.register-form-popup-wrapper') ? true : false
    } else {
        return false
    }
}

export const initFunctionForV1 = (dispatch: AppDispatch) => {
    appWindow.setIsLoginModalOpened = (isShow: boolean) => {
        dispatch(setDisplayLoginModal(isShow))
    }
    appWindow.setIsRegisterModalOpened = (isShow: boolean) => {
        dispatch(setDisplayRegisterModal(isShow))
    }
    appWindow.fetchUserInfoAction = () => {
        dispatch(fetchUserInfoAction())
    }
    appWindow.setUserBalanceAction = (balance: string) => {
        dispatch(setUserBalanceAction(balance))
    }
}

export const showV1Loading = () => {
    appWindow.parent.showLoading?.()
}

export const hideV1Loading = () => {
    appWindow.parent.hideLoading?.()
}

export const scrollV1ContainerToTop = () => {
    document.getElementById('layout-container')?.scrollTo({ top: 0, behavior: 'smooth' })
}

export const getSupplierRedirectFunc = (supplier: GameSuppliers, gameType?: GameTypes) => {
    if (gameType === GameTypes.fishhunter) {
        return directToFishHunter
    }

    switch (supplier) {
        case GameSuppliers.ag:
        case GameSuppliers.bg:
            return directToLiveCasino
        case GameSuppliers.nn:
        case GameSuppliers.ky:
            return directToBoardGame
        case GameSuppliers.avia:
            return directToEsport
        case GameSuppliers.sport:
            return directToSport
        case GameSuppliers.loto:
            return directToLottery
        case GameSuppliers.mg:
            return directToCasinoMg
        case GameSuppliers.dt:
            return directToCasinoDt
        case GameSuppliers.pt:
            return directToCasinoPt
        case GameSuppliers.pg:
            return directToCasinoPg
        case GameSuppliers.cq9:
            return directToCasinoCq9
        case GameSuppliers.jdb:
            return directToCasinoJdb
        default:
            console.error('[getSupplierRedirectFunc] Invalid supplier: ', supplier)
            return () => {}
    }
}
