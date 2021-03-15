import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'

interface IGameGridSectionProps {
    games: IGame[]
}

interface IGame {
    image: string
    text: string
    onClick: () => void
}

const SGameGridSection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    padding: 12px 8px;
`

const SGameItem = styled.div`
    width: 33.3%;
    padding: 0 4px;
    margin: 8px 0;
`

const SGameImage = styled.div<{ src: string }>`
    width: 100%;
    height: 25vw;
    border-radius: 4px 4px 0 0;
    ${(props) => bgImg(props.src)}
`

const SGameText = styled.div`
    padding: 6px 0;
    background-color: ${(props) => props.theme.colors.component.mobile.gameGridSection.bgColor};
    color: ${(props) => props.theme.colors.component.mobile.gameGridSection.color};
    border-radius: 0 0 4px 4px;
    font-size: 13px;
    text-align: center;
`

const GameGridSection: React.FC<IGameGridSectionProps> = ({ games }) => {
    return (
        <SGameGridSection>
            {games.map((game, index) => (
                <SGameItem key={`Game_${index}`} onClick={game.onClick}>
                    <SGameImage src={game.image} />
                    <SGameText>{game.text}</SGameText>
                </SGameItem>
            ))}
        </SGameGridSection>
    )
}

export default GameGridSection
