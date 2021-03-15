import { LiveAnalystIcon, LivePlayIcon1, LiveVenueIcon1 } from '@sport/components/icons'
import { toggleIsShownSrTabPopup, toggleIsShownVideoNavbar } from '@sport/hooks/useLiveSportApi/actions'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React, { Dispatch, useEffect, useState } from 'react'
import { CurrentVendorEnum, VendorEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'

interface IVideoNavbarProps {
    isOpen: boolean
    dispatchLiveVideoHook: Dispatch<ActionTypes>
    vendor: VendorEnum | null
    liveStreamUrl: string | null
    isSrNavbarLoaded: boolean
}

const VideoNavbarContainer = styled.div`
    box-sizing: border-box;
    width: calc(100% - 20px);
    box-shadow: 1px 1px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 50px;
    margin: 1px auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 12px;
`

const VideoNavbarItem = styled.div<{ hasVendor: boolean }>`
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => (props.hasVendor ? 'white' : 'rgba(0, 0, 0, 0.3)')};
    color: #666666;

    &:first-child {
        border-radius: 50px 0 0 50px;
        border-right: 1px solid #f6f6f6;
    }

    &:last-child {
        border-radius: 0 50px 50px 0;
        border-left: 1px solid #f6f6f6;
    }

    svg {
        width: 20px;
        height: 20px;
        margin-right: 7px;
    }

    &:first-child svg {
        path {
            fill: #4c9eea;
        }
    }

    &:nth-child(2) svg {
        path {
            fill: #666666;
        }
    }

    &:nth-child(3) svg {
        path {
            fill: #80b100;
        }
    }
`

const onClickHandler = (
    isClickable: boolean,
    dispatchLiveVideoHook: Dispatch<ActionTypes>,
    isShownVideoNavbar: boolean,
    currentVendorEnum: CurrentVendorEnum,
) => {
    isClickable && dispatchLiveVideoHook(toggleIsShownVideoNavbar(isShownVideoNavbar, currentVendorEnum))
}

const VideoNavbar: React.FC<IVideoNavbarProps> = ({
    isOpen,
    dispatchLiveVideoHook,
    vendor,
    liveStreamUrl,
    isSrNavbarLoaded,
}) => {
    const [isVideoLayoutOpened, setVideoLayoutOpened] = useState<boolean>(false)

    // auto expand video layout if source exist
    useEffect(() => {
        if (!isVideoLayoutOpened) {
            if (!!liveStreamUrl || !!vendor) {
                setVideoLayoutOpened(true)
            }

            if (!!liveStreamUrl) {
                onClickHandler(!!liveStreamUrl, dispatchLiveVideoHook, false, CurrentVendorEnum.LIVE_STREAM)
            } else if (!!vendor) {
                onClickHandler(!!vendor, dispatchLiveVideoHook, false, CurrentVendorEnum.BG)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [liveStreamUrl, vendor])

    if (!isOpen) {
        return null
    }

    return (
        <VideoNavbarContainer>
            <VideoNavbarItem
                hasVendor={!!liveStreamUrl}
                onClick={() =>
                    onClickHandler(!!liveStreamUrl, dispatchLiveVideoHook, false, CurrentVendorEnum.LIVE_STREAM)
                }>
                <LivePlayIcon1 />
                <div>视频直播</div>
            </VideoNavbarItem>
            <VideoNavbarItem
                hasVendor={!!vendor}
                onClick={() => onClickHandler(!!vendor, dispatchLiveVideoHook, false, CurrentVendorEnum.BG)}>
                <LiveVenueIcon1 />
                <div>动画直播</div>
            </VideoNavbarItem>
            <VideoNavbarItem
                hasVendor={isSrNavbarLoaded}
                onClick={() => {
                    if (isSrNavbarLoaded) {
                        dispatchLiveVideoHook(toggleIsShownVideoNavbar(false, CurrentVendorEnum.BG))
                        dispatchLiveVideoHook(toggleIsShownSrTabPopup())
                        document.body?.classList.add('no-scrolling')
                    }
                }}>
                <LiveAnalystIcon />
                <div>数据分析</div>
            </VideoNavbarItem>
        </VideoNavbarContainer>
    )
}

export default VideoNavbar
