// import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
import GameItem from './components/GameItem'
import GameDetail from './components/GameDetail'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import backgroundImage from '@brand/assets/images/lottery/desktop/bg-v2.jpg'
import trialBtnImage from '@brand/assets/images/lottery/desktop/try.png'
import AutoWrapContainer from '@components/common/autoWrapContainer'
import { useSelector } from '@redux'
import { AbRWrapper, px, range } from '@components/common/responsive'
import useCopyRight from '@hooks/useCopyRight'
import { useCallback } from 'react'

const SLotteryWrapper = styled(AbRWrapper)`
    color: ${(props) => props.theme.colors.grayDk3};
    width: 100%;
    height: 100%;
    padding: 0 80px 30px;
    background: url(${backgroundImage}) no-repeat center center/cover;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;
`

const SContentCenter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${px(10, 0)};
`

const SContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1400px;
`

const SGamesWrapper = styled.div`
    flex: 1 0 auto;
    ${range('flex-basis', 500, 700)};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    position: relative;
`

const SGameDetailWrapper = styled.div`
    flex: 1 1 700px;
    display: flex;
    align-items: center;
`

const SBtnTrial = styled.div`
    background: url(${trialBtnImage}) no-repeat center center/cover;
    width: ${px(156)};
    height: ${px(44)};
    cursor: pointer;
    ${range('margin-top', 10, 18)};
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
`

export default () => {
    // const t = useTranslation()

    const {
        onBtnTryClick,
        onBtnPlayClick,
        handleGameItemClick,
        gameList,
        currentGame,
        gameDetail,
        fullInterval,
    } = useDesktopLottery({ pageSize: 20 })

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const copyRight = useCopyRight()

    const onTry = useCallback(() => {
        onBtnTryClick()
    }, [onBtnTryClick])

    return (
        <GameWrapper>
            <SLotteryWrapper params={{ maxVh: 800, minVh: 500 }}>
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
                                    ))}
                                </AutoWrapContainer>
                                {!isLoggedIn && <SBtnTrial onClick={onTry} data-qa={'btnTrial'}></SBtnTrial>}
                            </SGamesWrapper>

                            <SGameDetailWrapper>
                                {currentGame && (
                                    <GameDetail
                                        game={currentGame}
                                        gameDetail={gameDetail}
                                        interval={fullInterval}
                                        onBtnPlayClick={onBtnPlayClick}></GameDetail>
                                )}
                            </SGameDetailWrapper>
                        </SContentWrapper>
                    )}
                    <SFooter data-qa={'txtFooterCopyRight'}>{copyRight}</SFooter>
                </SContentCenter>
            </SLotteryWrapper>
        </GameWrapper>
    )
}
