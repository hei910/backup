import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import LotteryResult, { SEmptyResultText } from '@pages/lottery/desktop/components/LotteryResult'
import { LotoGameListItem } from '@services/game/type'
import { IGameDetail, ICustomizedInterval } from '@pages/lottery/desktop/types'
import useTranslation from '@hooks/useTranslation'
import headerImg from '@brand/assets/images/lottery/desktop/title-min.png'
import burningBgL from '@brand/assets/images/lottery/desktop/l-box-min.png'
import burningBgS from '@brand/assets/images/lottery/desktop/s-box-min.png'
import insideBoxS from '@brand/assets/images/lottery/desktop/s-inside-box-min.png'
import playBtnBg from '@brand/assets/images/lottery/desktop/L-pay-button-min-min.png'
import trialBtnBg from '@brand/assets/images/lottery/desktop/L-try-button-min-min.png'
import { useCallback } from 'react'
import { range } from '@components/common/responsive'

interface GameDetailProps {
    game: LotoGameListItem
    gameDetail: IGameDetail
    interval: ICustomizedInterval
    onBtnPlayClick: (gameId?: number) => void
    onBtnTryClick: (gameId?: number) => void
}

const SGameDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: ${props => props.theme.colors.gray};
`
const SHeaderImg = styled.div`
    ${range('width', 372, 644)};
    ${range('height', 90, 156)};
    background: url(${headerImg})no-repeat center center/contain;
`

const SBurningBg = styled.div`
    width: 100%;
    padding: 50px 20px;
    display: flex;
    background: url(${burningBgL})no-repeat center center/ 100% 100%;
    flex-direction: column;
    min-width: 650px;

    @media only screen and (max-height: 500px) {
        background: url(${burningBgS})no-repeat center center/ 100% 100%;
    }
`

const SBurningBgWrapper = styled.div`
    width: 493px;
    margin: 0 auto;
`

const SIconAndName = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
`

const SIcon = styled.div<{ icon: string }>`
    ${range('width', 87, 150)};
    ${range('height', 87, 150)};
    ${range('margin-right', 12, 16)};
    flex: 0 0 auto;
    background: url(${(props) => props.icon})no-repeat center center/contain;
    margin-right: 16px;
    margin-left: -10px;
    ${range('margin-top', 0, -50, 700, 900)};

`

const SChinTitle = styled.div`
    ${range('font-size', 45, 53)}
    font-weight: bold;
    letter-spacing: 1.5px;
    color: #ffffff;
`

const SEngTitle = styled.div`
    ${range('font-size', 18, 26)}
    font-weight: bold;
    letter-spacing: 0.26px;
    color: #ffffff;
    margin-top: 15px;
`

const STitle = styled.div`
    ${range('margin-top', 0, -10, 700, 900)};

    @media only screen and (max-height: 500px) {
        & > div {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
        }

        ${SChinTitle} {
            white-space: nowrap;
        }
    }
`

const SIntroduction = styled.div`
    ${range('font-size', 16, 22)}
    ${range('margin-top', 12, 20)};
    ${range('margin-bottom', 5, 20)};
    letter-spacing: 0.22px;
    color: #ffffff;
`

const SIntroductionSmall = styled(SIntroduction)`

    @media only screen and (min-height: 501px) {
        display: none;
    }
`

const SIntroductionBig = styled(SIntroduction)`

    @media only screen and (max-height: 500px) {
        display: none;
    }
`

const SLotoDetail = styled.div`
    width: 100%;
`
const SBg = styled.div`
    background: url(${insideBoxS})no-repeat center center/contain;
    width: 493px;
    height: 115px;
    padding-top: 23px;
    padding-left: 30px;
`
const SInterval = styled.div`
    font-size: 18px;
    color: #ffffff;

    span {
        color: ${props => props.theme.colors.brand};
    }
`

const SLotteryResult = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    color: white;

    ${SEmptyResultText} {
        font-size: 14px;
    }
`

const SBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SBtnPlay = styled.div`
    ${range('width', 135, 276)};
    ${range('height', 55, 96)};
    background: url(${playBtnBg})no-repeat center center/contain;
    cursor: pointer;
`
const SBtnTrial = styled.div`
    ${range('width', 135, 276)};
    ${range('height', 55, 96)};
    background: url(${trialBtnBg})no-repeat center center/contain;
    cursor: pointer;

    @media screen and (max-height: 500px) {
        margin-right: 8px;
    }
`

const GameDetail = ({ onBtnPlayClick, game, gameDetail, interval, onBtnTryClick }: GameDetailProps) => {
    const t = useTranslation()
    const { name, desktopIntroduction, englishName, iconUrl } = game
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onTry = useCallback(() => {
        onBtnTryClick()
    }, [onBtnTryClick])

    const onPlay = useCallback(() => {
        onBtnPlayClick()
    }, [onBtnPlayClick])

    return (
        <SGameDetail>
            <SHeaderImg data-qa={'imgLotteryMainTitle'}></SHeaderImg>
            <SBurningBg>
                <SBurningBgWrapper>
                    <SIconAndName>
                        <SIcon icon={iconUrl}></SIcon>
                        <STitle data-qa={'txtLotteryTitle'}>
                            <div>
                                <SChinTitle>{name}</SChinTitle>
                                <SEngTitle>{englishName}</SEngTitle>
                            </div>
                            <SIntroductionSmall data-qa={'txtLotteryDesc'}>{desktopIntroduction} </SIntroductionSmall>
                        </STitle>
                    </SIconAndName>
                    <SIntroductionBig data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SIntroductionBig>
                    <SLotoDetail>
                        <SBg>
                            <SInterval data-qa={'txtLotteryCycle'} dangerouslySetInnerHTML={{
                                __html:
                                    interval.isMarkSix ? (
                                        t('lottery.lotoInterval.customMarkSixInterval', {
                                            customIssue: '<span>' + interval.customIssue + '</span>',
                                            markSixMonth: interval.markSixMonth,
                                            markSixDay: interval.markSixDay
                                        })
                                    ) :
                                        t('lottery.lotoInterval.customInterval', {
                                            customIssue: '<span>' + interval.customIssue + '</span>',
                                            customInterval: interval.customInterval,
                                            customTimeUnit: interval.customTimeUnit,
                                            customTotal: interval.customTotal,
                                        })


                            }}>
                            </SInterval>
                            <SLotteryResult data-qa={'txtLotteryResult'}>
                                <LotteryResult lotoResult={gameDetail.drawResult} color={game.type}></LotteryResult>
                            </SLotteryResult>


                        </SBg>
                    </SLotoDetail>
                </SBurningBgWrapper>
            </SBurningBg>

            <SBtnWrapper>
                {!isLoggedIn && <SBtnTrial data-qa={'btnTrial'} onClick={onTry}></SBtnTrial>}
                <SBtnPlay data-qa={'btnStart'} onClick={onPlay}></SBtnPlay>
            </SBtnWrapper>
        </SGameDetail >
    )
}

export default GameDetail
