import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import { liveSectionCodeMap } from '@sport/util/dictionary'

interface ComponentProps {
    liveStatus: string
    fontSize: number
    color: string
}

const SMainContainer = styled.div<{ fontSize: number }>`
    display: flex;
    flex-direction: row;
    align-items: center;
    ${(props) => `font-size: ${props.fontSize}px;`}/* font-size: 13px; */
`

const STriangleTop = styled.div<{ color: string }>`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 7px 4px;
    ${(props) => `border-color: transparent transparent ${props.color} transparent;`}
    margin-left: 6px;
`

const STriangleBottom = styled.div<{ color: string }>`
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 7px 4px 0 4px;
    ${(props) => `border-color: ${props.color} transparent transparent transparent;`}
    margin-left: 6px;
`

const SLiveStatusNumber = styled.div`
    text-align: center;
`

const BaseballLiveStatus: React.FC<ComponentProps> = ({ liveStatus, fontSize, color }) => {
    const { t } = useTranslation()
    const { sports } = useCustomParams()
    const baseballLiveStatus = (inning: string) => {
        if (inning === '' || inning === undefined) {
            return null
        }
        const topOrBottom = inning.split('in')?.[1]
        if (topOrBottom === 'top') {
            return (
                <>
                    <SLiveStatusNumber>{t(`liveStatus.baseball.${inning}`)}</SLiveStatusNumber>
                    <STriangleTop color={color} />
                </>
            )
        } else if (topOrBottom === 'bottom') {
            return (
                <>
                    <SLiveStatusNumber>{t(`liveStatus.baseball.${inning}`)}</SLiveStatusNumber>
                    <STriangleBottom color={color} />
                </>
            )
        } else {
            return <SLiveStatusNumber>{t(liveSectionCodeMap(sports, liveStatus))}</SLiveStatusNumber>
        }
    }

    return <SMainContainer fontSize={fontSize}>{baseballLiveStatus(liveStatus)}</SMainContainer>
}

export default BaseballLiveStatus
