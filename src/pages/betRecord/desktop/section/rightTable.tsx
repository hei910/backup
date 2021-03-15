import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import {
    allBet,
    allLotteryBet,
    allSportsBet,
    allSportsBetWithSettle,
    bgagBet,
    dtkynnBet,
    eSportsBet,
    eSportsBetWithSettle,
    lotterySettledBet,
    lotteryUnsettledBet,
    mgBet,
    TableColumns,
} from '../constants'
import { IConvertedData } from '../../types'
import {
    BetRecordBetAmount,
    BetRecordBetCategory,
    BetRecordBetDetail,
    BetRecordBetGame,
    BetRecordBetGamePlay,
    BetRecordBetVersion,
    BetRecordCategory,
    BetRecordChoice,
    BetRecordDate,
    BetRecordGameCategory,
    BetRecordGameResult,
    BetRecordOrderNumber,
    BetRecordRoundNumber,
    BetRecordSettle,
    BetRecordSeries,
    BetRecordStatus,
    BetRecordWinable,
    BetRecordWinLose,
} from './tableColumn'
import React from 'react'

interface IComponentProp {
    page: string
    data: IConvertedData[]
    haveEarlySettle: boolean
}

interface IHeaderProp {
    header: string
    haveEarlySettle: boolean
}

const SMainContainer = styled.table`
    width: 100%;
    border-collapse: collapse;
`
const STableHeader = styled.tr`
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.page.desktop.betRecord.tableHeader.border};
    background: ${(props) => props.theme.colors.page.desktop.betRecord.tableHeader.bgColor};
    color: ${(props) => props.theme.colors.page.desktop.betRecord.tableHeader.color};
    align-items: center;
    font-size: 14.4px;
`
const SHeaderSection = styled.td`
    width: auto;
    justify-content: center;
    padding: 10px 10px 9px 10px;
    border: 1px solid ${(props) => props.theme.colors.page.desktop.betRecord.header.border};
    text-align: center;
    white-space: nowrap;
`
const STableCrossCol = styled.td`
    width: 100%;
    border-bottom: 1px solid #d7d7d7;
    border-left: 1px solid #d7d7d7;
    border-right: 1px solid #d7d7d7;
    height: 88px;
    padding: 32px 22px;
    text-align: center;
    font-weight: 100;
    column-span: all;
`
const STableBodyRow = styled.tr`
    width: 100%;
    border-left: 1px solid #d7d7d7;
`
const TableHeader: React.FC<IHeaderProp> = ({ header, haveEarlySettle }) => {
    const t = useTranslation()
    if (header === 'settle' && !haveEarlySettle) {
        return <SHeaderSection />
    } else {
        return <SHeaderSection>{t(`betRecord.${header}`)}</SHeaderSection>
    }
}

const RightTable: React.FC<IComponentProp> = ({ page, data, haveEarlySettle }) => {
    const t = useTranslation()
    const getHeader = () => {
        switch (page) {
            case 'all-bet':
                return allBet
            case 'sports-settled-bet':
                return allSportsBet
            case 'esport':
                return eSportsBet
            case 'esport-unsettled-bet':
            case 'esport-settled-bet':
                return eSportsBetWithSettle
            case 'sports-unsettled-bet':
            case 'sportV2':
                return allSportsBetWithSettle
            case 'bg':
            case 'ag':
                return bgagBet
            case 'mg':
                return mgBet
            case 'dt':
            case 'pt':
            case 'pg':
            case 'cq9':
            case 'jdb':
            case 'ky':
            case 'nn':
                return dtkynnBet
            case 'loto':
                return allLotteryBet
            case 'lottery-settled-bet':
                return lotterySettledBet
            case 'lottery-unsettled-bet':
                return lotteryUnsettledBet
            default:
                return allSportsBet
        }
    }

    const getTableColumn = (columnType: string, data: IConvertedData, index: number) => {
        switch (columnType) {
            case TableColumns.SERIAL:
                return <BetRecordSeries data={data} page={page} index={index} />
            case TableColumns.BET_AMOUNT:
                return <BetRecordBetAmount data={data} />
            case TableColumns.BET_CATEGORY:
                return <BetRecordBetCategory data={data} />
            case TableColumns.BET_DETAIL:
                return <BetRecordBetDetail data={data} />
            case TableColumns.BET_GAME:
                return <BetRecordBetGame data={data} />
            case TableColumns.BET_GAME_PLAY:
                return <BetRecordBetGamePlay data={data} />
            case TableColumns.BET_VERSION:
                return <BetRecordBetVersion data={data} />
            case TableColumns.CATEGORY:
                return <BetRecordCategory data={data} />
            case TableColumns.CHOICE:
                return <BetRecordChoice data={data} />
            case TableColumns.DATE:
                return <BetRecordDate data={data} />
            case TableColumns.GAME_CATEGORY:
                return <BetRecordGameCategory data={data} />
            case TableColumns.GAME_RESULT:
                return <BetRecordGameResult data={data} />
            case TableColumns.ORDER_NUMBER:
                return <BetRecordOrderNumber data={data} />
            case TableColumns.ROUND_NUMBER:
                return <BetRecordRoundNumber data={data} />
            case TableColumns.SETTLE:
                return <BetRecordSettle data={data} />
            case TableColumns.STATUS:
                return <BetRecordStatus data={data} />
            case TableColumns.CAN_WIN_AMOUNT:
            case TableColumns.WINABLE:
                return <BetRecordWinable data={data} />
            case TableColumns.WIN_LOSE:
                return <BetRecordWinLose data={data} />
            default:
                return <></>
        }
    }
    return (
        <SMainContainer>
            <STableHeader>
                {getHeader()?.map((header, index) => (
                    <TableHeader
                        header={header}
                        haveEarlySettle={haveEarlySettle}
                        key={`betRecord-rightTable-header-${index}`}
                    />
                ))}
            </STableHeader>
            {data?.length === 0 && (
                <STableBodyRow>
                    <STableCrossCol colSpan={10}>{t(`betRecord.noData`)}</STableCrossCol>
                </STableBodyRow>
            )}
            {data?.length > 0 && (
                <>
                    {data.map((info, index) => {
                        return (
                            <STableBodyRow key={`betRecord-rightTable-body-${index}`}>
                                {getHeader().map((column, cIndex) => (
                                    <React.Fragment key={`betRecord-rightTable-body-${index}-${cIndex}`}>
                                        {getTableColumn(column, info, index)}
                                    </React.Fragment>
                                ))}
                            </STableBodyRow>
                        )
                    })}
                </>
            )}
        </SMainContainer>
    )
}

export default RightTable
