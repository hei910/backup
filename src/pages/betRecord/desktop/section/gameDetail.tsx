import useTranslation from '@hooks/useTranslation'
import { IConvertedData, IConvertedSportsData } from '@pages/betRecord/types'
import dayjs from 'dayjs'
import styled from 'styled-components/macro'
interface IGameDetailProps {
    metadata?: IConvertedSportsData[]
    cancelled: boolean | null
    page?: string
    gameTypeName?: string | null
    gameCode?: string | null
    processed: boolean | null
    data: IConvertedData
}

const STableBodyRowColumn = styled.td<{ status?: string; align?: string }>`
    width: auto;
    max-width: 255px;
    margin: 0;
    ${(props) => props.status === 'win' && `color: #397e00;`}
    ${(props) => props.status === 'lose' && `color: #ff0000;`}
    padding: 20px 10px;
    border-right: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    ${(props) => props.align === 'center' && `text-align: center;`}
`
const STableBodyColumRow = styled.div<{ margintop?: number; marginbottom?: number }>`
    ${(props) => props.marginbottom && `margin-bottom: ${props.marginbottom}px;`};
    width: 100%;
    word-break: break-all;
    line-height: 22px;
`
const SOutcome = styled.span`
    font-weight: bold;
`
const SCancelled = styled.span`
    font-weight: bold;
    color: #ff0000;
`

const BetRecordGameDetail: React.FC<IGameDetailProps> = ({
    metadata,
    cancelled,
    page,
    gameTypeName,
    gameCode,
    processed,
    data,
}) => {
    const t = useTranslation()
    if (page === undefined) {
        return <STableBodyRowColumn />
    }
    const isRegularSport = page === 'sportV1' || page === 'sportV2'
    const isEsport = page === 'avia' || page === 'esport'
    const isGamePlayNameOr = data.gamePlayName === '冠军盘口'
    return (
        <>
            {isRegularSport && (
                <STableBodyRowColumn>
                    {metadata !== undefined && (
                        <>
                            {metadata.length > 0 &&
                                metadata.map((sportsdata, index) => {
                                    const isGameCancelled =
                                        sportsdata?.status === 'CANCEL' ||
                                        sportsdata?.status === 'DANGEROUS_CANCEL' ||
                                        cancelled
                                    const cancelType = isGameCancelled
                                        ? sportsdata.status.toLowerCase().replace(/_/g, '')
                                        : ''
                                    const v1CancelReason = sportsdata?.cancelReason
                                    const cancelString =
                                        page === 'sportV2' && cancelType.length > 0
                                            ? `[${t(`betRecord.gameDetail.${cancelType}`)}]`
                                            : `[${v1CancelReason}]`

                                    const isGameSettled = sportsdata?.status === 'SETTLE' || processed
                                    const isOr = sportsdata?.homeTeam && sportsdata?.awayTeam

                                    return (
                                        <STableBodyColumRow
                                            key={`bet-record-gameDetail-column-${index}`}
                                            marginbottom={index + 1 !== metadata.length ? 20 : 0}>
                                            {sportsdata?.seasonName} {dayjs(sportsdata?.startTime).format('YYYY-MM-DD')}
                                            <br />
                                            {isOr ? `${sportsdata?.specifier}` : null}
                                            {isOr && <br />}
                                            {sportsdata?.marketName}
                                            <br />
                                            <SOutcome>
                                                {sportsdata?.outcomeName} @ {sportsdata?.odds}
                                            </SOutcome>
                                            {isGameCancelled && <SCancelled>{cancelString}</SCancelled>}
                                            <br />
                                            {!isGameCancelled && isGameSettled && !isGamePlayNameOr && (
                                                <>
                                                    ({t(`betRecord.gameDetail.outcome`)}: {sportsdata?.score?.homeScore}{' '}
                                                    - {sportsdata?.score?.awayScore})
                                                </>
                                            )}
                                        </STableBodyColumRow>
                                    )
                                })}
                        </>
                    )}
                </STableBodyRowColumn>
            )}
            {isEsport && (
                <>
                    {data.sportsData !== null && metadata !== undefined && (
                        <>
                            {metadata.length > 0 && (
                                <STableBodyRowColumn>
                                    {metadata.map((sportsdata, index) => {
                                        const isGameCancelled =
                                            sportsdata?.status === 'CANCEL' ||
                                            sportsdata?.status === 'DANGEROUS_CANCEL' ||
                                            cancelled
                                        const cancelType = isGameCancelled
                                            ? sportsdata.status.toLowerCase().replace(/_/g, '')
                                            : 'cancel'
                                        const cancelString = `[${t(`betRecord.gameDetail.${cancelType}`)}]`
                                        return (
                                            <STableBodyColumRow
                                                key={`bet-record-gameDetail-column-esports-${index}`}
                                                marginbottom={index + 1 !== metadata.length ? 20 : 0}>
                                                <span>
                                                    {sportsdata?.seasonName}{' '}
                                                    {dayjs(sportsdata?.startTime).format('YYYY-MM-DD')}
                                                </span>
                                                <br />
                                                <span>{sportsdata.match}</span>
                                                <br />
                                                <span>{sportsdata.marketName}</span>
                                                <br />
                                                <SOutcome>
                                                    {sportsdata.outcomeName}@{sportsdata.odds}
                                                </SOutcome>
                                                {isGameCancelled && <SCancelled>{cancelString}</SCancelled>}
                                            </STableBodyColumRow>
                                        )
                                    })}
                                </STableBodyRowColumn>
                            )}
                        </>
                    )}
                </>
            )}
            {!isRegularSport && !isEsport && (
                <STableBodyRowColumn align={'center'}>
                    {!page.includes('ag') && (gameTypeName ? gameTypeName : '--')}
                    {page.includes('ag') && (gameCode ? gameCode : '--')}
                </STableBodyRowColumn>
            )}
        </>
    )
}

export default BetRecordGameDetail
