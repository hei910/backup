import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
import GameItem from './components/GameItem';
import GameDetail from './components/GameDetail';
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import backgroundImage from '@brand/assets/images/lottery/desktop/bg-min.jpg';
import AutoWrapContainer from '@components/common/autoWrapContainer'
import useCopyRight from '@hooks/useCopyRight'
import { AbRWrapper } from '@components/common/responsive'

const SLotteryWrapper = styled(AbRWrapper)`
    width: 100%;
    height: 100%;
    background: url(${backgroundImage}) no-repeat center center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const SContentCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 1300px;
`

const SGamesWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 700px;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SGameDetailWrapper = styled.div`
    width: 700px;
    padding: 0 30px;
`

const SFooter = styled.div`
    font-size: 14px;
    color: ${(props) => props.theme.colors.gray};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000;
`


export default () => {
    const {
        onBtnTryClick,
        onBtnPlayClick,
        handleGameItemClick,
        gameList,
        currentGame,
        gameDetail,
        customizedInterval
    } = useDesktopLottery({ pageSize: 25 });
    const copyRight = useCopyRight()


    return (
        <GameWrapper>
            <SLotteryWrapper params={{ minVh: 500 }}>
                <SContentCenter>
                    {gameList.length > 1 && (
                        <SContentWrapper>
                            <SGamesWrapper>
                                <AutoWrapContainer spaceBetweenItem={0} itemPerRow={5}>
                                    {gameList.map((game, index) => (
                                        <GameItem
                                            key={'game-' + game.code}
                                            game={game}
                                            isActive={currentGame?.code === game.code}
                                            handleClick={handleGameItemClick}
                                            gameIndex={index + 1}
                                        />
                                    )
                                    )}
                                </AutoWrapContainer>
                            </SGamesWrapper>

                            <SGameDetailWrapper>
                                {currentGame &&
                                    <GameDetail
                                        game={currentGame}
                                        gameDetail={gameDetail}
                                        interval={customizedInterval}
                                        onBtnPlayClick={onBtnPlayClick}
                                        onBtnTryClick={onBtnTryClick}
                                    ></GameDetail>}
                            </SGameDetailWrapper>

                        </SContentWrapper>
                    )}
                    <SFooter data-qa={'txtFooterCopyRight'}>{copyRight}</SFooter>
                </SContentCenter>

            </SLotteryWrapper>
        </GameWrapper>
    )
}
