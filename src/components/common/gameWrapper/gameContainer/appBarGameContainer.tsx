import styled from 'styled-components/macro'
import { GameContext } from '@app/gameProvider'
import IframeGameContainer from '@components/common/gameContainer/iframeGameContainer'
import AppBar from '@components/mobile/appbar'
import { useContext } from 'react'

const GameAppBar = styled(AppBar)`
    margin: 0;
`

export default () => {
    const { gameTitle, closeGame } = useContext(GameContext)

    return (
        <IframeGameContainer>
            <GameAppBar title={gameTitle} onBackClick={closeGame}/>
        </IframeGameContainer>
    )
}
