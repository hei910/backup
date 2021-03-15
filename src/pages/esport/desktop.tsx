// import useThirdPartyGame from '@hooks/useThirdPartyGame'
import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import MainBgImage from '@brand/assets/images/avaia/desktop/bg_b.jpg'
import GameStartButton from '@brand/assets/images/avaia/desktop/btn_game.png'
import CsgoIcon from '@brand/assets/images/avaia/mobile/logo_csgo.png'
import DotaIcon from '@brand/assets/images/avaia/mobile/logo_dota.png'
import LolIcon from '@brand/assets/images/avaia/mobile/logo_lol.png'
import LtIcon from '@brand/assets/images/avaia/mobile/logo_lt.png'
import OwIcon from '@brand/assets/images/avaia/mobile/logo_ow.png'
import PubgIcon from '@brand/assets/images/avaia/mobile/logo_pubg.png'
import LStripe from '@brand/assets/images/avaia/desktop/bg_stripe_01.png'
import TStripe from '@brand/assets/images/avaia/desktop/bg_stripe_02.png'
import BStripe from '@brand/assets/images/avaia/desktop/bg_stripe_03.png'
import CharacterImage from '@brand/assets/images/avaia/desktop/ch_title.png'
import BgPlusPattern from '@brand/assets/images/avaia/desktop/bg_pattern.png'
import { gameList } from '@pages/esport/constants'

import bgImg from '@mixins/backgroundImg'
import imageSprite from '@mixins/imageSprite'
import useEsport from './hook'

const gameMap = [
    { icon: OwIcon, title: gameList.OVERWATCH },
    { icon: LolIcon, title: gameList.LOL },
    { icon: CsgoIcon, title: gameList.CSGO },
    { icon: LtIcon, title: gameList.HOK },
    { icon: DotaIcon, title: gameList.DOTA },
    { icon: PubgIcon, title: gameList.PUBG },
]

const OuterContainer = styled.div`
    height: 100%;
    width: 100%;
    ${bgImg(MainBgImage, 'cover')}
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const BgOverLay = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
`
const BgPattern = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(${BgPlusPattern});
    position: absolute;
    opacity: 0.42;
    top: 0;
    left: 0;
`

const LeftStrip = styled.div`
    background-image: url(${LStripe});
    position: absolute;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    top: 0;
    bottom: 0;
    left: 0;
`

const GameButton = styled.div`
    width: 359px;
    height: 121px;
    position: absolute;
    top: 67%;
    left: 0;
    right: 0;
    margin: 0 auto;
    cursor: pointer;
    ${(props) =>
        imageSprite({
            url: GameStartButton,
            width: 359,
            height: 121,
            itemIndex: 0,
            indexMap: {
                default: 1,
                active: 0,
            },
        })};
`

const MainContent = styled.div`
    ${bgImg(CharacterImage, 'contain')}
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
    max-width: 1500px;
`
const TopStrip = styled.div`
    background-image: url(${TStripe});
    position: absolute;
    width: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    right: 0;
    top: 0;
    bottom: 0;
`

const BottomStrip = styled.div`
    ${bgImg(BStripe)}
    position: absolute;
    width: 100%;
    height: 20%;
    bottom: 0;
    z-index: 1;
    pointer-events: none;
    right: 0;
`

const ContentContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 14%;
    z-index: 2;
`
const LeftContainer = styled(ContentContainer)`
    left: 5%;
`

const RightContainer = styled(ContentContainer)`
    right: 5%;
`

const EachGame = styled.div`
    border: solid 2px #5a83bd;
    height: 125px;
    width: 111px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #6aa0ff;
    border-radius: 3px;
    text-align: center;
    margin: 0 10px;
`

const GameTitle = styled.div`
    padding-bottom: 10px;
    font-size: 14px;
`

const IconContainer = styled.div`
    height: 61px;
    margin: 15px 0px;

    img {
        width: auto;
        height: 100%;
    }
`

const CopyRightContainer = styled.div`
    position: absolute;
    bottom: 11px;
    color: #ffffff;
    z-index: 3;
    font-size: 12px;
    left: 0;
    right: 0;
    text-align: center;
`

export default () => {
    const t = useTranslation()
    const { onEnterClick, copyRight } = useEsport()

    return (
        <OuterContainer>
            <BgOverLay />
            <BgPattern />
            <TopStrip />
            <LeftStrip />
            <BottomStrip />
            <MainContent>
                <GameButton onClick={onEnterClick} data-qa="btnPlayAvia" />
                <LeftContainer>
                    {gameMap.map((game, index) => {
                        if (index < 3) {
                            return (
                                <EachGame key={`${game.title}-desktop`}>
                                    <IconContainer>
                                        <img src={game.icon} />
                                    </IconContainer>
                                    <GameTitle>{t(`esport.${game.title}`)}</GameTitle>
                                </EachGame>
                            )
                        }
                        return <></>
                    })}
                </LeftContainer>
                <RightContainer>
                    {gameMap.map((game, index) => {
                        if (index > 2) {
                            return (
                                <EachGame key={`${game.title}-desktop`}>
                                    <IconContainer>
                                        <img src={game.icon} />
                                    </IconContainer>
                                    <GameTitle>{t(`esport.${game.title}`)}</GameTitle>
                                </EachGame>
                            )
                        }
                        return <></>
                    })}
                </RightContainer>
            </MainContent>
            <CopyRightContainer>{copyRight}</CopyRightContainer>
        </OuterContainer>
    )
}
