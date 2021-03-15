import { LiveVenueIcon1, MobileInplayIcon } from '@sport/components/icons'
import React from 'react'
import { RootState, useSelector } from '@redux'
import { MatchApiSportType } from '@services/sportData/types'
import { matchApiSportTypeToSportTypeEnum } from '@services/sportLive/actions'
import { SportIconEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'
import { shouldRenderLiveIcon } from '@sport/util/general'

const SSRIcon = styled(LiveVenueIcon1)`
    width: 24px;
    height: auto;
    margin-left: 3px;
    cursor: pointer;

    path,
    .st3 {
        fill: ${(props) => props.theme.sport.colors.table.column.icon};
    }
`
const SLiveIcon = styled(MobileInplayIcon)`
    width: 24px;
    height: auto;
    margin-left: 3px;
    cursor: pointer;

    .st0 {
        fill: #7e7e7e;
    }

    .st1 {
        fill: #ffffff;
    }

    .st2 {
        fill: #4699d4;
    }
`

export interface LiveStreamIconProps {
    fixtureId: string
    matchId: string
    source: string
    sports: MatchApiSportType | ''
}

const LiveStreamIcon: React.FC<LiveStreamIconProps> = ({ matchId, sports, fixtureId, source }) => {
    const liveData = useSelector((store: RootState) => store.sportLive.allBgSrLiveStreamData?.[sports || 'football'])
    const iconType = shouldRenderLiveIcon(source, matchId, liveData, matchApiSportTypeToSportTypeEnum(sports))

    const Icon = () => {
        switch (iconType) {
            case SportIconEnum.AnimationIcon:
                return <SSRIcon />
            case SportIconEnum.LiveIcon:
                return <SLiveIcon />
            case SportIconEnum.None:
            default:
                return null
        }
    }

    const IconMemo = React.memo(Icon)

    return <IconMemo />
}

export default React.memo(LiveStreamIcon)
