import useTranslation from '@hooks/useTranslation'
import { useCallback, useState } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
import useCopyRight from '@hooks/useCopyRight'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import GameItem from './components/GameItem'

import img_bg from '@brand/assets/images/lottery/desktop/bg.jpg'
import img_title from '@brand/assets/images/lottery/desktop/title.png'
import img_btnStart from '@brand/assets/images/lottery/desktop/start.png'
import img_btnStart_hover from '@brand/assets/images/lottery/desktop/start-o.png'
import img_btnTrial from '@brand/assets/images/lottery/desktop/btn-trial.png'
import img_bgGameItemBar from '@brand/assets/images/lottery/desktop/game-item-bar.png'
import img_card1 from '@brand/assets/images/lottery/desktop/card-88-race.png'
import img_card2 from '@brand/assets/images/lottery/desktop/card-happy-pk10.png'
// import img_card3 from '@brand/assets/images/lottery/desktop/card-mark6.png'
import img_card3 from '@brand/assets/images/lottery/desktop/card-speed-pk10.png'
import img_card4 from '@brand/assets/images/lottery/desktop/card-speed-times.png'
import img_card5 from '@brand/assets/images/lottery/desktop/card-venice-rowing.png'
import { AbRWrapper, px, fs, range } from '@components/common/responsive'

const SLottery = styled(AbRWrapper)`
    color: #eee;
    height: 100vh;
    padding: 0 0 34px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: url(${img_bg}) no-repeat center center/cover;
    overflow-x: auto;
`
const SWrapper = styled.main`
    width: auto;
    height: auto;
    padding: ${px(24, 0)};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1 0 auto;
`

const SFooter = styled.footer`
    line-height: 1;
    color: ${props => props.theme.colors.gray};
    padding: ${px(9, 0)};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
        ${fs(14)};
    }
`

const STitle = styled.div`
    width: ${px(486)};
    height: ${px(120)};
    margin: ${px(20, 'auto')};
    background: center center / contain no-repeat url(${img_title});

    @media only screen and (max-height: 600px) {
        display: none;
    }
`

const SContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: ${px(0, 30)};

    &:before,
    &:after {
        content: '';
        width: 50%;
        height: ${px(100)};
        position: absolute;
        bottom: 0;
        background: center center no-repeat url(${img_bgGameItemBar});
    }

    &:before {
        right: 50%;
        background-position: left 100%;
    }

    &:after {
        left: 50%;
        background-position: right 100%;
    }
`
const SGameItem = styled(GameItem)`
    ${range('width', 76, 88)};
    position: relative;
    z-index: 1;
`

const STrialBtn = styled.div`
    width: ${px(150)};
    height: ${px(150)};
    margin: ${px(0, 12)};
    background: center center / contain no-repeat url(${img_btnTrial});
    position: relative;
    cursor: pointer;
    z-index: 1;
    transition: 0.25s ease-in-out transform;

    &:hover {
        transform: scale(1.2);
    }
`

const SFeaturedContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SFGameItem = styled.div`
    width: ${px(224)};
    margin: ${px(0, 7)};
    cursor: pointer;
    transition: 0.25s ease-in-out transform;

    &[data-size='1'] {
        transform: scale(0.9);
        filter: blur(1px) brightness(75%);
    }

    &[data-size='0'] {
        transform: scale(0.8);
        filter: blur(1px) brightness(75%);
    }
`

const SFGameCard = styled.div<{ idx: number }>`
    height: ${px(383)};
    position: relative;

    & > div {
        width: 143.3%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: center center / contain no-repeat url(${(props) => featuredGameCardImgs[props.idx]});
    }
`

const SFBtnStart = styled.div`
    color: #e4c380;
    height: ${px(54)};
    background: center center / contain no-repeat url(${img_btnStart});
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #3f3626;
        background-image: url(${img_btnStart_hover});
    }

    span {
        font-size: ${px(22)};
    }
`

const featuredGamesMap = [
    260, // 88赛马
    390, // 快乐赛车
    240, // 极速赛车
    250, // 极速时时彩
    210, // 威尼斯赛艇
]
const featuredGameCardImgs = [img_card1, img_card2, img_card3, img_card4, img_card5]

const getCardState = (activeIdx: number | null, idx: number) => {
    return !activeIdx || activeIdx === idx ? 2 : activeIdx - 1 === idx || activeIdx + 1 === idx ? 1 : 0
}

export default () => {
    const t = useTranslation()
    const copyRight = useCopyRight()

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const { onBtnTryClick, gameList, onBtnPlayClick } = useDesktopLottery()

    const [activeIdx, setActiveIdx] = useState(0)

    const onTry = useCallback(() => {
        onBtnTryClick()
    }, [onBtnTryClick])

    const getFeaturedGameList = () => {
        return gameList.filter((game) => featuredGamesMap.indexOf(game.code) !== -1)
    }

    const renderFeaturedGameList = () => {
        return getFeaturedGameList().map((game, idx) => (
            <SFGameItem
                key={game.code}
                onClick={() => onBtnPlayClick(game.code)}
                onMouseEnter={() => setActiveIdx(idx + 1)}
                data-size={getCardState(activeIdx, idx + 1)}
                data-qa={`ctnrGameItem${idx}`}
            >
                <SFGameCard idx={idx} data-qa={`imgGameItem1${idx}`}>
                    <div></div>
                </SFGameCard>
                <SFBtnStart data-qa={`btnStartGameItem${idx}`}>
                    <span>{t('lottery.enter')}</span>
                </SFBtnStart>
            </SFGameItem>
        ))
    }
    const renderGameList = () => {
        return gameList.map((game, idx) => {
            const atMiddle = idx === Math.round(gameList.length / 2 - 1)
            return (
                <>
                    <SGameItem key={game.code} game={game} gameIndex={idx + 1} handleClick={() => onBtnPlayClick(game.code)} />
                    {atMiddle && !isLoggedIn && <STrialBtn data-qa={'btnTrial'} key={'trial'} onClick={onTry} />}
                </>
            )
        })
    }
    return (
        <GameWrapper>
            <SLottery params={{ maxVh: 900 }}>
                <SWrapper>
                    <STitle />
                    <SFeaturedContent onMouseLeave={() => setActiveIdx(0)}>{renderFeaturedGameList()}</SFeaturedContent>
                </SWrapper>
                {gameList.length > 1 && <SContent>{renderGameList()}</SContent>}
                <SFooter>
                    <span data-qa={'txtFooterCopyRight'}>{copyRight}</span>
                </SFooter>
            </SLottery>
        </GameWrapper>
    )
}
