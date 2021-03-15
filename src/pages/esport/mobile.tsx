import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import MainBgImage from '@brand/assets/images/avaia/mobile/bg.jpg'
import CsgoIcon from '@brand/assets/images/avaia/mobile/logo_csgo.png'
import DotaIcon from '@brand/assets/images/avaia/mobile/logo_dota.png'
import LolIcon from '@brand/assets/images/avaia/mobile/logo_lol.png'
import LtIcon from '@brand/assets/images/avaia/mobile/logo_lt.png'
import OwIcon from '@brand/assets/images/avaia/mobile/logo_ow.png'
import PubgIcon from '@brand/assets/images/avaia/mobile/logo_pubg.png'
import { gameList } from '@pages/esport/constants'
import Appbar from '@components/mobile/appbar'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import bgImg from '@mixins/backgroundImg'
import useEsport from './hook'

interface IProps {
    showAppBar?: boolean
}

const gameMap = [
    { icon: OwIcon, title: gameList.OVERWATCH },
    { icon: LolIcon, title: gameList.LOL },
    { icon: CsgoIcon, title: gameList.CSGO },
    { icon: LtIcon, title: gameList.HOK },
    { icon: DotaIcon, title: gameList.DOTA },
    { icon: PubgIcon, title: gameList.PUBG },
]

const UpperContent = styled.div`
    position: relative;
    width: 100%;
    height: 566px;
    ${bgImg(MainBgImage)}
`

const LowerContent = styled.div`
    background-color: #021123;
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
    border: solid 2px #5a83bd;
    border-radius: 5px;
    margin: 0px 10px 10px 10px;
    color: #6aa0ff;
    text-align: center;
    padding: 5px;
    font-size: 15px;
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

const GameButton = styled.div`
    color: #6365d5;
    width: 80%;
    bottom: 5%;
    border-radius: 55px;
    box-shadow: 0 0 1.2px 1.8px #6365d5, inset 0px -1px 0.3px 0.8px #818fe3, inset 0px 2px 0 0 #bacef0;
    background-color: #ffffff;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 10%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
`

const EsportPageContainer = styled(PageContainer)`
    padding-bottom: 0;
`
const Esport: React.FC<IProps> = ({ showAppBar }) => {
    const t = useTranslation()
    const { onEnterClick } = useEsport()

    return (
        <EsportPageContainer>
            {showAppBar && <Appbar isBackToHome backText={t('general.suppliers.esport.avia')} />}
            <FullWidthContainer>
                <UpperContent>
                    <GameButton onClick={onEnterClick}>进入游戏</GameButton>
                </UpperContent>
                <LowerContent>
                    <GameListContainer>
                        {gameMap.map((game: any) => (
                            <EachGame key={game.title}>
                                <LogoContainer>
                                    <img src={game.icon} />
                                </LogoContainer>
                                <div>{t(`esport.${game.title}`)}</div>
                            </EachGame>
                        ))}
                    </GameListContainer>
                </LowerContent>
            </FullWidthContainer>
        </EsportPageContainer>
    )
}

export default Esport
