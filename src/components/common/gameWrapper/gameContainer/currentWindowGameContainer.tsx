import { useContext, useEffect } from 'react'
import { GameContext } from '@app/gameProvider'

export default () => {
    const { isGameOpened, gameUrl, closeGame } = useContext(GameContext)

    useEffect(() => {
        if (isGameOpened) {
            // const targetWindow = window.parent || window
            closeGame()
            // window.location.href = gameUrl
            window.open(gameUrl, '_self')
        }
    }, [isGameOpened, gameUrl, closeGame])

    return <></>
}
