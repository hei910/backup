import { ConvertedMatches, ConvertedSeason } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { SeasonInfo } from '@services/sportData/types'
import styled from 'styled-components/macro'
import DetailGameScroller from '../detailGameScroller'
import InplayBanner from './InplayBanner'
import RegularBanner from './RegularBanner'

interface ComponentProps {
    convertedData: ConvertedMatches
    fixtureId?: string
    seasonInfo: SeasonInfo
    seasonGames: ConvertedSeason[]
    locationMatchStatus?: string
}

const SWhiteContainer = styled.div<{ date?: string }>`
    background: #ffffff;
    ${(props) => props.date !== 'inplay' && 'margin-top: 10px;'}/* margin-top: 10px; */
`
const DetailBanner: React.FC<ComponentProps> = ({
    convertedData,
    seasonInfo,
    fixtureId,
    seasonGames,
    locationMatchStatus,
}) => {
    const { date } = useCustomParams()
    const detailSwitcher = () => {
        switch (date) {
            case 'today':
            case 'all':
            case 'future':
                return <RegularBanner convertedData={convertedData} fixtureId={fixtureId} />
            // changed to inplay banner for developedment
            case 'inplay':
                return <InplayBanner convertedData={convertedData} fixtureId={fixtureId} />
            default:
                return <RegularBanner convertedData={convertedData} fixtureId={fixtureId} />
        }
    }
    return (
        <>
            <DetailGameScroller
                seasonInfo={seasonInfo}
                seasonGames={seasonGames}
                convertedData={convertedData}
                locationMatchStatus={locationMatchStatus}
            />
            <SWhiteContainer date={date}>{detailSwitcher()}</SWhiteContainer>
        </>
    )
}

export default DetailBanner
