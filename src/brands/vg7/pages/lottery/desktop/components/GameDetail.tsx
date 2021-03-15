import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { LotoGameListItem } from '@brand/services/game/type'
import { IFullInterval, IGameDetail } from '@pages/lottery/desktop/types'
import { px } from '@components/common/responsive'
import LotteryResult from './LotteryResult'

import { useCallback } from 'react'

const SGameDetailWrapper = styled.div<{ isLoggedIn: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: ${props => props.isLoggedIn ? 'center' : 'flex-end'};
    margin-bottom: ${px(90)};
    width: 1000px;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-height: 600px) {
        margin-bottom: 8px;
    }
`

const SGameDetailLeft = styled.div<{ isLoggedIn: boolean }>`
    min-width: 60%;
    margin: ${props => props.isLoggedIn ? 'auto' : '0'};
`

const SGameDetailRight = styled.div`
    min-width: 40%;
`

const SGameInfo = styled.div`
    display: block;
`

const SGameTitle = styled.div`
    display: flex;
    color: ${props => props.theme.colors.primary};
    text-shadow: 2px 4px 1px rgba(0, 0, 0, 0.2);
    align-items: center;
    font-size: 88px;
`

const SEngTitle = styled.div`
    color: #df6900;
    font-size: 16px;
`

const SDescription = styled.div`
    color: #df6900;
    font-size: 16px;
    margin: 12px 0;

    @media screen and (max-height: 600px) {
        margin-bottom: 4px;
    }
`

const SLotteryResult = styled(LotteryResult)`
    color: black;
    margin-top: 18px;
`
const SBtnTrial = styled.div`
    font-size: 26px;
    color: #fff;
    background: linear-gradient(to bottom, #d2f8a9, #63be00 6%, #63be00 93%, #4c8b07);
    display: flex;
    width: 250px;
    height: 72px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;

    @media screen and (max-height: 600px) {
        margin-top: 16px;
        width: 200px;
        height: 52px;
    }
`

const SBtnStart = styled.div`
    font-size: 26px;
    color: white;
    background: linear-gradient(to bottom, #ffd29f, #fd9229 6%, #ff840c 93%, #ba5805);
    display: flex;
    width: 250px;
    height: 72px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    cursor: pointer;

    @media screen and (max-height: 600px) {
        font-size: 26px;
        margin-top: 8px;
        width: 200px;
        height: 52px;
    }
`

const SInterval = styled.div`
    font-size: 16px;
    margin-bottom: 8px;

    @media screen and (max-height: 600px) {
        margin-bottom: 4px;
    }
`

interface IGameItemProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail | null
    interval?: IFullInterval
    onBtnTryClick: (gameId: number) => void
    onBtnPlayClick: (gameId: number) => void
}

export default ({ game, gameDetail, interval, onBtnTryClick, onBtnPlayClick }: IGameItemProps) => {
    const t = useTranslation()
    const { englishName, code, name, desktopIntroduction } = game
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onTry = useCallback(() => {
        onBtnTryClick(code)
    }, [onBtnTryClick, code])

    const onPlay = useCallback(() => {
        onBtnPlayClick(code)
    }, [onBtnPlayClick, code])

    return (
        <SGameDetailWrapper isLoggedIn={isLoggedIn}>
            <SGameDetailLeft isLoggedIn={isLoggedIn}>
                <SGameTitle data-qa={'txtLotteryTitle'}>{name}</SGameTitle>
                {!isLoggedIn && (
                    <SBtnTrial data-qa={'btnTrial'} onClick={onTry}>
                        {t('lottery.desktop.trial')}{' >'}
                    </SBtnTrial>
                )}
            </SGameDetailLeft>

            <SGameDetailRight>
                <SGameInfo>
                    <SEngTitle>{englishName}</SEngTitle>
                    <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SDescription>
                    <SInterval data-qa={'txtLotteryCycle'}>{interval && `${interval.issueString} ${interval.issueString ? ',' : ''} ${interval.intervalString}`}</SInterval>
                    {gameDetail &&
                        <SLotteryResult
                            data-qa={'txtLotteryResult'}
                            lotoResult={gameDetail.drawResult}
                            color={game.type}
                        />}
                </SGameInfo>
                <SBtnStart data-qa={'btnStart'} onClick={onPlay}>
                    {t('lottery.enter')}{' >'}
                </SBtnStart>
            </SGameDetailRight>
        </SGameDetailWrapper>
    )
}
