import { ConvertedEvent } from '@sport/converters/types'
import React from 'react'
import { ctidMarketCode, filterMarket, firstHalfCtidMarketCode, newOtherDetailGames } from '@sport/util/dataProcess'
import Table1x2 from '../Table1x2'
import TableAh from '../TableAh'
import TableCommon from '../TableCommon'
import TableOe from '../TableOe'
import TableOu from '../TableOu'
import TableTg from '../TableTg'

interface ComponentProps {
    data: ConvertedEvent[]
    ctid: number
    firstHalf?: boolean
}

const CtidMarketCodeSwitcher: React.FC<ComponentProps> = ({ data, ctid, firstHalf }) => {
    const ctidData = newOtherDetailGames(data, ctid)[0]
    const marketCodeList = ctidMarketCode(ctidData)
    const firstHalfMarketCodeList = firstHalfCtidMarketCode(ctidData)
    const header = (marketCode: string) => {
        return filterMarket(ctidData?.markets, marketCode)?.[0]?.header
    }

    const correctCompetitors = data.filter((fixture: ConvertedEvent) => fixture.ctid === 0)[0].competitors

    const teamGoalsSwitcher = (marketCode: string) => {
        switch (marketCode) {
            case 'ah':
            case 'ah1st':
            case 'ah2nd':
                return (
                    <TableAh
                        data={ctidData}
                        title={header(marketCode)}
                        marketCode={marketCode}
                        competitors={correctCompetitors}
                    />
                )
            case '1x2':
            case '1x21st':
            case '1x22nd':
                return (
                    <Table1x2
                        data={ctidData}
                        title={header(marketCode)}
                        marketCode={marketCode}
                        competitors={correctCompetitors}
                    />
                )
            case 'ou':
            case 'ou1st':
            case 'ouh2':
            case 'ouq1':
            case 'ouq2':
            case 'ouq3':
            case 'ouq4':
            case 'ousp':
            case 't1ou':
            case 't2ou':
                return <TableOu data={ctidData} title={header(marketCode)} marketCode={marketCode} />
            case 'oe':
            case 'oe1st':
            case 'oeh2':
            case 'oeq1':
            case 'oeq2':
            case 'oeq3':
            case 'oeq4':
            case 'oesp':
                return <TableOe data={ctidData} title={header(marketCode)} marketCode={marketCode} />
            case 'tg':
            case 'tg1st':
            case 'tgsp':
                return <TableTg data={ctidData} title={header(marketCode)} marketCode={marketCode} />
            default:
                return (
                    <TableCommon data={ctidData} marketCode={marketCode} ctid={ctid} competitors={correctCompetitors} />
                )
        }
    }

    return (
        <>
            {!firstHalf && (
                <>
                    {marketCodeList && marketCodeList.length > 0 && (
                        <>
                            {marketCodeList.map((marketCode, index) => (
                                <React.Fragment key={`CtidMarketCodeSwitcher-${marketCode}-${index}`}>
                                    {teamGoalsSwitcher(marketCode)}
                                </React.Fragment>
                            ))}
                        </>
                    )}
                </>
            )}
            {firstHalf && (
                <>
                    {firstHalfMarketCodeList && firstHalfMarketCodeList.length > 0 && (
                        <>
                            <>
                                {firstHalfMarketCodeList.map((marketCode, index) => (
                                    <React.Fragment key={`CtidMarketCodeSwitcher-${marketCode}-${index}`}>
                                        {teamGoalsSwitcher(marketCode)}
                                    </React.Fragment>
                                ))}
                            </>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default CtidMarketCodeSwitcher
