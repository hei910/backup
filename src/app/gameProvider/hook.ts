import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from '@redux'
import { setIsRequireLoginModalOpened, setIsTransferFailModalOpened } from '@services/modal/action'
import { getGameMinBalance, getGameBalance } from '@services/game/api'
import { transferToThirdPartyWallet } from '@services/transfer/api'
import GameSuppliers, { CN_ONLY_GAME_SUPPLIER } from '@constants/gameSuppliers'
import { getUserAppBalance } from '@services/user/api'
import { useLocation } from 'react-router-dom'
import { getGameTypeByLocationPath, getGameUrl, isSeparatedWallet } from '@utils/game'
import GameTypes from '@constants/gameTypes'
import useTranslation from '@hooks/useTranslation'
import GameContainerModes from '@constants/gameContainerMode'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'
import useGameModals from './useGameModals'

interface GameInfo {
    selectedSupplier: GameSuppliers
    selectedGameId?: string
}

interface enterGameProps {
    supplier?: GameSuppliers
    gameId?: string
    isTry?: boolean
}

export default () => {
    const [gameType, setGameType] = useState('' as GameTypes)
    const [gameUrl, setGameUrl] = useState('')
    const [gameContainerMode, setGameContainerMode] = useState(GameContainerModes.popup)
    const [isGameOpened, setIsGameOpened] = useState(false)
    const [userBalance, setUserBalance] = useState('')
    const [walletBalance, setWalletBalance] = useState('')
    /** internal state, used in gameWrapper / encapsulated game logic */
    const [gameInfo, setGameInfo] = useState<GameInfo>({
        selectedSupplier: '' as GameSuppliers,
    })

    const {
        resetModals,
        closeGameTrialReminder,
        openGameTrialReminder,
        closeBalanceReminder,
        openBalanceReminder,
        closeContactCsModal,
        openContactCsModal,
        closeIPLockModal,
        openIPLockModal,
        closeBalanceTransferModal,
        openBalanceTransferModal,
        closeSuccessTransferModal,
        openSuccessTransferModal,
        errorCode,
        setErrorCode,
        modalControls,
    } = useGameModals()

    const supplierMaintenance = useSupplierMaintenance()

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const userCountry = useSelector((state) => state.user.ipInfo.country)

    const location = useLocation()
    const dispatch = useDispatch()
    const t = useTranslation()

    useEffect(() => {
        setGameType(getGameTypeByLocationPath(location.pathname) || GameTypes.slotmachine)
    }, [location])

    const closeGame = useCallback(() => {
        setIsGameOpened(false)
    }, [setIsGameOpened])

    const gameTitle = useMemo(
        () =>
            gameInfo.selectedSupplier
                ? t(`general.suppliers.${gameType}.${gameInfo.selectedSupplier.toLowerCase()}`)
                : '',
        [gameInfo.selectedSupplier, t, gameType],
    )

    const setLatestGameInfo: (
        supplier?: GameSuppliers,
        gameId?: string,
    ) => [GameSuppliers, string | undefined] = useCallback(
        (supplier, gameId) => {
            const { selectedSupplier, selectedGameId } = gameInfo
            const finalSupplier = supplier || selectedSupplier
            const finalGameId = gameId || selectedGameId
            setGameInfo({
                selectedSupplier: finalSupplier,
                selectedGameId: finalGameId,
            })

            return [finalSupplier, finalGameId]
        },
        [gameInfo],
    )

    const isAllowAccess = useCallback(
        (supplier: GameSuppliers) => {
            if (userCountry !== 'CN' && CN_ONLY_GAME_SUPPLIER.includes(supplier)) {
                openIPLockModal()
                return false
            }
            return true
        },
        [userCountry, openIPLockModal],
    )

    const enterGame = useCallback(
        async (props: enterGameProps = {}) => {
            // async await for IE5-11 for open game issue
            // IE5-11 / QQ / 360 would have rendering error if no async await
            try {
                const { supplier, gameId, isTry } = props
                const { selectedSupplier, selectedGameId } = gameInfo
                const finalSupplier = supplier || selectedSupplier
                const finalGameId = gameId || selectedGameId
                const gameMode = supplierMaintenance[finalSupplier].enterGameMethod
                const url = getGameUrl(gameType, finalSupplier, finalGameId, gameMode, isTry)

                await setGameUrl(url)
                await setGameContainerMode(gameMode)
                await setIsGameOpened(true)
                await resetModals()
            } catch (err) {
                if (err?.errorCode) {
                    setErrorCode(err.errorCode)
                }
                await openContactCsModal()
                await resetModals()
            }
        },
        [gameInfo, supplierMaintenance, gameType, resetModals, setErrorCode, openContactCsModal],
    )

    const startEnterGameFlow = useCallback(
        async (newSupplier?: GameSuppliers, newGameId?: string) => {
            const [supplier, gameId] = setLatestGameInfo(newSupplier, newGameId)

            if (isLoggedIn) {
                const allowAccess = isAllowAccess(supplier)

                if (allowAccess) {
                    const separatedWallet = isSeparatedWallet(supplier)

                    try {
                        if (separatedWallet) {
                            const [userBalance, walletBalance] = await Promise.all([
                                getUserAppBalance(),
                                getGameBalance(supplier),
                            ])
                            setWalletBalance(walletBalance)
                            setUserBalance(userBalance)
                            openBalanceTransferModal()
                        } else {
                            const [minBalance, userBalance] = await Promise.all([
                                getGameMinBalance(gameType, supplier),
                                getUserAppBalance(),
                            ])

                            if (+minBalance > +userBalance) {
                                setUserBalance(userBalance)
                                openBalanceReminder()
                            } else {
                                enterGame({ supplier, gameId })
                            }
                        }
                    } catch (e) {
                        console.error(e)
                        console.warn('Cannot get user balance or deposit reminder (min balance)')
                        if (e?.errorCode) {
                            setErrorCode(e.errorCode)
                        }
                        openContactCsModal()
                    }
                }
            } else {
                dispatch(setIsRequireLoginModalOpened(true))
            }
        },
        [
            setLatestGameInfo,
            isLoggedIn,
            isAllowAccess,
            openBalanceTransferModal,
            gameType,
            openBalanceReminder,
            enterGame,
            openContactCsModal,
            setErrorCode,
            dispatch,
        ],
    )

    const startEnterTrialGameFlow = useCallback(
        (newSupplier?: GameSuppliers, newGameId?: string) => {
            const [supplier] = setLatestGameInfo(newSupplier, newGameId)
            const allowAccess = isAllowAccess(supplier)
            if (allowAccess) {
                openGameTrialReminder()
            }
        },
        [isAllowAccess, setLatestGameInfo, openGameTrialReminder],
    )

    const transferToThirdParty = useCallback(
        async (amount: string | number) => {
            try {
                await transferToThirdPartyWallet(gameInfo.selectedSupplier, +amount)
                openSuccessTransferModal()
                return true
            } catch {
                dispatch(setIsTransferFailModalOpened(true))
                return false
            }
        },
        [dispatch, gameInfo.selectedSupplier, openSuccessTransferModal],
    )

    return {
        startEnterGameFlow,
        startEnterTrialGameFlow,
        gameUrl,
        gameContainerMode,
        enterGame,
        closeGame,
        isGameOpened,
        userBalance,
        walletBalance,
        transferToThirdParty,
        gameTitle,
        // should not be used in page level
        setGameInfo,
        gameInfo,
        // modal controls
        errorCode,
        modalControls,
        closeContactCsModal,
        closeBalanceReminder,
        closeGameTrialReminder,
        closeIPLockModal,
        closeBalanceTransferModal,
        closeSuccessTransferModal,
        openSuccessTransferModal,
    }
}
