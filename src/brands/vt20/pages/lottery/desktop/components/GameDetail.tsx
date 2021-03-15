import styled from 'styled-components/macro'
import LotteryResult, { SGameBall } from '@pages/lottery/desktop/components/LotteryResult'

import { useSelector } from '@redux'
import useTranslation from '@hooks/useTranslation'
import { LotoGameListItem } from '@brand/services/game/type'
import * as brandColorCodes from '../constants/lotoResultColorCodes'
import moneyIcon from '@brand/assets/images/lottery/desktop/money.png'
import bgImg from '@mixins/backgroundImg'

import { ICustomizedInterval, IGameDetail } from '@pages/lottery/desktop/types'

import { range } from '@components/common/responsive'
import { useCallback } from 'react'

const yellow = '#efdd21'

const SGameDetailWrapper = styled.div`
    width: 1000px;
    margin: 0 auto;
    position: relative;
`

const SHeader = styled.div`
    display: flex;
    align-items: flex-end;
`

const SContentWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    ${range('margin-top', 12, 20)};
    ${range('margin-bottom', 20, 40)};
    align-items: flex-end;
`

const SGameResult = styled.div`
    display: block;
`

const SGameTitle = styled.div`
    display: block;
`

const SGameIcon = styled.div<{ src: string }>`
    ${range('width', 90, 120)}
    ${range('height', 90, 120)}
    margin-right: 20px;
    ${(props) => bgImg(props.src, 'cover')};
`

const SChiTitle = styled.div`
    ${range('font-size', 45, 60)}
    /* font-weight: 600; */
    display: flex;
    color: ${yellow};
    align-items: flex-end;
`

const SEngTitle = styled.div`
    ${range('font-size', 29, 40)}
    /* font-weight: 600; */
    text-transform: uppercase;
    color: #fff;
    margin-left: 8px;
`

const SDescription = styled.div`
    font-size: 20px;
    /* font-weight: 600; */
    color: #e6e6e6;
    ${range('margin-top', 8, 12)};
`

const SInterval = styled.div`
    ${range('font-size', 14, 20)}
    color: #fff;

    span {
        color: ${yellow};
    }
`

const SLotteryResult = styled.div`
    color: #e6e6e6;
    ${range('margin-top', 10, 16)};

    ${SGameBall} {
        font-size: 24px;
        ${range('width', 40, 48)};
        ${range('height', 40, 48)};
        margin-right: 12px;
    }
`

const SBtnGroup = styled.div`
    display: block;
    align-self: flex-end;

    @media only screen and (max-height: 500px) {
        position: absolute;
        bottom: 0;
        right: 0;
    }
`

const SBtn = styled.div`
    ${range('font-size', 18, 24)}
    ${range('width', 180, 260)}
    ${range('height', 40, 60)}
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 6px;
`

const SBtnTrial = styled(SBtn)`
    color: #363636;
    background: #e6e6e6;
    margin-top: 20px;
    font-weight: 600;
`

const SBtnStart = styled(SBtn)`
    color: #fff;
    background: #f59310;
    font-weight: 600;
`

const SMoneyIcon = styled.div`
    ${range('width', 23, 30)}
    ${range('height', 23, 30)}
    ${bgImg(moneyIcon)};
    margin-right: 12px;
`
interface IGameItemProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail | null
    customizedInterval?: ICustomizedInterval
    onBtnTryClick: (gameId: number) => void
    onBtnPlayClick: (gameId: number) => void
}

export default ({ game, gameDetail, onBtnTryClick, onBtnPlayClick, customizedInterval: i }: IGameItemProps) => {
    const t = useTranslation()
    const { englishName, code, name, desktopIntroduction, iconUrl } = game
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onTry = useCallback(() => {
        onBtnTryClick(code)
    }, [onBtnTryClick, code])

    const onPlay = useCallback(() => {
        onBtnPlayClick(code)
    }, [onBtnPlayClick, code])

    if (!gameDetail) return null

    return (
        <SGameDetailWrapper>
            <SHeader>
                <SGameIcon data-qa={'imgLotteryIcon'} src={iconUrl} />
                <SGameTitle data-qa={'txtLotteryTitle'}>
                    <SChiTitle>
                        {name}
                        <SEngTitle>{englishName}</SEngTitle>
                    </SChiTitle>
                    <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SDescription>
                </SGameTitle>
            </SHeader>

            <SContentWrapper>
                <SGameResult>
                    {i && (
                        <SInterval
                            data-qa={'txtLotteryCycle'}
                            dangerouslySetInnerHTML={{
                                __html: i.isMarkSix
                                    ? t('lottery.customMarkSixInterval', {
                                        customIssue: '<span>' + i.customIssue + '</span>',
                                        markSixMonth: i.markSixMonth,
                                        markSixDay: '<span>' + i.markSixDay + '</span>',
                                    })
                                    : t('lottery.customInterval', {
                                        customIssue: '<span>' + i.customIssue + '</span>',
                                        customInterval: i.customInterval,
                                        customTimeUnit: i.customTimeUnit,
                                        customTotal: '<span>' + i.customTotal + '</span>',
                                    }),
                            }}
                        />
                    )}

                    <SLotteryResult data-qa={'txtLotteryResult'}>
                        <LotteryResult lotoResult={gameDetail.drawResult} color={game.type} brandColorCodes={brandColorCodes}></LotteryResult>
                    </SLotteryResult>
                </SGameResult>

                <SBtnGroup>
                    <SBtnStart data-qa={'btnStart'} onClick={onPlay}>
                        <SMoneyIcon></SMoneyIcon>
                        {t('lottery.enter')}
                    </SBtnStart>
                    {!isLoggedIn && <SBtnTrial data-qa={'btnTrial'} onClick={onTry}>{t('lottery.trial')}</SBtnTrial>}
                </SBtnGroup>
            </SContentWrapper>
        </SGameDetailWrapper>
    )
}
