import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
import useCopyRight from '@hooks/useCopyRight'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery';
import bgImg from '@mixins/backgroundImg'
import backgroundImage from '@brand/assets/images/lottery/desktop/background.png'
import AutoWrapContainer from '@components/common/autoWrapContainer'
import GameDetail from './components/GameDetail';
import GameItem from './components/GameItem';
import { AbRWrapper } from '@components/common/responsive';

const SLotteryWrapper = styled(AbRWrapper)`
    width: 100%;
    display: block;
`

const SLotteryBg = styled.div`
    width: 100%;
    height: calc(100% - 28px);
    display: flex;
    align-items: center;
    ${bgImg(backgroundImage, 'cover')}
`

const SGamesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 980px;
    margin: auto;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SCopyRight = styled.div`
    font-size: 14px;
    padding: 6px 0;
    display: flex;
    justify-content: center;
    background: #1a1a1a;
    color: ${props => props.theme.colors.gray};
`

export default () => {
    const copyRight = useCopyRight()

    const {
        onBtnTryClick,
        onBtnPlayClick,
        handleGameItemClick,
        gameList,
        currentGame,
        gameDetail,
        fullInterval,
    } = useDesktopLottery({ pageSize: 16 })

    return <GameWrapper>
        <SLotteryBg>
            {currentGame && <SLotteryWrapper params={{ maxVh: 900, minVh: 500 }}>
                <GameDetail
                    game={currentGame}
                    interval={fullInterval}
                    gameDetail={gameDetail}
                    onBtnTryClick={onBtnTryClick}
                    onBtnPlayClick={onBtnPlayClick}
                ></GameDetail>

                <SGamesWrapper>
                    <AutoWrapContainer spaceBetweenItem={0} itemPerRow={8}>
                        {gameList.map((game, index) => (
                            <GameItem
                                key={game.code}
                                game={game}
                                isActive={(currentGame.code) === game.code}
                                handleClick={handleGameItemClick}
                                gameIndex={index + 1}
                            />
                        ))}
                    </AutoWrapContainer>
                </SGamesWrapper>
            </SLotteryWrapper>
            }
        </SLotteryBg>
        <SCopyRight data-qa={'txtFooterCopyRight'}>{copyRight}</SCopyRight>
    </GameWrapper>
}
