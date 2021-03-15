import SportRadarMobile from '@sport/components/liveVideo/sportRadar/mobile'
import { ActionTypes } from '@sport/hooks/useLiveSportApi/types'
import React, { Dispatch } from 'react'
import { RootState, useSelector } from '@redux'
import { CurrentVendorEnum, SportTypeEnum } from '@services/sportLive/types'

interface ISportRadarProps {
    matchId: string
    sportType: SportTypeEnum
    widgetLoader: string
    currentVendor: CurrentVendorEnum | null
    switchLiveSport: Dispatch<ActionTypes>
    overlap: boolean
    isShownToggleBar: boolean
    isSrNavbarLoaded: boolean
    isShownSrTabPopup: boolean
}

const SportRadar: React.FC<ISportRadarProps> = (props) => {
    const platform = useSelector((state: RootState) => state.sportGlobal.platform)

    if (platform === 'mobile') {
        return <SportRadarMobile {...props} />
    } else {
        return null
    }
}

export default SportRadar
