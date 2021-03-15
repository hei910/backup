import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import styled from 'styled-components/macro'
import useCopyRight from '@hooks/useCopyRight'
import bgImg from '@mixins/backgroundImg'
import GameWrapper from '@components/common/gameWrapper'
import { AbRWrapper, range } from '@components/common/responsive'
import useDesktopLottery from '@pages/lottery/desktop/hooks/useDesktopLottery'

import backgroundImg from '@brand/assets/images/lottery/desktop/background.jpg'
import titleMain from '@brand/assets/images/lottery/desktop/title_main.png'
import btnSwiperPrevImg from '@brand/assets/images/lottery/desktop/btn_left.svg'
import btnSwiperNextImg from '@brand/assets/images/lottery/desktop/btn_right.svg'
import SwiperGameCard from './components/GameCard'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IFullInterval } from '@pages/lottery/desktop/types'
import useInterval from '@pages/lottery/desktop/hooks/useInterval'
import GameItem from './components/GameItem'
import AutoWrapContainer from '@components/common/autoWrapContainer'

const SLotteryWrapper = styled(AbRWrapper)`
    width: 100%;
    display: block;

    @media screen and (max-height: 768px) {
        margin-top: 10px;
    }
`

const SLotteryBg = styled.div`
    width: 100%;
    height: calc(100% - 28px);
    ${bgImg(backgroundImg, 'cover')}
    display: flex;
    align-items: center;
`
const SSwiperPagination = styled.div<{ numberOfGames: number }>`
    ${range('height', 150, 224)};
    width: calc(${(props) => Math.round(props.numberOfGames / 2)} * 100px);
    margin: 10px auto;

    @media only screen and (max-height: 500px) {
        margin: 0 auto;
    }

    @media only screen and (max-width: 1440px) {
        width: calc(${(props) => Math.round(props.numberOfGames / 2)} * 85px);
    }
`

const SCopyRight = styled.div`
    font-size: 14px;
    padding: 6px 0;
    display: flex;
    justify-content: center;
    background: #1a1a1a;
    color: ${(props) => props.theme.colors.gray};
`

const SMainTitle = styled.div`
    ${bgImg(titleMain, 'contain')}
    ${range('width', 426, 874)}
    ${range('height', 60, 123)}
    display: block;
    margin: 0 auto;
`

const SBtnSwiperNavBtn = styled.div`
    ${range('width', 20, 27)}
    ${range('height', 74, 98)}
    background-position: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`

const SBtnSwiperPrev = styled(SBtnSwiperNavBtn)`
    ${range('right', -14, -22)};
    ${bgImg(btnSwiperPrevImg, 'contain')}
`

const SBtnSwiperNext = styled(SBtnSwiperNavBtn)`
    ${range('left', -14, -22)};
    ${bgImg(btnSwiperNextImg, 'contain')}
`

const SSwiperWrapper = styled.div`
    width: 1002px;
    margin: 0 auto;
    position: relative;

    .swiper-pagination-bullet {
        display: none;
    }

    .swiper-slide {
        height: auto;
        padding: 33px 18px 16px;
    }

    @media only screen and (max-height: 500px) {
        .swiper-slide {
            padding: 18px 18px 0px;
        }
    }
`

SwiperCore.use([Navigation, Autoplay, Pagination])

interface IGameFullInterval {
    slideIndex?: number | null
    fullInterval: IFullInterval
}

