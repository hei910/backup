import { useContext, useEffect } from 'react'
import { GameContext } from '@app/gameProvider'

export default () => {
    const { isGameOpened, closeGame, gameUrl, gameTitle } = useContext(GameContext)

    useEffect(() => {
        if (isGameOpened) {
            // TODO: use this window to open when v1 fade out
            window.parent.open(gameUrl, gameTitle)
            // turn isGameOpened to false in order to open next new pop up
            closeGame()
        }
    }, [isGameOpened, gameUrl, gameTitle, closeGame])

    return <></>
}
