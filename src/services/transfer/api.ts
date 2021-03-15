import call from '@utils/api'
import GameSuppliers from '@constants/gameSuppliers'
import { GameBalanceRecoverRes } from './type'

export const transferToThirdPartyWallet = (to: GameSuppliers, amount?: number) => {
    return transferBetweenWallets(GameSuppliers.sport, to, amount)
}

export const transferBetweenWallets = (from: GameSuppliers, to: GameSuppliers, amount?: number) => {
    return call('POST', `player/game/transfer3rdParty?from=${from}&to=${to}&amount=${amount || ''}`)
}

export const transferAllToSportWallet = () => {
    return call<GameBalanceRecoverRes>('POST', '/player/v2/gameBalanceRecover').then((res) => res.failSuppliers)
}