export default () => {
    const [controlledSwiper, setControlledSwiper] = useState<undefined | SwiperCore>(undefined)

    const [currSlideIndices, setCurrSlideIndices] = useState<number[]>([])

    const fullIntervals: IGameFullInterval[] = []

    const copyRight = useCopyRight()

    const { onBtnPlayClick, onBtnTryClick, getCustomDrawResult, gameList, gameDetails } = useDesktopLottery({
        pageSize: 28,
        isCustomDrawResult: true,
    })

    const gamesLength = useRef(0)
    gamesLength.current = gameList.length

    const getGameDetail = (targetSlideIndex: number) => {
        const targetGameCode = gameList[targetSlideIndex]?.code

        const targetGameDetail = gameDetails?.find((gameDetail) => {
            return targetGameCode === gameDetail.gameCode
        })
        return targetGameCode ? targetGameDetail : undefined
    }

    const getFullInterval = (targetSlideIndex: number) => {
        const targetFullIntervals = fullIntervals?.find((fullIntervals) => {
            return targetSlideIndex === fullIntervals.slideIndex
        })
        return targetFullIntervals ? targetFullIntervals.fullInterval : undefined
    }

    const getCurrGameCodes = () => {
        const currGameCodes: number[] = []
        currSlideIndices.forEach((currSlideIndx) => {
            currGameCodes.push(gameList[currSlideIndx]?.code)
        })
        return currGameCodes
    }

    const getDrawResults = useCallback(async () => {
        const drawResultGameIds = getCurrGameCodes().join(',')
        console.log(drawResultGameIds)
        if (!drawResultGameIds) return

        getCustomDrawResult(drawResultGameIds)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currSlideIndices])

    useEffect(() => {
        getDrawResults()
    }, [currSlideIndices, getDrawResults])

    useEffect(() => {
        if (gameList.length !== 0) {
            setCurrSlideIndices([0, 1, 2])
            controlledSwiper?.slideToLoop(0)
        }
    }, [gameList, controlledSwiper])

    fullIntervals.push({
        slideIndex: currSlideIndices[0],
        fullInterval: useInterval(getGameDetail(currSlideIndices[0])).fullInterval,
    })
    fullIntervals.push({
        slideIndex: currSlideIndices[1],
        fullInterval: useInterval(getGameDetail(currSlideIndices[1])).fullInterval,
    })
    fullIntervals.push({
        slideIndex: currSlideIndices[2],
        fullInterval: useInterval(getGameDetail(currSlideIndices[2])).fullInterval,
    })

    const swiperProps: Swiper = {
        slidesPerView: 3,
        loop: true,
        autoplay: {
            delay: 4000,
        },
        navigation: {
            nextEl: '.nav-next',
            prevEl: '.nav-prev',
        },
        pagination: true,
        onSlideChange: (swiper: SwiperCore) => {
            let currSlideIndices = [
                swiper.realIndex,
                (swiper.realIndex + 1) % gamesLength.current,
                (swiper.realIndex + 2) % gamesLength.current,
            ]
            setCurrSlideIndices(currSlideIndices)
        },
    }

    const handleClickPage = (index: number) => {
        controlledSwiper?.slideToLoop(index) // pass index as realIndex
    }

    return (
        <GameWrapper>
            <SLotteryBg>
                <SLotteryWrapper params={{ maxVh: 900, minVh: 500 }}>
                    <SMainTitle />
                    {gameDetails && (
                        <SSwiperWrapper>
                            <Swiper {...swiperProps} onSwiper={setControlledSwiper}>
                                {gameList.map((game, idx) => {
                                    return (
                                        <SwiperSlide key={game.code}>
                                            <SwiperGameCard
                                                game={game}
                                                gameDetail={getGameDetail(idx)}
                                                interval={getFullInterval(idx)}
                                                onBtnTryClick={onBtnTryClick}
                                                onBtnPlayClick={onBtnPlayClick}
                                                gameIndex={idx + 1}></SwiperGameCard>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                            <SBtnSwiperPrev className="nav-next" />
                            <SBtnSwiperNext className="nav-prev" />
                        </SSwiperWrapper>
                    )}
                    <SSwiperPagination numberOfGames={gameList.length}>
                        <AutoWrapContainer spaceBetweenItem={0} itemPerRow={Math.round(gameList.length / 2)}>
                            {gameList.map((game, index) => (
                                <GameItem
                                    key={game.code}
                                    game={game}
                                    isActive={currSlideIndices.findIndex((slideIndex) => slideIndex === index) !== -1}
                                    handleClick={() => handleClickPage(index)}
                                    gameIndex={index + 1}
                                />
                            ))}
                        </AutoWrapContainer>
                    </SSwiperPagination>
                </SLotteryWrapper>
            </SLotteryBg>
            <SCopyRight>{copyRight}</SCopyRight>
        </GameWrapper>
    )
}
