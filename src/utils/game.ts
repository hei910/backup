import GameContainerModes from '@constants/gameContainerMode'
import GameSuppliers, { SEPARATED_WALLET_SUPPLIER } from '@constants/gameSuppliers'
import GameTypes from '@constants/gameTypes'

export const isGamePage = (pageKey: string) => pageKey.toLowerCase() in GameTypes

export const isSeparatedWallet = (supplier: GameSuppliers) => SEPARATED_WALLET_SUPPLIER.includes(supplier)

export const getGameTypeByLocationPath = (path: string) => {
    const gamePageKey = path.replace('/', '').toLocaleLowerCase()
    if (isGamePage(gamePageKey)) {
        return gamePageKey as GameTypes
    }
    return null
}

export const getGameUrl = (
    gameType: string,
    supplier: string,
    gameId: string = '',
    gameMode: GameContainerModes,
    isTry?: boolean,
) => {
    const prefix = isTry ? 'info' : 'player'
    const returnUrl =
        gameMode === GameContainerModes.popup
            ? `${window.location.origin}${process.env.BASE_NAME}/closeGame.html`
            : `${window.location.href}`
    return `${window.location.origin}/${prefix}/game/open?gameType=${gameType}&supplier=${supplier}&gameId=${gameId}&returnUrl=${returnUrl}&platform=${process.env.APP_PLATFORM}`
}
