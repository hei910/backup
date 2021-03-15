import { StyleIFrame } from '@sport/components/liveVideo/styledIFrame'
import React, { Dispatch } from 'react'
import { useSelector, RootState } from '@redux'
import { CurrentVendorEnum, SportTypeEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import { Platform } from '@services/sportGlobal/types'
import SwitchNavbar from '@sport/components/liveVideo/switchNavbar'

interface ILiveVideoBGProps {
    bgURL: string | null
    currentVendor: CurrentVendorEnum | null
    switchLiveSport: Dispatch<ActionTypes>
    isShownToggleBar: boolean
}

//functions used by styled component
const containerHeightFormatter = (sportType: SportTypeEnum | null): string => {
    if (sportType === SportTypeEnum.Football) {
        return `293px`
    } else if (sportType === SportTypeEnum.Basketball) {
        return `288px`
    } else if (sportType === SportTypeEnum.Tennis) {
        return `291px`
    } else {
        return `288px`
    }
}

const StyleIFrameForBG = styled(StyleIFrame)<{ platform?: Platform }>`
    width: ${(props) => (props.platform === 'mobile' ? '100vw' : '100%')};
    height: ${(props) => `${containerHeightFormatter(props.sportType!)}`};
    position: relative;
    z-index: 3;
    display: block;
`

export const BetRadar: React.FC<ILiveVideoBGProps> = ({ bgURL, currentVendor, switchLiveSport, isShownToggleBar }) => {
    const sportType = useSelector((state: RootState) => state.sportLive.liveSportType)
    const isCloseLiveCenter = useSelector((state: RootState) => state.sportLive.isCloseLiveCenter)
    const platform = useSelector((state: RootState) => state.sportGlobal.platform)

    return (
        <>
            <StyleIFrameForBG
                platform={platform}
                title={'liveVideoPanelBG'}
                src={bgURL ? bgURL : ''}
                scrolling="no"
                isCloseLiveCenter={isCloseLiveCenter}
                sportType={sportType}
            />
            <SwitchNavbar
                currentVendor={currentVendor}
                switchLiveSport={switchLiveSport}
                isShownToggleBar={isShownToggleBar}
            />
        </>
    )
}
