import { useCallback } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import { range } from '@components/common/responsive'
import { IFullInterval, IGameDetail } from '@pages/lottery/desktop/types'
import LotteryResult, { SGameBall, SEmptyResultText } from '@pages/lottery/desktop/components/LotteryResult'
import bgImg from '@mixins/backgroundImg'
import { LotoGameListItem } from '@brand/services/game/type'
import cardBgImg from '@brand/assets/images/lottery/desktop/card_bg.jpg'
import iconBgImg from '@brand/assets/images/lottery/desktop/icon_bg.png'
import btnTrialImg from '@brand/assets/images/lottery/desktop/btn_trial.png'
import btnTrialHoverImg from '@brand/assets/images/lottery/desktop/btn_trial_hover.png'
import btnStartImg from '@brand/assets/images/lottery/desktop/btn_start.png'
import btnStartHoverImg from '@brand/assets/images/lottery/desktop/btn_start_hover.png'
import cardBgFooterImg from '@brand/assets/images/lottery/desktop/card_footer.png'


const SGameCardWrapper = styled.div`
    color: #fff;
    height: 100%;
    padding: 0 12px;
    /* ${range('padding-top', 6, 12)} */
    ${range('padding-bottom', 54, 80)}
    border: solid 2px #ffffff;
    border-radius: 16px;
    position: relative;
    background: center center / 100% 100% no-repeat url(${cardBgImg});

    &:after {
        content: '';
        background: center center / contain no-repeat url(${cardBgFooterImg});
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 16px;
        display: block;
    }

    @media only screen and (max-height: 500px) {
        height: 90%;
    }
`

const SGameIconWrapper = styled.div`
    ${range('width', 60, 115)};
    ${range('height', 60, 115)};
    ${range('margin-top', -20, -40)};
    ${range('padding', 10, 16)};
    ${bgImg(iconBgImg)};
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SGameIcon = styled.div<{ src: string }>`
    width: 100%;
    height: 100%;
    ${(props) => bgImg(props.src, 'cover')};
    border-radius: 45px;
`;

const STitle = styled.div`
    display: block;
    margin-top: 5px;
`

const SChiTitle = styled.div`
    font-size: 26px;
    font-weight: 600;
`

const SEngTitle = styled.div`
    font-size: 12px;
    /* font-weight: 600; */
    letter-spacing: 0.22px;
    margin: 8px 0;

    @media only screen and (max-height: 500px) {
        margin: 0;
    }
`

const SDescription = styled.div`
    font-size: 12px;
    margin: 0 0 4px;

    @media only screen and (max-height: 500px) {
        margin: 12px 0 4px;
    }
`

const SInterval = styled.div`
    font-size: 12px;
    color: #7e8996;
`

const SLotteryResult = styled(LotteryResult)`
    font-size: 12px;
    margin-top: 12px;

    ${SEmptyResultText} {
        color: #7e8996;
    }

    ${SGameBall} {
        ${range('font-size', 14, 16)};
        ${range('width', 26, 32)};
        ${range('height', 26, 32)};
    }
`

const SBtnGroup = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    ${range('margin-bottom', 8, 10)}
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SBtnStart = styled.div`
    ${range('width', 111, 174)};
    ${range('height', 38, 60)};
    ${bgImg(btnStartImg)};
    margin: 0 10px;
    cursor: pointer;

    &:hover {
        ${bgImg(btnStartHoverImg)};
    }
`

const SBtnTrial = styled.div`
    ${range('width', 66, 100)};
    ${range('height', 40, 60)};
    ${bgImg(btnTrialImg)};
    margin: 0 10px;
    cursor: pointer;

    &:hover {
        ${bgImg(btnTrialHoverImg)};
    }
`

const SGameCardTop = styled.div`
    @media screen and (max-height: 500px) {
        display: flex;
    }
`

const SGameCardBottom = styled.div`
    display: block;
`
interface IGameItemProps {
    game: LotoGameListItem
    gameDetail?: IGameDetail | null
    interval?: IFullInterval
    onBtnTryClick: (gameId?: number) => void
    onBtnPlayClick: (gameId?: number) => void
    gameIndex: number
}

export default ({ game, gameDetail, interval, onBtnTryClick, onBtnPlayClick, gameIndex }: IGameItemProps) => {
    const { englishName, code, name, desktopIntroduction, iconUrl } = game
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onTry = useCallback(() => {
        onBtnTryClick(code)
    }, [onBtnTryClick, code])

    const onPlay = useCallback(() => {
        onBtnPlayClick(code)
    }, [onBtnPlayClick, code])

    return (
        <SGameCardWrapper data-qa={`btnLottery${gameIndex}`}>
            <SGameCardTop>
                <SGameIconWrapper>
                    <SGameIcon data-qa={`imgLottery${gameIndex}`} src={iconUrl} />
                </SGameIconWrapper>
                <STitle data-qa={'txtLotteryTitle'}>
                    <SChiTitle>{name}</SChiTitle>
                    <SEngTitle>{englishName}</SEngTitle>
                </STitle>
            </SGameCardTop>

            <SGameCardBottom>
                <SDescription data-qa={`txtLottery${gameIndex}_desc`}>{desktopIntroduction}</SDescription>
                <SInterval data-qa={'txtLotteryCycle'}>
                    {interval &&
                        `${interval.issueString} ${interval.issueString ? ',' : ''} ${interval.intervalString}`}
                </SInterval>
                <SLotteryResult data-qa={'txtLotteryResult'} lotoResult={gameDetail?.drawResult} color={game.type}></SLotteryResult>
            </SGameCardBottom>

            <SBtnGroup>
                {!isLoggedIn && <SBtnTrial data-qa={'btnTrial'} onClick={onTry} />}
                <SBtnStart data-qa={'btnStart'} onClick={onPlay} />
            </SBtnGroup>
        </SGameCardWrapper>
    )
}
