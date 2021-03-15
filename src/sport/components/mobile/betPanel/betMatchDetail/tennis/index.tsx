import { ConvertedMatches } from '@sport/converters/types'
import React from 'react'
import { filterMarket, newDetailMarketCode } from '@sport/util/dataProcess'
import TableAh from '../TableAh'
import TableCommon from '../TableCommon'
import TableCs from '../TableCs'
import TableOe from '../TableOe'
import TableOu from '../TableOu'

interface ComponentProps {
    convertedData: ConvertedMatches
    fixtureId?: string
}

interface BetMatchSwitcherProps {
    marketCodeList: (undefined | string)[]
    convertedData: ConvertedMatches
    fixtureId?: string
}

const TennisDetailSwitcher: React.FC<BetMatchSwitcherProps> = ({ marketCodeList, convertedData, fixtureId }) => {
    const matchList = convertedData?.events.filter((data) => data.ctid === 0)[0]
    const TennisSwitcher = (marketCode?: string) => {
        const header = () => {
            if (marketCode) {
                return filterMarket(matchList?.markets, marketCode)?.[0]?.header
            }
        }

        switch (marketCode) {
            case 'ah':
            case 'ahfts':
            case 'ahs1':
            case 'ahs2':
            case 'ahs3':
            case 'ahs4':
            case 'ahs5':
            case 'ml':
            case 'mls1':
            case 'mls2':
            case 'mls3':
            case 'mls4':
            case 'mls5':
                return <TableAh data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'oufts':
            case 'ous1':
            case 'ous2':
            case 'ous3':
            case 'ous4':
            case 'ous5':
                return <TableOu data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'sb':
                return <TableCs data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'oefts':
                return <TableOe data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            default:
                return <TableCommon data={matchList} marketCode={marketCode ?? ''} ctid={0} />
        }
    }

    return (
        <>
            {marketCodeList && marketCodeList.length > 0 && (
                <>
                    {marketCodeList.map((marketCode, index) => (
                        <React.Fragment key={`tennis-marketCode-switcher-${index}`}>
                            {TennisSwitcher(marketCode)}
                        </React.Fragment>
                    ))}
                </>
            )}
        </>
    )
}

const TennisDetail: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    return (
        <>
            {convertedData?.events?.[0]?.markets?.length > 0 && (
                <TennisDetailSwitcher
                    marketCodeList={newDetailMarketCode(convertedData?.events)}
                    convertedData={convertedData}
                    fixtureId={fixtureId}
                />
            )}
        </>
    )
}

export default TennisDetail
