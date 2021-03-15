import { createContext } from 'react'
import useGameInit from './hook'
import GameWrapper from '@components/common/gameWrapper'

type GameContextValue = ReturnType<typeof useGameInit>

export const GameContext = createContext<GameContextValue>({} as GameContextValue)

const GameProvider: React.FC<{}> = ({ children }) => {
    const state = useGameInit()

    return (
        <GameContext.Provider value={state}>
            <GameWrapper>{children}</GameWrapper>
        </GameContext.Provider>
    )
}

export default GameProvider
