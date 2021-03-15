import { ConvertedMatches } from '@sport/converters/types'
import React from 'react'
import { filterMarket, newDetailCtid, newDetailMarketCode } from '@sport/util/dataProcess'
import CtidMarketCodeSwitcher from '../football/CtidMarketCodeSwitcher'
import Table1x2 from '../Table1x2'
import TableAh from '../TableAh'
import TableCommon from '../TableCommon'
import TableOe from '../TableOe'
import TableOu from '../TableOu'
import TableTg from '../TableTg'

interface ComponentProps {
    convertedData: ConvertedMatches
    fixtureId?: string
}

interface BetMatchSwitcherProps {
    marketCodeList?: (undefined | string)[]
    ctidList?: number[]
    convertedData: ConvertedMatches
    fixtureId?: string
}

const BasketballDetailSwitcher: React.FC<BetMatchSwitcherProps> = ({
    marketCodeList,
    convertedData,
    ctidList,
    fixtureId,
}) => {
    const matchList = convertedData.events.filter((data) => data.ctid === 0)[0]
    const basketballSwitcher = (marketCode?: string) => {
        const header = () => {
            if (marketCode) {
                return filterMarket(matchList?.markets, marketCode)?.[0]?.header
            }
        }
        switch (marketCode) {
            case 'ah':
            case 'ah1st':
            case 'ahh2':
            case 'ahq1':
            case 'ahq2':
            case 'ahq3':
            case 'ahq4':
                return <TableAh data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'ml':
            case 'ml1st':
            case 'mlh2':
            case 'mlq1':
            case 'mlq2':
            case 'mlq3':
            case 'mlq4':
                return <Table1x2 data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'oe':
            case 'oe1st':
            case 'oeh2':
            case 'oeq1':
            case 'oeq2':
            case 'oeq3':
            case 'oeq4':
                return <TableOe data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            // case '10001': // 胜平负
            // case '10001057': // 第2 节-追赶第10 分
            // case '100011': // 平局返还
            // case '100015': // 输赢比数
            // case '100016': // 欧洲让球盘
            // case '100018': // 合计
            // case '100019': // 台湾啤酒 合计
            // case '100020': // 尤伦洛克森迪诺斯 合计
            // case '1000220': // 会有加时
            // case '100026': // 总进球数单/双
            // case '1000293': // 下半场 - 1x2 (incl. overtime)
            // case '1000563': // 60 分
            // case '100060': // 上半场 - 1x2
            // case '1000303': // 第2 一刻钟 - 盘口
            // case '1000236': // 第2 节 - 总数
            // case '1000235': // 第2 节 - 1x2
            // case '100014': // 不利 0:16
            // case '1000290': // 输赢比数(incl. overtime)'
            // case '1000297': // 总数 (over-exact-under)'
            case 'ou':
            case 'ouh2':
            case 'ou1st':
            case 'ouq1':
            case 'ouq2':
            case 'ouq3':
            case 'ouq4':
            case 't1ou':
            case 't2ou':
            case 't1ou1st':
            case 't2ou1st':
            case 't1ouq1':
            case 't1ouq2':
            case 't1ouq3':
            case 't1ouq4':
            case 't2ouq1':
            case 't2ouq2':
            case 't2ouq3':
            case 't2ouq4':
                return <TableOu data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            case 'AwayFinalScore_LastDigit':
            case 'HomeFinalScore_LastDigit':
                return <TableTg data={matchList} title={header() ?? marketCode} marketCode={marketCode} />
            default:
                return <TableCommon data={matchList} marketCode={marketCode ?? ''} ctid={0} />
        }
    }

    const basketballCtidSwitcher = (ctid: number) => {
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
            {marketCodeList && marketCodeList?.length > 0 && (
                <>
                    {marketCodeList.map((marketCode, index) => (
                        <React.Fragment key={`basketball-marketCode-switcher-${index}`}>
                            {basketballSwitcher(marketCode)}
                        </React.Fragment>
                    ))}
                </>
            )}
            {ctidList && ctidList.length > 0 && (
                <>
                    {ctidList.map((ctid, index) => (
                        <React.Fragment key={`basketball-ctid-switcher-${index}`}>
                            {basketballCtidSwitcher(ctid)}
                        </React.Fragment>
                    ))}
                </>
            )}
        </>
    )
}

const BasketballDetail: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    // console.log(convertedData);
    return (
        <>
            {convertedData && (
                <>
                    <BasketballDetailSwitcher
                        marketCodeList={newDetailMarketCode(convertedData.events)}
                        convertedData={convertedData}
                        ctidList={newDetailCtid(convertedData.events)}
                        fixtureId={fixtureId}
                    />
                </>
            )}
        </>
    )
}

export default BasketballDetail
