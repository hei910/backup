import styled from 'styled-components/macro'
import { ISectionProps } from './types'
import GameTypes from '@constants/gameTypes'
import SectionIcons from '@brand/assets/images/home/mobile/section_icons.png'

import imageSprite from '@mixins/imageSprite'

const SectionOrder = [
    GameTypes.sport,
    GameTypes.livecasino,
    GameTypes.esport,
    GameTypes.lottery,
    GameTypes.boardgame,
    GameTypes.slotmachine,
    GameTypes.fishhunter,
]

const StyledSection = styled.div`
    width: 100%;
    padding: 0 18px 24px;
`

const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`

const SectionMainTitle = styled.span`
    ${(props) => props.theme.typography.Body1}
    color: #333333;
    padding-left: 8px;
`

const SectionSubTitle = styled(SectionMainTitle)`
    color: #999999;
`

const SectionIcon = styled.div<{ type: GameTypes }>`
    ${(props) =>
        imageSprite({
            url: SectionIcons,
            width: 19,
            height: 19,
            itemIndex: SectionOrder.indexOf(props.type),
        })}
    width: 19px;
    height: 19px;
`

const Section: React.FC<ISectionProps> = ({ mainTitle, subTitle, sectionRef, children, gameType }) => {
    return (
        <StyledSection ref={sectionRef}>
            <SectionTitle>
                <SectionIcon type={gameType} />
                <SectionMainTitle>{mainTitle}</SectionMainTitle>
                <SectionSubTitle>{subTitle}</SectionSubTitle>
            </SectionTitle>
            {children}
        </StyledSection>
    )
}

export default Section
