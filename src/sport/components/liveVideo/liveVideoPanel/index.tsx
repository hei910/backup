import SportRadar from '@sport/components/liveVideo/sportRadar'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React, { Dispatch } from 'react'
import { CurrentVendorEnum, SportTypeEnum, VendorEnum } from '@services/sportLive/types'
import { BetRadar } from '../betRadar'
import { LiveStream } from '../liveStream'

interface ILiveVideoPanelProps {
    vendor: VendorEnum | null
    currentVendor: CurrentVendorEnum | null
    midToRid: string | null
    bgURL: string | null
    liveStreamUrl: string | null
    sportType: SportTypeEnum | null
    widgetLoader: string | null
    overlap: boolean
    switchLiveSport: Dispatch<ActionTypes>
    isShownToggleBar: boolean
    isSrNavbarLoaded: boolean
    isShownSrTabPopup: boolean
}

const LiveVideoPanel: React.FC<ILiveVideoPanelProps> = ({
    vendor,
    currentVendor,
    midToRid,
    bgURL,
    liveStreamUrl,
    sportType,
    widgetLoader,
    overlap,
    switchLiveSport,
    isShownToggleBar,
    isSrNavbarLoaded,
    isShownSrTabPopup,
}) => {
    if (vendor === VendorEnum.BG) {
        if (currentVendor === CurrentVendorEnum.BG) {
            return (
                <BetRadar
                    bgURL={bgURL}
                    currentVendor={currentVendor}
                    switchLiveSport={switchLiveSport}
                    isShownToggleBar={isShownToggleBar}
                />
            )
        } else if (currentVendor === CurrentVendorEnum.LIVE_STREAM) {
            return (
                <LiveStream
                    currentVendor={currentVendor}
                    liveStreamUrl={liveStreamUrl ? liveStreamUrl : ''}
                    switchLiveSport={switchLiveSport}
                    isShownToggleBar={isShownToggleBar}
                />
            )
        } else {
            return null
        }
    } else if (vendor === VendorEnum.SR && sportType !== SportTypeEnum.Baseball) {
        return (
            <React.Fragment>
                {liveStreamUrl && overlap && (
                    <LiveStream
                        liveStreamUrl={liveStreamUrl}
                        currentVendor={currentVendor}
                        switchLiveSport={switchLiveSport}
                        isShownToggleBar={isShownToggleBar}
                        isSrNavbarLoaded={isSrNavbarLoaded}
                        isShownSrTabPopup={isShownSrTabPopup}
                    />
                )}

                {midToRid && sportType && widgetLoader && (
                    <SportRadar
                        switchLiveSport={switchLiveSport}
                        currentVendor={currentVendor}
                        matchId={midToRid}
                        sportType={sportType}
                        widgetLoader={widgetLoader}
                        overlap={overlap}
                        isShownToggleBar={isShownToggleBar}
                        isSrNavbarLoaded={isSrNavbarLoaded}
                        isShownSrTabPopup={isShownSrTabPopup}
                    />
                )}
            </React.Fragment>
        )
    } else if (liveStreamUrl) {
        return (
            <LiveStream
                switchLiveSport={switchLiveSport}
                currentVendor={currentVendor}
                liveStreamUrl={liveStreamUrl ? liveStreamUrl : ''}
            />
        )
    } else {
        return null
    }
}

export default LiveVideoPanel
