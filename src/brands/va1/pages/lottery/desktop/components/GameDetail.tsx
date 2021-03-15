import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import LotteryResult, { SGameBall } from '@pages/lottery/desktop/components/LotteryResult'
import { LotoGameListItem } from '@services/game/type'
import { IGameDetail, ICustomizedInterval } from '@pages/lottery/desktop/types'
import { range } from '@components/common/responsive'
import useTranslation from '@hooks/useTranslation'

import img_contentBg from '@brand/assets/images/lottery/desktop/bg-result.png'
import img_btnGame from '@brand/assets/images/lottery/desktop/btn-game-o.png'
import img_btnGame_hover from '@brand/assets/images/lottery/desktop/btn-game.png'
import img_btnTrial from '@brand/assets/images/lottery/desktop/btn-try-o.png'
import img_btnTrial_hover from '@brand/assets/images/lottery/desktop/btn-try.png'
import img_bg_gameIcon from '@brand/assets/images/lottery/desktop/bg-game.png'
import img_game_new from '@brand/assets/images/lottery/desktop/icon-new.png'
import { useCallback } from 'react'

interface GameDetailProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail
    interval: ICustomizedInterval
    onBtnPlayClick: (gameId?: number) => void
    onBtnTryClick?: () => void
}

const gold = '#d5b587'

const SGameDetail = styled.div`
    font-size: 16px;
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SContent = styled.main`
    ${range('width', 548, 666)};
    ${range('height', 170, 208)};
    ${range('padding', 46, 56)};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: center center / contain no-repeat url(${img_contentBg});
`

const SIcon = styled.div<{ iconUrl: string; isNew?: boolean }>`
    ${range('margin-right', 24, 40)};
    ${range('padding', 10, 12)};
    background: url(${img_bg_gameIcon}) no-repeat center center / contain;
    box-sizing: content-box;

    & > div {
        ${range('width', 102, 136)};
        ${range('height', 102, 136)};
        margin: 0 auto;
        background: url(${(props) => props.iconUrl}) no-repeat center center / contain;
        position: relative;

        &:after {
            content: '';
            display: block;
            width: 150%;
            height: 150%;
            position: absolute;
            top: -2em;
            left: -2em;
            background: url(${(props) => (props.isNew ? img_game_new : '')}) no-repeat center center / contain;
        }
    }
`

const SChi = styled.div`
    font-size: 64px;
    color: ${gold};
    margin: 4px 0;
`

const SEng = styled.div`
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${gold};
    ${range('margin-top', 4, 12)};
    ${range('margin-bottom', 4, 12)};
`

const SDescription = styled.div`
    ${range('font-size', 14, 18)};
`

const SIntervalDetail = styled.div`
    font-size: 18px;
    ${range('margin', 6, 14)};

    strong {
        color: ${(props) => props.theme.colors.primary};
    }
`

const SLottoeryResult = styled(LotteryResult)`
    width: auto;

    ${SGameBall} {
        font-size: 18px;
        ${range('width', 40, 48)};
        ${range('height', 40, 48)};
        ${range('margin-left', 3, 5)};
        ${range('margin-right', 3, 5)};
        margin: 0 5px;
        border-radius: 8px;
    }
`

const SBtns = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Btn = styled.div`
    margin: 0 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s ease-in-out background-image;
`

const SBtnPlay = styled(Btn)`
    ${range('width', 195, 265)};
    ${range('height', 80, 110)};
    background: center center / contain no-repeat url(${img_btnGame});

    &:hover {
        background-image: url(${img_btnGame_hover});
    }
`

const SBtnTrial = styled(Btn)`
    ${range('width', 108, 146)};
    ${range('height', 77, 105)};
    background: center center / contain no-repeat url(${img_btnTrial});

    &:hover {
        background-image: url(${img_btnTrial_hover});
    }
`

const GameDetail = ({ game, gameDetail, onBtnPlayClick, onBtnTryClick, interval: i }: GameDetailProps) => {
    const { name, desktopIntroduction, iconUrl, englishName, isNew } = game

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const t = useTranslation()

    const onPlay = useCallback(() => {
        onBtnPlayClick()
    }, [onBtnPlayClick])

    if (!gameDetail) return null

    return (
        <SGameDetail>
            <SHeader>
                <SIcon data-qa={'imgLotteryIcon '} iconUrl={iconUrl} isNew={isNew}>
                    <div></div>
                </SIcon>
                <div data-qa={'txtLotteryTitle'}>
                    <SChi>{name}</SChi>
                    <SEng>{englishName}</SEng>
                    <SDescription>{desktopIntroduction}</SDescription>
                </div>
            </SHeader>
            <SContent>
                {i && (
                    <SIntervalDetail
                        data-qa={'txtLotteryCycle'}
                        dangerouslySetInnerHTML={{
                            __html: i.isMarkSix
                                ? t('lottery.customMarkSixInterval', {
                                    customIssue: '<strong>' + i.customIssue + '</strong>',
                                    markSixMonth: i.markSixMonth,
                                    markSixDay: i.markSixDay,
                                })
                                : t('lottery.customInterval', {
                                    customIssue: '<strong>' + i.customIssue + '</strong>',
                                    customInterval: i.customInterval,
                                    customTimeUnit: i.customTimeUnit,
                                    customTotal: i.customTotal,
                                }),
                        }}
                    />
                )}
                <SLottoeryResult data-qa={'txtLotteryResult'} lotoResult={gameDetail.drawResult} color={game.type} />
            </SContent>
            <SBtns>
                {!isLoggedIn && <SBtnTrial data-qa={'btnTrial'} onClick={onBtnTryClick}></SBtnTrial>}
                <SBtnPlay data-qa={'btnStart'} onClick={onPlay}></SBtnPlay>
            </SBtns>
        </SGameDetail>
    )
}

export default GameDetail
