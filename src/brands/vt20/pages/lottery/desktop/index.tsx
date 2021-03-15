import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
import useCopyRight from '@hooks/useCopyRight'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import bgImg from '@mixins/backgroundImg'
import backgroundImage from '@brand/assets/images/lottery/desktop/background.jpg'
import GameDetail from './components/GameDetail'
import GameItem from './components/GameItem'
import { AbRWrapper } from '@components/common/responsive'
import AutoWrapContainer from '@components/common/autoWrapContainer'

const SLotteryWrapper = styled(AbRWrapper)`
    width: 100%;
    display: block;

    @media screen and (max-height: 600px) {
        padding-top: 8px;
    }
`

const SLotteryBg = styled.div`
    width: 100%;
    height: calc(100% - 28px);
    ${bgImg(backgroundImage, 'cover')}
    display: flex;
    align-items: center;
`

const SGamesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 960px;
    margin: auto;
    /* max-width: 50%; */
    justify-content: center;
    align-items: center;
    position: relative;
`

const SCopyRight = styled.div`
    font-size: 14px;
    color: ${props => props.theme.colors.gray};
    padding: 6px 0;
    display: flex;
    justify-content: center;
    background: #1a1a1a;
`

export default () => {
    const copyRight = useCopyRight()

    const {
        onBtnPlayClick,
        onBtnTryClick,
        handleGameItemClick,
        gameList,
        currentGame,
        gameDetail,
        customizedInterval,
    } = useDesktopLottery({ pageSize: 16 })

    return <GameWrapper>
        <SLotteryBg>
            {currentGame && <SLotteryWrapper params={{ maxVh: 720, minVh: 500 }}>
                <GameDetail
                    game={currentGame}
                    gameDetail={gameDetail}
                    customizedInterval={customizedInterval}
                    onBtnTryClick={onBtnTryClick}
                    onBtnPlayClick={onBtnPlayClick}
                ></GameDetail>
                <SGamesWrapper>
                    <AutoWrapContainer spaceBetweenItem={0} itemPerRow={8}>
                        {gameList.map((game, index) => (
                            <GameItem
                                game={game}
                                key={game.code}
                                isActive={(currentGame?.code) === game.code}
                                handleClick={handleGameItemClick}
                                gameIndex={index + 1}
                            />
                        ))}
                    </AutoWrapContainer>

                </SGamesWrapper>
            </SLotteryWrapper>}
        </SLotteryBg>
        <SCopyRight data-qa={'txtFooterCopyRight'}>{copyRight}</SCopyRight>
    </GameWrapper>
}
