import React from 'react'
import { useTranslation } from 'react-i18next'
import { BetRecord, BetRecordBetData, BetRecordDetail } from '@services/sportBet/types'
import { FixtureStatus } from '@services/sportData/types'
import styled from 'styled-components/macro'
import {
    getBetInfo,
    getBetResultAmount,
    getBetResultOutcomeName,
    getCompetitionResult,
    getLiveScore,
    getSpecifier,
} from '@sport/util/betRecord'
import { matchStatusMap } from '@sport/util/dictionary'
import { ParlayExpandRecordList, SingleExpandRecordList } from './ExpandRecordList'

interface BetRecordItemProps {
    id: number
    data: BetRecord
    settled: boolean
    isExpanded: boolean
    toggleExpand: (id: number) => void
}

interface ParlayBetInfoProps {
    data: BetRecordDetail[]
}

interface SingleBetInfoProps {
    data: BetRecordDetail
    result: BetRecordBetData
    isWin: boolean
    isExpanded: boolean
    settled: boolean
}

const BetRecordContainer = styled.div`
    font-size: 13.3px;
    border-bottom: 1px solid #cccccc;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    word-break: break-all;
`

const BetRecordCompulsory = styled.div`
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

const BetRecordLeftSubContainer = styled.div`
    flex: 1;
`

const BetRecordRightSubContainer = styled.div`
    width: 40px;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
`

const AnteAmount = styled.span`
    color: #1ebf0e;
`

const BetRecordResultWrapper = styled.div<
    { isWin: boolean; isExpanded: boolean } & React.HTMLAttributes<HTMLDivElement>
>`
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-weight: ${(props) => (props.isWin ? '600' : '400')};
    width: auto;
    max-width: calc(100% - 218px);
    pointer-events: none;
    word-break: break-all;
    overflow: hidden;
    white-space: ${(props) => (props.isExpanded ? 'initial' : 'nowrap')};
    text-overflow: ${(props) => (props.isExpanded ? 'initial' : 'ellipsis')};
`

const BetRecordExpandButton = styled.button<{ isExpanded: boolean } & React.HTMLAttributes<HTMLButtonElement>>`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => (props.isExpanded ? '45px' : '30px')};
    border: 0px;
    padding: 0px;
    box-sizing: border-box;
    background-color: transparent;
`

const ExpandRecordContainer = styled.div`
    padding: 0px 10px;
`

const BetRecordInfoItem = styled.div`
    line-height: 24px;
`

const BetRecordInfoItemBold = styled.div`
    line-height: 24px;
    font-weight: 600;
`

const BetRecordSpanHighlight = styled.span<{ bold?: boolean } & React.HTMLAttributes<HTMLSpanElement>>`
    color: #e51717;
    font-weight: ${(props) => (props.bold ? 700 : 500)};
