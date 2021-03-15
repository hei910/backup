import { LoadingIcon } from '@sport/components/icons'
import LiveVideoPanel from '@sport/components/liveVideo/liveVideoPanel'
import {
    ILiveVideoProps,
    LiveContainer,
    LoadingSpinContainer,
    LoadingWrapper,
} from '@sport/components/liveVideo/SLiveVideo'
import VideoNavbar from '@sport/components/liveVideo/videoNavbar'
import useLiveSportApi from '@sport/hooks/useLiveSportApi'
import React from 'react'
import { useSelector } from '@redux'

const LiveVideo: React.FC<ILiveVideoProps> = ({ matchIdFromProps, sportTypeFromProps, sourceFromProps }) => {
    const sourceFromStore = useSelector((state) => state.sportLive.source)
    const liveMatchIdFromStore = useSelector((state) => state.sportLive.liveMatchId)
    const liveSportTypeStore = useSelector((state) => state.sportLive.liveSportType)
    const isCloseLiveCenter = useSelector((state) => state.sportLive.isCloseLiveCenter)
    const platform = useSelector((state) => state.sportGlobal.platform)

    const matchId = liveMatchIdFromStore || matchIdFromProps || null
    const sportType = liveSportTypeStore || sportTypeFromProps || null
    const source = sourceFromStore || sourceFromProps || null

    const host = window.location.host

    const {
        vendor,
        currentVendor,
        midToRid,
        bgURL,
        liveStreamUrl,
        widgetLoader,
        isShownToggleBar,
        overlap,
        isShownVideoNavbar,
        isSrNavbarLoaded,
        isShownSrTabPopup,
        dispatchLocalState,
    } = useLiveSportApi(source, matchId, sportType, host, platform)

    if (matchId && sportType) {
        return (
            <>
                <VideoNavbar
                    dispatchLiveVideoHook={dispatchLocalState}
                    isOpen={isShownVideoNavbar}
                    vendor={vendor}
                    liveStreamUrl={liveStreamUrl}
                    isSrNavbarLoaded={isSrNavbarLoaded}
                />
                {(vendor || liveStreamUrl) && (
                    <LiveContainer isCloseLiveCenter={isCloseLiveCenter} isShownVideoNavbar={isShownVideoNavbar}>
                        {!isCloseLiveCenter && (
                            <LoadingSpinContainer platform={platform}>
                                <LoadingWrapper>
                                    <LoadingIcon />
                                </LoadingWrapper>
                            </LoadingSpinContainer>
                        )}

                        <LiveVideoPanel
                            vendor={vendor}
                            currentVendor={currentVendor}
                            midToRid={midToRid}
                            bgURL={bgURL}
                            liveStreamUrl={liveStreamUrl}
                            sportType={sportType}
                            widgetLoader={widgetLoader}
                            overlap={overlap}
                            switchLiveSport={dispatchLocalState}
                            isShownToggleBar={isShownToggleBar}
                            isSrNavbarLoaded={isSrNavbarLoaded}
                            isShownSrTabPopup={isShownSrTabPopup}
                        />
                    </LiveContainer>
                )}
            </>
        )
    }

    return null
}

export default LiveVideo
