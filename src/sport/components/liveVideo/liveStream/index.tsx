// import pauseBackgroundImage from 'assets/img/live-stream/live-stream-background.jpg';
import { LivePlayIcon3 } from '@sport/components/icons'
import { StyleIFrame } from '@sport/components/liveVideo/styledIFrame'
import SwitchNavbar from '@sport/components/liveVideo/switchNavbar'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React, { useState } from 'react'
import { useSelector } from '@sport/stores'
import { Platform } from '@services/sportGlobal/types'
import { CurrentVendorEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'

interface ILiveStreamProps {
    liveStreamUrl: string
    currentVendor: CurrentVendorEnum | null
    switchLiveSport: React.Dispatch<ActionTypes>
    isShownToggleBar?: boolean
    isShownSrTabPopup?: boolean
    isSrNavbarLoaded?: boolean
}

interface ILiveStreamContainer {
    platform?: Platform
}

//style-components
const LiveStreamContainer = styled.div<ILiveStreamContainer>`
    position: relative;
    min-height: 220px;
    height: ${(props) => (props.platform === 'mobile' ? 'calc(100vw * 9 / 16)' : '220px')};
    width: 100%;
    z-index: 2;

    & > iframe {
        width: ${(props) => (props.platform === 'mobile' ? '100vw' : '100%')};
        height: ${(props) => (props.platform === 'mobile' ? 'calc(100vw * 9 / 16)' : '220px')};
        min-height: 220px;
    }
`

//style from #live-stream-iframe (LiveSport.scss)
const StyleIFrameForLiveStream = styled(StyleIFrame)`
    position: relative;
`

const LiveStreamPaused = styled.div`
    position: absolute;
    width: 100%;
    height: 70%;
    top: 0;
    right: 0;
    z-index: 2;

    > div {
        width: 100%;
        height: 100%;
        background-color: black;
    }

    svg {
        position: absolute;
        bottom: 20%;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        width: 50px;
        height: 50px;
        cursor: pointer;

        path {
            fill: #fff;
        }

        circle#Oval-Copy {
            fill: #4999d8;
        }

        circle#Oval {
            stroke: #fff;
        }
    }
`

export const LiveStream: React.FC<ILiveStreamProps> = ({
    liveStreamUrl,
    currentVendor,
    switchLiveSport,
    isShownToggleBar,
    isShownSrTabPopup,
    isSrNavbarLoaded,
}) => {
    const isCloseLiveCenter = useSelector((state) => state.sportLive.isCloseLiveCenter)
    const platform = useSelector((state) => state.sportGlobal.platform)
    const [isPaused, setIsPaused] = useState(platform === 'mobile')

    const handlePausedEvent = () => {
        setIsPaused(!isPaused)
    }

    const getIframeSrc = (): string => {
        if (isPaused) {
            return ''
        } else {
            return liveStreamUrl
        }
    }

    return !isCloseLiveCenter ? (
        <LiveStreamContainer platform={platform}>
            <StyleIFrameForLiveStream
                title={'liveVideoPanelLiveStream'}
                src={getIframeSrc()}
                scrolling="no"
                isCloseLiveCenter={isCloseLiveCenter}
                frameBorder="0"
            />

            {currentVendor === CurrentVendorEnum.LIVE_STREAM && (
                <SwitchNavbar
                    currentVendor={currentVendor}
                    switchLiveSport={switchLiveSport}
                    isShownToggleBar={isShownToggleBar}
                    isSrNavbarLoaded={isSrNavbarLoaded}
                    isShownSrTabPopup={isShownSrTabPopup}
                />
            )}

            <LiveStreamPaused onClick={() => handlePausedEvent()}>
                {isPaused && (
                    <div>
                        <LivePlayIcon3 />
                    </div>
                )}
            </LiveStreamPaused>
        </LiveStreamContainer>
    ) : null
}
