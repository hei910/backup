// import { useCallback } from "react";
import styled from 'styled-components/macro'
import LotteryResult from '@pages/lottery/desktop/components/LotteryResult'
import moneyIcon from '@brand/assets/images/lottery/desktop/money.png'
import { LotoGameListItem } from '@services/game/type'
import { IGameDetail, IFullInterval } from '@pages/lottery/desktop/types'
import React, { useCallback } from 'react'
import useTranslation from '@hooks/useTranslation'

interface GameDetailProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail | null
    interval?: IFullInterval
    onBtnPlayClick: (gameId?: number) => void
}

const SGameDetail = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 30px;

`

const STitle = styled.div`
    font-size: 58px;
    line-height: 1;
    margin-bottom: 12px;
`

const SEngTitle = styled.span`
    font-size: 26px;
    padding: 0 16px;
`

const SDescription = styled.div`
    font-size: 18px;
    margin-bottom: 24px;
    max-width: 100%;
`

const SInterval = styled.div`
    font-size: 16px;
    margin-bottom: 16px;
`

const SLottoeryResult = styled.div`
    width: 100%;
    height: 40px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
`

const SBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const SBtnPlay = styled.button`
    font-size: 20px;
    width: 188px;
    height: 52px;
    border-radius: 8px;
    color: white;
    background: ${(props) => props.theme.colors.brand};
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

`

const SMoneyIcon = styled.div`
    width: 32px;
    height: 32px;
    background: url(${moneyIcon}) no-repeat center center/contain;
    margin-right: 12px;
`

const SIsNew = styled.span`
    width: 35px;
    height: 28px;
    background: linear-gradient(to bottom, #fc0000, #7d0101);
    border-radius: 6px;
    color: white;
    font-size: 20px;
    line-height: 28px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`

const GameDetail = ({ onBtnPlayClick, game, gameDetail, interval }: GameDetailProps) => {
    const t = useTranslation()

    const { name, desktopIntroduction, englishName, isNew } = game

    const onPlay = useCallback(() => {
        onBtnPlayClick()
    }, [onBtnPlayClick])

    return (
        <SGameDetail>
            <STitle data-qa={'txtLotteryTitle'}>
                {name}
                <SEngTitle>{englishName}</SEngTitle>
                {isNew && <SIsNew>{t('lottery.latest')}</SIsNew>}
            </STitle>

            <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction} </SDescription>

            {gameDetail && (
                <React.Fragment>
                    <SInterval data-qa={'txtLotteryCycle'}>{interval && `${interval.issueString} | ${interval.intervalString}`}</SInterval>

                    <SLottoeryResult data-qa={'txtLotteryResult'}>
                        <LotteryResult lotoResult={gameDetail.drawResult} color={game.type}></LotteryResult>
                    </SLottoeryResult>
                </React.Fragment>
            )}

            <SBtnWrapper>
                <SBtnPlay onClick={onPlay} data-qa={'btnStart'}>
                    <SMoneyIcon></SMoneyIcon>
                    {t('lottery.enter')}
                </SBtnPlay>
            </SBtnWrapper>
        </SGameDetail>
    )
}

export default GameDetail
