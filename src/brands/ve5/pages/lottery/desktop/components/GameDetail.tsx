import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import LotteryResult, { SGameBall } from '@pages/lottery/desktop/components/LotteryResult'
import useTranslation from '@hooks/useTranslation'
import img_contentBg from '@brand/assets/images/lottery/desktop/bg-result.png'
import img_btnGame from '@brand/assets/images/lottery/desktop/btn-game.png'
import img_btnGame_hover from '@brand/assets/images/lottery/desktop/btn-game-o.png'
import img_btnTrial from '@brand/assets/images/lottery/desktop/btn-try.png'
import { LotoGameListItem } from '@services/game/type'
import { IGameDetail, IFullInterval } from '@pages/lottery/desktop/types'
import img_btnTrial_hover from '@brand/assets/images/lottery/desktop/btn-try-o.png'
import { useCallback } from 'react'

interface GameDetailProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail
    interval?: IFullInterval
    onBtnPlayClick: (gameId?: number) => void
    onBtnTryClick?: () => void
}

const SGameDetail = styled.div`
    font-size: 16px;
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`
const SIcon = styled.div<{ iconUrl: string }>`
    width: 108px;
    height: 108px;
    margin: 8px 12px 8px 0;
    background: ${(props) => `center center / contain no-repeat url(${props.iconUrl})`};
`
const SHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const STitle = styled.header`
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
`

const SChi = styled.span`
    font-size: 32px;
    color: white;
`

const SEng = styled.span`
    font-size: 18px;
    text-transform: uppercase;
`

const SDescription = styled.div`
    font-size: 12px;
    color: #787878;
`

const SContent = styled.main`
    width: 468px;
    height: 110px;
    padding: 16px;
    background: center center / contain no-repeat url(${img_contentBg});
`

const SBtns = styled.footer`
    width: 460px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Btn = styled.div`
    margin: 0 0 0 12px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        color: #3f3626;
    }
`

const SBtnPlay = styled(Btn)`
    color: #e4c380;
    width: 173px;
    height: 50px;
    background: center center / contain no-repeat url(${img_btnGame});

    &:hover {
        background-image: url(${img_btnGame_hover});
    }

    span {
        font-size: 18px;
    }
`

const SBtnTrial = styled(Btn)`
    width: 75px;
    height: 32px;
    background: center center / contain no-repeat url(${img_btnTrial});

    &:hover {
        background-image: url(${img_btnTrial_hover});
    }

    span {
        font-size: 15px;
    }
`

const SIntervalDetail = styled.div`
    font-size: 12px;
    color: #cccccc;
    margin: 0 0 12px;
`

const SLottoeryResult = styled(LotteryResult)`
    ${SGameBall} {
        font-size: 14px;
        width: 36px;
        height: 36px;
        margin: 0 8px 0 0;

        /* span {
            font-size: 12px;
        } */
    }
`
const SIsNew = styled.span`
    width: 35px;
    height: 28px;
    background: linear-gradient(to bottom, #fc0000, #7d0101);
    border-radius: 6px;
    color: white;
    font-size: 20px;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5px;
`

const GameDetail = ({ game, gameDetail, onBtnPlayClick, onBtnTryClick, interval }: GameDetailProps) => {
    const t = useTranslation()

    const { name, desktopIntroduction, iconUrl, englishName, isNew } = game

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onPlay = useCallback(() => {
        onBtnPlayClick();
    }, [onBtnPlayClick])

    if (!gameDetail) return null

    return (
        <SGameDetail>
            <SHeader>
                <SIcon iconUrl={iconUrl} data-qa={'imgLotteryIcon'}></SIcon>

                <div>
                    <STitle data-qa={'txtLotteryTitle'}>
                        <SChi>{name}</SChi>&nbsp;
                        <SEng>{englishName}</SEng>
                        {isNew && <SIsNew>{t('lottery.latest')}</SIsNew>}
                    </STitle>
                    <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SDescription>
                </div>
            </SHeader>
            <SContent>
                {/* <SIntervalDetail detail={gameDetail}/> */}
                <SIntervalDetail data-qa={'txtLotteryCycle'}>{interval && `${interval.issueString} | ${interval.intervalString}`}</SIntervalDetail>
                <SLottoeryResult lotoResult={gameDetail.drawResult} color={game.type} data-qa={'txtLotteryResult'} />
            </SContent>
            <SBtns>
                {!isLoggedIn && (
                    <SBtnTrial onClick={onBtnTryClick} data-qa={'btnTrial'}>
                        <span>{t('lottery.trial')}</span>
                    </SBtnTrial>
                )}
                <SBtnPlay onClick={onPlay} data-qa={'btnStart'}>
                    <span>{t('lottery.enter')}</span>
                </SBtnPlay>
            </SBtns>
        </SGameDetail>
    )
}

export default GameDetail
