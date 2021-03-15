import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import LotteryResult, { SGameBall } from '@pages/lottery/desktop/components/LotteryResult'
import useTranslation from '@hooks/useTranslation'
import img_contentBg from '@brand/assets/images/lottery/desktop/bg-result.png'
import img_iconDollar from '@brand/assets/images/lottery/desktop/icon-money.png'
import { LotoGameListItem } from '@services/game/type'
import { ICustomizedInterval, IGameDetail } from '@pages/lottery/desktop/types'
import { range } from '@components/common/responsive'
import { useCallback } from 'react'

interface GameDetailProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail
    customizedInterval?: ICustomizedInterval
    onBtnPlayClick: (gameId?: number) => void
    onBtnTryClick?: () => void
}

const SGameDetail = styled.div`
    font-size: 16px;
    /* width: 50%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const SHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
`

const SChi = styled.div`
    ${range('font-size', 57, 80)};
    font-weight: 600;
    color: ${props => props.theme.colors.secondary};
`

const SEng = styled.div`
    ${range('font-size', 28, 40)};
    text-transform: uppercase;
`

const SDescription = styled.div`
    color: ${props => props.theme.colors.gray};
    ${range('font-size', 12, 18)};
    ${range('margin-top', 12, 20)};
    ${range('margin-bottom', 12, 20)};
`

const SContent = styled.main`
    ${range('width', 463, 640)};
    ${range('height', 102, 140)};
    ${range('margin-top', 20, 40)};
    ${range('margin-bottom', 20, 40)};
    background: center center / contain no-repeat url(${img_contentBg});
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SBtns = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Btn = styled.div`
    ${range('font-size', 17, 24)};
    ${range('width', 145, 200)};
    ${range('height', 43, 60)};
    ${range('margin-right', 14, 20)};
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.25s ease-in-out background;
`

const SBtnPlay = styled(Btn)`
    background: ${props => props.theme.colors.brand};

    &:before {
        content: '';
        display: block;
        width: 22px;
        height: 22px;
        margin: 0 8px 0 0;
        background: center center / contain no-repeat url(${img_iconDollar});
    }

    &:hover {
        background: #07d494;
    }
`

const SBtnTrial = styled(Btn)`
    color: ${props => props.theme.colors.secondary};
    border: 2px solid currentColor;
    border-radius: 4px;

    &:hover {
        background: rgba(246, 228, 29, 0.3);
    }
`

const SIntervalDetail = styled.div`
    font-size: 12px;
    color: #cccccc;
    margin: 0 0 12px;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
`

const SLottoeryResult = styled(LotteryResult)`
    display: flex;
    justify-content: center;
    align-items: center;

    ${SGameBall} {
        ${range('font-size', 14, 24)};
        ${range('width', 35, 48)};
        ${range('height', 35, 48)};
        ${range('margin-left', 4.5, 6)};
        ${range('margin-right', 4.5, 6)};
    }
`

const SIssue = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > div:nth-child(1) {
        ${range('font-size', 18, 24)};
        margin: 0 0 0.25em;

        span {
            color: ${props => props.theme.colors.secondary};
        }
    }

    & > div:nth-child(2) {
        ${range('font-size', 12, 16)};
        color: ${props => props.theme.colors.gray};
    }
`

const GameDetail = ({ game, gameDetail, onBtnPlayClick, onBtnTryClick, customizedInterval: i }: GameDetailProps) => {
    const t = useTranslation()
    const { name, desktopIntroduction, englishName } = game
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onPlay = useCallback(() => {
        onBtnPlayClick()
    }, [onBtnPlayClick])

    if (!gameDetail) return null

    return (
        <SGameDetail>
            <SHeader data-qa={'txtLotteryTitle'}>
                <SChi>{name}</SChi>
                <SEng>{englishName}</SEng>
                <SDescription data-qa={'txtLotteryDesc'}>{desktopIntroduction}</SDescription>
            </SHeader>
            <SContent>
                <SIntervalDetail>
                    {i && (
                        <SIssue data-qa={'txtLotteryCycle'}>
                            <div>
                                {t('lottery.lotoInterval.prefix')} <span>{i.customIssue}</span>
                                {t('lottery.lotoInterval.postfix1')}
                            </div>
                            <div>
                                {t('lottery.lotoInterval.prefix')} {i.customInterval} {i.customTimeUnit}
                                {t('lottery.lotoInterval.postfix2')}
                                {i.customTotal} {t('lottery.lotoInterval.postfix3')}
                            </div>
                        </SIssue>
                    )}
                </SIntervalDetail>
                <SLottoeryResult data-qa={'txtLotteryResult'} lotoResult={gameDetail.drawResult} color={game.type} />
            </SContent>
            <SBtns>
                <SBtnPlay onClick={onPlay} data-qa={'btnStart'}>
                    <span>{t('lottery.enter')}</span>
                </SBtnPlay>
                {!isLoggedIn && (
                    <SBtnTrial onClick={onBtnTryClick} data-qa={'btnTrial'}>
                        <span>{t('lottery.trial')}</span>
                    </SBtnTrial>
                )}
            </SBtns>
        </SGameDetail>
    )
}

export default GameDetail