`

/**
 * Display parlay bet info that will display even not expanded
 * @param data - list of parlay info
 */
const ParlayBetInfo: React.FC<ParlayBetInfoProps> = ({ data }) => {
    return (
        <>
            {data.map((info) => (
                <BetRecordInfoItem key={`bet-record-parlay-container-${info.fixtureId}`}>
                    <BetRecordSpanHighlight>{getBetInfo(info)}</BetRecordSpanHighlight>
                    {` @ `}
                    <BetRecordSpanHighlight bold={true}>{info.odds}</BetRecordSpanHighlight>
                </BetRecordInfoItem>
            ))}
        </>
    )
}

/**
 * Display single bet info that will display even not expanded
 * @param data - list of parlay info
 * @param result - bet data that contains match result
 * @param isWin - true if the bet is win
 * @param settled - true if match is finished
 * @param isExpanded - true if the bet info is expanded
 */
const SingleBetInfo: React.FC<SingleBetInfoProps> = ({ data, result, isWin, settled, isExpanded }) => {
    const { t } = useTranslation()
    const language = window.localStorage.getItem('language')
    const { odds, outcomeName, homeTeam, awayTeam, marketCode, seasonName, specifier } = data

    const resultOutCome = getBetResultOutcomeName(result, language ?? 'zh')
    const isShowResult = !result.voidReason && (!settled || (resultOutCome && result.marketId !== 'or'))
    return (
        <>
            {marketCode === 'or' ? (
                <BetRecordInfoItemBold>{seasonName}</BetRecordInfoItemBold>
            ) : (
                <BetRecordInfoItem>{`${homeTeam} vs ${awayTeam}${getLiveScore(data)}`}</BetRecordInfoItem>
            )}
            <BetRecordInfoItem>
                <BetRecordSpanHighlight>
                    {`${outcomeName}${getSpecifier(marketCode, specifier)}`}
                </BetRecordSpanHighlight>
                {` @ `}
                <BetRecordSpanHighlight bold={true}>{odds}</BetRecordSpanHighlight>
            </BetRecordInfoItem>
            {isShowResult && (
                <BetRecordResultWrapper isWin={settled && isWin} isExpanded={isExpanded}>
                    {`${t('betRecord.result')}: ${settled ? resultOutCome ?? t('betRecord.unknown') : '-'}`}
                </BetRecordResultWrapper>
            )}
        </>
    )
}

const BetRecordItem: React.FC<BetRecordItemProps> = ({ id, data, settled, isExpanded, toggleExpand }) => {
    const { t } = useTranslation()

    try {
        const {
            uuid,
            totalAnte,
            createTime,
            estimatedWinnings,
            metadataJson,
            numMatch,
            numCombination,
            multiples,
            totalPayoutAmount,
            betData,
            confirmStatus,
            isCancelled,
        } = data

        const betRecordData: BetRecordDetail | BetRecordDetail[] = metadataJson.metadata
        const isParlay = numMatch > 1
        const isWin = totalPayoutAmount >= totalAnte

        const targetRecord: BetRecordDetail = Array.isArray(betRecordData) ? betRecordData[0] : betRecordData

        const { marketCode, marketName, sportType, live, seasonName, header } = targetRecord

        const combination = isParlay
            ? multiples
                ? `${numMatch}${t('parlayType.combine')}${numCombination}`
                : `${metadataJson.composition[0]}${t('parlayType.combine')}1`
            : ''

        let label = `${t(matchStatusMap[live ? FixtureStatus.Live : ''])} ${header ?? marketName}`
        if (isParlay) {
            label = t(`parlayType.${multiples ? 'multiple' : 'single'}`)
        } else if (marketCode === 'tgsp') {
            label = data.label
        } else if (marketCode === 'or') {
            label = `${t('competition.outrights')} (${marketName})`
        }

        const betTitle = `${
            isParlay
                ? `${numMatch}${t('betRecord.numOfMatch')}${label} ${combination}`
                : `${t(`betRecord.sport.${sportType}`)} ${label}`
        }`

        /**
         * Return one of the case
         * 1. canceled with reason OR 'win/lose' of whole ticket for parlay ticket
         * 2. canceled with reason OR bet result(can be winHalf, loseHalf, tie...) of the match for single ticket
         */
        const getBetResult = isCancelled ? (
            <BetRecordInfoItemBold>{`${t(`betRecord.voidReason.cancelled`)} ${t(
                `betRecord.voidReason.${betData.length === 1 && betData[0].voidReason}`,
                t('betRecord.voidReason.UnknownReason'),
            )}`}</BetRecordInfoItemBold>
        ) : (
            <BetRecordInfoItem>
                {`${
                    // prettier-ignore
                    settled
                        ? t(
                            `betRecord.${
                                betData.length === 1
                                    ? getCompetitionResult(betData[0].winLoseStatus)
                                    : isWin
                                        ? 'win'
                                        : 'lose'
                            }`,
                        )
                        : t('betRecord.winAmount')
                }: ${getBetResultAmount(settled, data, estimatedWinnings)}`}
            </BetRecordInfoItem>
        )

        return (
            <BetRecordContainer>
                <BetRecordCompulsory>
                    <BetRecordLeftSubContainer>
                        <BetRecordInfoItemBold>{betTitle}</BetRecordInfoItemBold>
                        {isParlay ? (
                            <ParlayBetInfo data={betRecordData as BetRecordDetail[]} />
                        ) : (
                            <SingleBetInfo
                                data={targetRecord}
                                result={betData[0]}
                                isWin={settled && isWin}
                                isExpanded={isExpanded}
                                settled={settled}
                            />
                        )}
                        <BetRecordInfoItem>
                            {`${t('betRecord.anteAmount')}: `}
                            <AnteAmount>{totalAnte?.toFixed(2)}</AnteAmount>
                        </BetRecordInfoItem>
                        {getBetResult}
                    </BetRecordLeftSubContainer>
                    <BetRecordRightSubContainer>
                        <BetRecordExpandButton isExpanded={isExpanded} onClick={() => toggleExpand(id)}>
                            {isExpanded ? '-' : '+'}
                        </BetRecordExpandButton>
                    </BetRecordRightSubContainer>
                </BetRecordCompulsory>
                <ExpandRecordContainer>
                    {isParlay ? (
                        <ParlayExpandRecordList
                            isExpanded={isExpanded}
                            data={betRecordData as BetRecordDetail[]}
                            uuid={uuid}
                            createTime={createTime}
                            numOfcombination={numCombination}
                            antePerCombination={(totalAnte / numCombination).toFixed(0)}
                            betTitle={betTitle}
                            betData={betData}
                            status={confirmStatus}
                        />
                    ) : (
                        <SingleExpandRecordList
                            isExpanded={isExpanded}
                            uuid={uuid}
                            createTime={createTime}
                            startTime={
                                Array.isArray(betRecordData) ? betRecordData[0].startTime : betRecordData.startTime
                            }
                            seasonName={seasonName}
                            status={confirmStatus}
                        />
                    )}
                </ExpandRecordContainer>
            </BetRecordContainer>
        )
    } catch (err) {
        return <div />
    }
}

export default React.memo(BetRecordItem)
