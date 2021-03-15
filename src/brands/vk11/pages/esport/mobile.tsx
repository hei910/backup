import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useEsport from '@pages/esport/hook'
import MainBgImage from '@brand/assets/images/avaia/mobile/bg.jpg'
import BgButton from '@brand/assets/images/avaia/mobile/bg_btn.png'
import CsgoIcon from '@brand/assets/images/avaia/mobile/logo_csgo.png'
import DotaIcon from '@brand/assets/images/avaia/mobile/logo_dota.png'
import LolIcon from '@brand/assets/images/avaia/mobile/logo_lol.png'
import LtIcon from '@brand/assets/images/avaia/mobile/logo_lt.png'
import OwIcon from '@brand/assets/images/avaia/mobile/logo_ow.png'
import PubgIcon from '@brand/assets/images/avaia/mobile/logo_pubg.png'
import { gameList } from '@pages/esport/constants'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import bgImg from '@mixins/backgroundImg'
import { useMemo } from 'react'

const gameMap = [
    { icon: OwIcon, title: gameList.OVERWATCH },
    { icon: LolIcon, title: gameList.LOL },
    { icon: CsgoIcon, title: gameList.CSGO },
    { icon: LtIcon, title: gameList.HOK },
    { icon: DotaIcon, title: gameList.DOTA },
    { icon: PubgIcon, title: gameList.PUBG },
]

const EsportBg = styled.div`
    position: relative;
    width: 100%;
    padding-top: 115.333%;
    ${bgImg(MainBgImage)};
`

const SContent = styled.div`
    background-color: #ffffff;
    width: 100%;
    padding-bottom: 20px;
`
const GameListContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
`
const EachGame = styled.div`
    width: 40%;
    border-radius: 5px;
    margin: 7px 10px 3px 10px;
    color: #646d8e;
    text-align: center;
    padding: 5px;
    font-size: 15px;
    box-shadow: 0 0 7.1px 0.4px #c8c8c8;
    background-color: #ffffff;
`
const LogoContainer = styled.div`
    width: 55px;
    height: 55px;
    margin: 10px auto;
    display: flex;
    align-items: center;

    img {
        width: 55px;
        max-height: 55px;
    }
`

const GameButtonContainer = styled.div`
    margin: 0 auto 20px;
    width: 90%;
    max-width: 600px;
`

const GameButton = styled.div`
    ${bgImg(BgButton, 'cover')};
    color: #fefefe;
    height: 0;
    padding: 9% 0;
    border-radius: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    margin: 0 auto;
`

const EsportPageContainer = styled(PageContainer)`
    padding-bottom: 0;
`

export default () => {
    const t = useTranslation()
    const { onEnterClick } = useEsport()

    const gamelist = useMemo(
        () =>
            gameMap.map((game: any) => (
                <EachGame key={game.title}>
                    <LogoContainer>
                        <img src={game.icon} />
                    </LogoContainer>
                    <div>{t(`esport.${game.title}`)}</div>
                </EachGame>
            )),
        [t],
    )

    return (
        <EsportPageContainer>
            <FullWidthContainer>
                <EsportBg />
                <GameButtonContainer>
                    <GameButton onClick={onEnterClick}>{t('general.components.button.enterGame')}</GameButton>
                </GameButtonContainer>
                <SContent>
                    <GameListContainer>{gamelist}</GameListContainer>
                </SContent>
            </FullWidthContainer>
        </EsportPageContainer>
    )
}
