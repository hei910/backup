import { ConvertedMatches } from '@sport/converters/types'
import React from 'react'
import { filterMarket, newDetailCtid, newDetailMarketCode } from '@sport/util/dataProcess'
import CtidMarketCodeSwitcher from '../football/CtidMarketCodeSwitcher'
import Table1x2 from '../Table1x2'
import TableAh from '../TableAh'
import TableCommon from '../TableCommon'
import TableOe from '../TableOe'
import TableOu from '../TableOu'

interface ComponentProps {
    convertedData: ConvertedMatches
    fixtureId?: string
}

interface BetMatchSwitcherProps {
    marketCodeList: (undefined | string)[]
    ctidList: number[]
    convertedData: ConvertedMatches
    fixtureId?: string
}

const BaseballDetailSwitcher: React.FC<BetMatchSwitcherProps> = ({
    marketCodeList,
    convertedData,
    ctidList,
    fixtureId,
}) => {
    // const { sports } = useCustomParams();
    const matchList = convertedData.events.filter((data) => data.ctid === 0)[0]
    // console.log(matchList);
    // const competitors = matchList.competitors;
    const BaseballSwitcher = (marketCode?: string) => {
        const header = () => {
            if (marketCode) {
                return filterMarket(matchList?.markets, marketCode)?.[0]?.header
            }
        }

        switch (marketCode) {
            case 'ah':
            case 'ahf5in':
            case 'ahfin':
            case 'ml':
                return <TableAh data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'oe':
                return <TableOe data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'ou':
            case 'ouf5in':
            case 'oufin':
                return <TableOu data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            // case '10001': // 胜平负'
            // case '1000253': // 哪只球队赢得比赛余下部分'
            // case '1000268': // 是否会有额外回合
            // case '1000255': // 输赢比 (incl. extra innings)
            // case '1000262': // 总数 (over-exact-under) (incl. extra innings)'
            // case '1000264': // 奇数/偶数 (incl. extra innings)
            // case '1000269': // 基乌姆英雄 第九局击球
            // case '1000270': // 赢的更多回合的队'
            // case '1000271': // 局得分最高的球队'
            // case '1000272': // 得分最高的局'
            // case '1000284': // 回合 7 到 9 - 总数'
            // case '1000285': // 回合 7 到 9 - 基乌姆英雄 总数'
            // case '1000286': // 回合 7 到 9 - 斗山熊 总数'
            // case '1000288': // 第8 回合 - 总数'
            // case '1000738': // 比赛什么时候决定'
            // case '1000740': // 总未失分'
            // case '1000741': // 两队高于 6.5 (incl. extra innings)'
            // case '1000274': // 1 到 5 回合 - 1x2
            // return (
            //     <TableSingleRow data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            // );
            case '1x2':
                return <Table1x2 data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            // case '1000254': // 盘口 0:3 (incl. extra innings)'
            // case '1000266': // 第17 跑 (incl. extra innings)'
            // case '1000743': // 回合 7 到 9 - 1x2'
            // case '1000744': // 回合 7 到 9 - 盘口'
            // case '1000745': // 回合 7 到 9 - 奇数/偶数'
            // case '1000746': // 第8 回合 - 盘口'
            default:
                return <TableCommon data={matchList} marketCode={marketCode ?? ''} ctid={0} />
        }
    }

    const baseballCtidSwitcher = (ctid: number) => {
        return (
            <>
                {ctid !== 0 && (
                    <>
                        <CtidMarketCodeSwitcher data={convertedData.events} ctid={ctid} />
                    </>
                )}
            </>
        )
    }

    return (
        <>
            {marketCodeList && marketCodeList.length > 0 && (
                <>
                    {marketCodeList.map((marketCode, index) => (
                        <React.Fragment key={`baseball-marketCode-switcher-${index}`}>
                            {BaseballSwitcher(marketCode)}
                        </React.Fragment>
                    ))}
                </>
            )}
            {ctidList && ctidList.length > 0 && (
                <>
                    {ctidList.map((ctid, index) => (
                        <React.Fragment key={`basketball-ctid-switcher-${index}`}>
                            {baseballCtidSwitcher(ctid)}
                        </React.Fragment>
                    ))}
                </>
            )}
        </>
    )
}

const BaseballDetail: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    return (
        <>
            {convertedData?.events?.[0]?.markets?.length > 0 && (
                <>
                    <BaseballDetailSwitcher
                        marketCodeList={newDetailMarketCode(convertedData.events)}
                        ctidList={newDetailCtid(convertedData.events)}
                        convertedData={convertedData}
                        fixtureId={fixtureId}
                    />
                </>
            )}
        </>
    )
}

export default BaseballDetail
