import { ConvertedEvent } from '@sport/converters/types'
import React from 'react'
import { filterMarket } from '@sport/util/dataProcess'
import Table1x2 from '../Table1x2'
import TableAh from '../TableAh'
import TableAnytimeGoalScorer from '../TableAnytimeGoalScorer'
import TableCommon from '../TableCommon'
import TableCs from '../TableCs'
import TableDoubleChance from '../TableDoubleChance'
import TableFT1x2OU from '../TableFT1x2OU'
import TableHtft from '../TableHtft'
import TableOe from '../TableOe'
import TableOu from '../TableOu'
import TableSingleRow from '../TableSingleRow'
import TableSubHeaderSingleRow from '../TableSubHeaderSingleRow'
import TableTg from '../TableTg'
import TableTts from '../TableTts'

interface ComponentProps {
    marketCode: string
    data: ConvertedEvent[]
    fixtureId?: string
    matches: any
}
const MarketCodeSwitcher: React.FC<ComponentProps> = ({ data, fixtureId, matches, marketCode }) => {
    const matchList = data.filter((data) => data.ctid === 0)[0]
    const header = filterMarket(matchList?.markets, marketCode)?.[0]?.header

    const marketCodeSwitcher = () => {
        switch (marketCode) {
            case 'ah':
            case 'ah1st':
            case 'ah2nd':
                return <TableAh data={matchList} title={header} marketCode={marketCode} />
            case 'ahsp':
                return <TableSubHeaderSingleRow data={matchList} title={header} marketCode={marketCode} />
            case 'cs':
            case 'cs1st':
            case 'cssp':
                return <TableCs data={matchList} title={header} marketCode={marketCode} />
            case 'ou':
            case 'ou1st':
            case 't1ou':
            case 't2ou':
            case 't1ou1st':
            case 't2ou1st':
                return <TableOu data={matchList} title={header} marketCode={marketCode} />
            case '1x2':
            case '1x21st':
            case '1x22nd':
                return <Table1x2 data={matchList} title={header} marketCode={marketCode} />
            case 'oe':
            case 'oe1st':
                return <TableOe data={matchList} title={header} marketCode={marketCode} />
            case 'tg':
            case 'tg1st':
            case 'tgsp':
                return <TableTg data={matchList} title={header} marketCode={marketCode} />
            case 'DoubleChance':
                return <TableDoubleChance data={matchList} title={header} marketCode={marketCode} />
            case 'BothTeamsToScore':
            case 'bts':
                return <TableSingleRow data={matchList} title={header} marketCode={marketCode} />
            case 'FT_1X2_And_FT_OU_1p5':
            case 'FT_1X2_And_FT_OU_2p5':
            case 'FT_1X2_And_FT_OU_3p5':
            case 'FT_1X2_And_FT_OU_4p5':
                return <TableFT1x2OU data={matchList} title={header} marketCode={marketCode} />
            case 'tts1st':
            case 'ttslast':
                return <TableTts data={matchList} title={header} marketCode={marketCode} />
            case 'hf':
                return <TableHtft data={matchList} title={header} marketCode={marketCode} />
            case 'scoant':
                return <TableAnytimeGoalScorer data={matchList} title={header} marketCode={'AnytimeGoalScorer'} />
            default:
                return <TableCommon data={matchList} marketCode={marketCode} ctid={0} />
        }
    }
    return <>{marketCodeSwitcher()}</>
}

export default MarketCodeSwitcher
