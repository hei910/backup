import { getGameBalance } from '@services/game/api'
import GameSuppliers, { SeparatedWalletSuppliers, SEPARATED_WALLET_SUPPLIER } from '@constants/gameSuppliers'
import { useCallback, useEffect } from 'react'
import { useImmer } from 'use-immer'

type GameBalances = Record<SeparatedWalletSuppliers, string>

export default (allWallets?: boolean) => {
    const [balances, setBalances] = useImmer<GameBalances>({} as GameBalances)

    const setSpecificGameBalance = useCallback(
        async (supplier: SeparatedWalletSuppliers) => {
            try {
                const balance = await getGameBalance(supplier as GameSuppliers)
                setBalances((draft) => {
                    draft[supplier] = balance
                })
            } catch {}
        },
        [setBalances],
    )

    const init = useCallback(async () => {
        if (allWallets) {
            SEPARATED_WALLET_SUPPLIER.forEach((supplier) => {
                setSpecificGameBalance(supplier as SeparatedWalletSuppliers)
            })
        } else {
            setSpecificGameBalance(GameSuppliers.sport)
        }
    }, [allWallets, setSpecificGameBalance])

    const refetchBalances = init

    useEffect(() => {
        init()
    }, [init])

    return { refetchBalances, balances }
}
