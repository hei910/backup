import { useState, useEffect } from 'react'
import { IPopularData } from '@type'
import styled from 'styled-components/macro'
import useMeasure from 'react-use-measure'
import axios from 'axios'
import { animated, useSpring } from 'react-spring'
import playIcon from '@brand/assets/images/video/btn_play.svg'
import useTranslation from '@hooks/useTranslation'

const { ResizeObserver } = require('@juggle/resize-observer')

type IComponentProps = {
    data: IPopularData | undefined
    dataLoading: boolean
    dataError: boolean
    matchId: string | undefined
    videoPreference?: 'live' | 'animation'
    defaultHeight?: number
}

const SLayout = styled.div<{ minHeight: number }>`
    height: ${(props) => `${props.minHeight}px`};
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SIFrameContainer = styled.div<{ height: number }>`
    width: 100%;
    height: ${(props) => props.height}px;
    position: relative;
`

const SIFrameLayout = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`

const SIFrameLoadingIndicator = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SIFrameMask = styled.div<{ isMask: boolean }>`
    position: absolute;
    top: 0;
    bottom: ${(props) => (props.isMask ? '0px' : '13%')};
    left: 0;
    right: 0;
    background: ${(props) => (props.isMask ? '#000' : 'transparent')};
`

const SPlayIcon = styled.img<{ isShow: boolean }>`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    transform: translate(-50%, -50%);
    opacity: ${(props) => (props.isShow ? 1 : 0)};
`

type IAnimationApiResponse = {
    success: boolean
    data: {
        data: {
            mid: string
            sportType: string
            vcode: string
            vendorId: string
            vendorMid: string
            metadata: {
                liveodds: boolean
                matchstatus: string
            }
        }
        ui: {
            endpoint: string
            initUIMethod: string
            ifEndpoint: {
                url: string
                tv: string
                tabs: string
            }
            m3u8: string
        }
    }
}

const VideoIFrame = ({
    data,
    dataLoading,
    dataError,
    videoPreference,
    matchId,
    defaultHeight = 200,
}: IComponentProps) => {
    const [bind, { width, height }] = useMeasure({ polyfill: ResizeObserver })
    const [animationUrl, setAnimationUrl] = useState('')
    const [isPause, setPause] = useState(false)
    const props = useSpring({ height })
    const [currentMatchId, setCurrentMatchId] = useState(matchId)
    const t = useTranslation()

    useEffect(() => {
        // prevent fetching new animationUrl when matchId is unchanged
        if (data && matchId && currentMatchId !== matchId) {
            setAnimationUrl('')
            const { animationProviderVendor, videoMid } = data.info
            if (videoMid) {
                axios
                    .get<IAnimationApiResponse>(
                        `https://lmr.minao182881.com/router/fnapi/match/animationProvider?domain=${window.location.hostname}&mid=${videoMid}`,
                    )
                    .then((res) => {
                        if (animationProviderVendor === 'bg') {
                            setAnimationUrl(res.data.data.ui.endpoint)
                        } else if (animationProviderVendor === 'sr') {
                            if (res.data.data.ui?.ifEndpoint?.tv) {
                                setAnimationUrl(res.data.data.ui.ifEndpoint.tv)
                            }
                        }

                        setCurrentMatchId(matchId)
                    })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, matchId])

    const getIframeLayout = (url: string, height: number) => {
        return (
            <SIFrameContainer height={height}>
                <SIFrameLoadingIndicator>{t('general.liveFrame.loadingFrame')}</SIFrameLoadingIndicator>
                <SIFrameLayout>
                    <iframe
                        key={url}
                        src={isPause ? '' : url}
                        frameBorder="0"
                        width={width}
                        height={height}
                        data-qa="liveFrame"
                    />
                </SIFrameLayout>
                <SIFrameMask isMask={isPause} onClick={() => setPause(!isPause)} />
                <SPlayIcon onClick={() => setPause(!isPause)} src={playIcon} isShow={isPause} data-qa="btnPlayPause" />
            </SIFrameContainer>
        )
    }

    const getDesiredHeight = (skipRealVideo?: boolean) => {
        if (!data || !width) {
            return defaultHeight
        }

        const ratio = 375 / width

        const { animationProviderVendor, videoVendor } = data.info

        if (videoVendor && !skipRealVideo) {
            return 220 / ratio
        } else if (animationProviderVendor === 'sr') {
            return 230 / ratio
        } else if (animationProviderVendor === 'bg') {
            if (data.seasonInfo.sId === '1') {
                return 293 / ratio
            } else if (data.seasonInfo.sId === '2') {
                return 165 / ratio
            } else if (data.seasonInfo.sId === '3') {
                return 291 / ratio
            } else {
                return 290 / ratio
            }
        } else {
            return defaultHeight
        }
    }

    const getContent = () => {
        if (dataLoading) {
            return t('general.liveFrame.loadingFrame')
        } else if (dataError) {
            return t('general.liveFrame.loadingError')
        } else if (data) {
            const { animationProviderVendor, videoVendor, videoMid } = data.info

            if (videoPreference === 'live' && videoVendor) {
                return getIframeLayout(
                    `https://lmr.minao182881.com/router/fnapi/video/play.html?mid=${videoMid}`,
                    getDesiredHeight(),
                )
            } else if (videoPreference === 'animation' && animationProviderVendor) {
                if (!animationUrl) {
                    return t('general.liveFrame.loadingFrame')
                }

                return getIframeLayout(animationUrl, getDesiredHeight(true))
            } else if (videoVendor) {
                return getIframeLayout(
                    `https://lmr.minao182881.com/router/fnapi/video/play.html?mid=${videoMid}`,
                    getDesiredHeight(),
                )
            } else if (animationProviderVendor) {
                if (!animationUrl) {
                    return t('general.liveFrame.loadingFrame')
                }

                return getIframeLayout(animationUrl, getDesiredHeight(true))
            } else {
                return t('general.liveFrame.noLive')
            }
        } else if (!data) {
            return t('general.liveFrame.noLiveMatch')
        } else {
            return null
        }
    }

    const desiredMinHeight = getDesiredHeight()

    return (
        <animated.div style={props}>
            <SLayout ref={bind} minHeight={desiredMinHeight}>
                {getContent()}
            </SLayout>
        </animated.div>
    )
}

export default VideoIFrame
