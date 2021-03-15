import { GameContext } from '@app/gameProvider'
import GameSuppliers from '@constants/gameSuppliers'
import { useContext, useEffect } from 'react'

export default (defaultSupplier: GameSuppliers) => {
    const { startEnterGameFlow, startEnterTrialGameFlow, setGameInfo } = useContext(GameContext)

    useEffect(() => {
        setGameInfo?.({
            selectedSupplier: defaultSupplier,
        })
    }, [defaultSupplier, setGameInfo])

    return {
        startEnterGameFlow,
        startEnterTrialGameFlow,
    }
}
