// import useTranslation from '@hooks/useTranslation'
import styled, { css } from 'styled-components/macro'
import GameWrapper from '@components/common/gameWrapper'
// import useDesktopLottery from '@hooks/useDesktopLottery'
import useCopyRight from '@hooks/useCopyRight'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'
import GameItem from './components/GameItem'
import GameDetail from './components/GameDetail'

import img_bg from '@brand/assets/images/lottery/desktop/bg.jpg'
import img_title from '@brand/assets/images/lottery/desktop/title.png'
import { AbRWrapper, px, fs } from '@components/common/responsive'

const SLottery = styled(AbRWrapper)`
    color: #969696;
    height: 100vh;
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
    width: calc(700px - 44px);
    padding: 0 calc(40px - 22px);
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

const STitle = styled.div<{ pos: string }>`
    width: 365px;
    height: 90px;
    background: center center / contain no-repeat url(${img_title});
    ${(props) => {
        switch (props.pos) {
            case 'top':
                return css`
                    margin: 16px auto;

                    @media only screen and (max-height: 720px) {
                        display: none;
                    }
                `
            case 'inner':
            default:
                return css`
                    margin: 16px 0;

                    @media only screen and (min-height: 721px) {
                        display: none;
                    }
                `
        }
    }}
`

export default () => {
    // const t = useTranslation()

    const {
        onBtnTryClick,
        gameList,
        currentGame,
        gameDetail,
        handleGameItemClick,
        fullInterval,
        onBtnPlayClick,
    } = useDesktopLottery()
    const copyRight = useCopyRight()

    return (
        <GameWrapper>
            <SLottery params={{ maxVh: 720 }}>
                <SWrapper>
                    <STitle pos="top" />
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
                                <STitle pos="inner" />
                                {currentGame && (
                                    <GameDetail
                                        game={currentGame}
                                        onBtnPlayClick={onBtnPlayClick}
                                        gameDetail={gameDetail}
                                        interval={fullInterval}
                                        onBtnTryClick={onBtnTryClick}></GameDetail>
                                )}
                            </SGameDetailWrapper>
                        </SContent>
                    )}
                </SWrapper>
                <SFooter data-qa={'txtFooterCopyRight'}>
                    <span>{copyRight}</span>
                </SFooter>
            </SLottery>
        </GameWrapper>
    )
}
