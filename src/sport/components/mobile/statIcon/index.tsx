import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import { StatIcon } from '@sport/components/icons'
import { openStatisticPage } from '@sport/util/openStatisticPage'

const SStatIcon = styled(StatIcon)`
    width: 17px;
    height: 16px;
    margin-left: 3px;
    margin-bottom: 3px;
    cursor: pointer;
`

export interface LiveStatIconProps {
    sId: string,
    mId: string
}

const LiveStatIcon: React.FC<LiveStatIconProps> = ({ sId, mId }) => {

    const onStatIconClick = useCallback((e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        e.stopPropagation();
        openStatisticPage({ sId, mId })
    }, [sId, mId])

    return <SStatIcon onClick={onStatIconClick}/>
}

export default LiveStatIcon
