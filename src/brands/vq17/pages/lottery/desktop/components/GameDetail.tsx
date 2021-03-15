import styled from 'styled-components/macro'
import { useSelector } from '@redux'
import LotteryResult, { SGameBall } from '@pages/lottery/desktop/components/LotteryResult'
import { LotoGameListItem } from '@services/game/type'
import { IGameDetail, ICustomizedInterval } from '@pages/lottery/desktop/types'
import textBg from '@brand/assets/images/lottery/desktop/txt_bg.png';
import iconRing from '@brand/assets/images/lottery/desktop/btn_select.png';
import playBtnBg from '@brand/assets/images/lottery/desktop/btn_play.png'
import trialBtnBg from '@brand/assets/images/lottery/desktop/btn_test.png'
import useTranslation from '@hooks/useTranslation'
import { range } from '@components/common/responsive'
import { useCallback } from 'react'

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
    color: #333333;
`
const SIconAndText = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
const SIconWrap = styled.div`
    position: relative;
`
const SIcon = styled.div<{ iconUrl: string }>`
    ${range('width', 112, 132)};
    ${range('height', 112, 132)};
    background: url(${(props) => props.iconUrl})no-repeat center center/contain;
`

const SActiveRing = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    ${range('width', 112, 132)};
    ${range('height', 112, 132)};
    background: url(${iconRing}) no-repeat center center/contain;
`

const STitle = styled.div`
    margin-left: 15px;
    padding-top: 50px;
`

const SChinTitle = styled.div`
    font-size: 64px;
    font-weight: bold;
    color: #febc53;
`

const SBreak = styled.div`
    width: 440px;
    height: 2px;
    background: #ce9842;
    margin: 12px 0;
`

const SEngTitle = styled.div`
    font-family: Helvetica, sans-serif;
    font-size: 28px;
    color: #febc53;
`

const SDescription = styled.div`
    font-size: 14px;
    color: #fefefe;
    margin-top: 12px;
`

const STextBg = styled.div`
    width: 580px;
    height: 173px;
    background: url(${textBg})no-repeat center center/contain;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const SInterval = styled.div`
    font-size: 16px;
    color: #ffffff;
    padding-top: 30px;
    margin-bottom: 12px;

    span {
        color: #ed9322;
    }
`

const SLotteryResult = styled(LotteryResult)`
    padding-left: 50px;
    color: white;

    ${SGameBall} {
        margin-right: 8px;
    }
`

const SBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SBtnPlay = styled.div`
    ${range('width', 228, 268)};
    ${range('height', 74, 87)};
    background: url(${playBtnBg})no-repeat center center/contain;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 5px;
    padding-right: 29px;
`
const SBtnTrial = styled.div`
    ${range('width', 117, 138)};
    ${range('height', 59, 69)};
    background: url(${trialBtnBg})no-repeat center center/contain;
    font-size: 26px;
    color: #ffffff;
    cursor: pointer;
    margin-top: 17px;
    margin-right: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 12px;
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
            <SIconAndText>
                <SIconWrap>
                    <SIcon data-qa={'imgLotteryIcon'} iconUrl={iconUrl}>
                        <SActiveRing></SActiveRing>
                    </SIcon>
                </SIconWrap>
                <STitle data-qa={'txtLotteryTitle'}>
                    <SChinTitle>{name}</SChinTitle>
                    <SBreak />
                    <SEngTitle>{englishName}</SEngTitle>
                    <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SDescription>
                </STitle>
            </SIconAndText>
            <STextBg>
                <SInterval data-qa={'txtLotteryCycle'} dangerouslySetInnerHTML={{
                    __html:
                        interval.isMarkSix ? (
                            t('lottery.lotoInterval.customMarkSixInterval', {
                                customIssue: '<span>' + interval.customIssue + '</span>',
                                markSixMonth: '<span>' + interval.markSixMonth + '</span>',
                                markSixDay: '<span>' + interval.markSixDay + '</span>'
                            })
                        ) :
                            t('lottery.lotoInterval.customInterval', {
                                customIssue: '<span>' + interval.customIssue + '</span>',
                                customInterval: '<span>' + interval.customInterval + '</span>',
                                customTimeUnit: '<span>' + interval.customTimeUnit + '</span>',
                                customTotal: '<span>' + interval.customTotal + '</span>'
                            })


                }}>
                </SInterval>

                <SLotteryResult data-qa={'txtLotteryResult'} lotoResult={gameDetail.drawResult} color={game.type}></SLotteryResult>

            </STextBg>

            <SBtnWrapper>
                {!isLoggedIn && <SBtnTrial data-qa={'btnTrial'} onClick={onTry}>{t('lottery.trial')}</SBtnTrial>}
                <SBtnPlay data-qa={'btnStart'} onClick={onPlay}>{t('lottery.enter')}</SBtnPlay>
            </SBtnWrapper>
        </SGameDetail >
    )
}

export default GameDetail
