// import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
// import useDesktopLottery from '@hooks/useDesktopLottery'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import useCopyRight from '@hooks/useCopyRight'
import GameItem from './components/GameItem'
import GameDetail from './components/GameDetail'

import img_bg from '@brand/assets/images/lottery/desktop/bg.jpg'
import { AbRWrapper, px, fs } from '@components/common/responsive'

const SLottery = styled(AbRWrapper)`
    line-height: 1.25;
    color: white;
    min-height: 100vh;
    padding: 0 0 ${px(12)};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(${img_bg}) no-repeat center center/cover;
`
const SWrapper = styled.main`
    width: auto;
    height: auto;
    padding: ${px(32, 0)};
`

const SFooter = styled.footer`
    line-height: 1;
    text-align: center;
    padding: ${px(9, 0)};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1a1a;

    span {
        ${fs(14)};
    }
`

const SContent = styled.div`
    max-width: 1380px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SGamesWrapper = styled.div`
    width: calc(740px - 48px);
    padding: 0 calc(40px - 24px);
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
`

const SGameDetailWrapper = styled.div`
    flex: 1 0 auto;
    padding: 0 40px;
`

export default () => {
    // const t = useTranslation()

    const {
        onBtnPlayClick,
        onBtnTryClick,
        gameList,
        currentGame,
        gameDetail,
        handleGameItemClick,
        customizedInterval,
    } = useDesktopLottery()
    const copyRight = useCopyRight()

    return (
        <GameWrapper>
            <SLottery params={{ maxVh: 830, minVh: 430 }}>
                <SWrapper>
                    {gameList.length > 1 && (
                        <SContent>
                            <SGamesWrapper>
                                {gameList.map((game, index) => (
                                    <GameItem
                                        key={game.code}
                                        game={game}
                                        isActive={currentGame?.code === game.code}
                                        handleClick={handleGameItemClick}
                                        gameIndex={index + 1}
                                    />
                                ))}
                            </SGamesWrapper>

                            <SGameDetailWrapper>
                                {currentGame && (
                                    <GameDetail
                                        game={currentGame}
                                        onBtnPlayClick={onBtnPlayClick}
                                        gameDetail={gameDetail}
                                        onBtnTryClick={onBtnTryClick}
                                        customizedInterval={customizedInterval}></GameDetail>
                                )}
                            </SGameDetailWrapper>
                        </SContent>
                    )}
                </SWrapper>
                <SFooter>
                    <span data-qa={'txtFooterCopyRight'}>{copyRight}</span>
                </SFooter>
            </SLottery>
        </GameWrapper>
    )
}
