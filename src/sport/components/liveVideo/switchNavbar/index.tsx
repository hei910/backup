import SwitchNavbarMobile from '@sport/components/liveVideo/switchNavbar/mobile'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React from 'react'
import { RootState, useSelector } from '@redux'
import { CurrentVendorEnum } from '@services/sportLive/types'

export interface ISwitchNavbarProps {
    currentVendor: CurrentVendorEnum | null
    switchLiveSport: React.Dispatch<ActionTypes>
    isShownToggleBar?: boolean
    isShownSrTabPopup?: boolean
    isSrNavbarLoaded?: boolean
}

const SwitchNavbar: React.FC<ISwitchNavbarProps> = (props) => {
    const isCloseLiveCenter = useSelector((state: RootState) => state.sportLive.isCloseLiveCenter)

    if (isCloseLiveCenter) {
        return null
    }

    return <SwitchNavbarMobile {...props} />
}

export default SwitchNavbar
