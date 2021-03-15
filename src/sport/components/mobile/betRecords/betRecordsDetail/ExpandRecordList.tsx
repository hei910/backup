import { ResizeObserver } from '@juggle/resize-observer'
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { animated as Animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import { useSelector } from '@sport/stores'
import { BetRecordBetData, BetRecordDetail } from '@services/sportBet/types'
import { FixtureStatus } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { getBetResultOutcomeName, getCompetitionResult, getLiveScore, getSpecifier } from '@sport/util/betRecord'
import { matchStatusMap } from '@sport/util/dictionary'

interface ParlayExpandRecordListProps {
    isExpanded: boolean
    data: BetRecordDetail[]
    uuid: string
    createTime: string
    numOfcombination: number
    antePerCombination: string
    betTitle: string
    betData: BetRecordBetData[]
    status: string
}

interface SingleExpandRecordListProps {
    isExpanded: boolean
    seasonName: string
    uuid: string
    startTime: string
    createTime: string
    status: string
}

const ExpandRecordList = styled.div`
    padding: 15px 0px;
`

const BetRecordUuid = styled.span`
    color: #999;
`

const BetRecordInfoItem = styled.div`
    line-height: 24px;
`

const BetRecordInfoItemBold = styled.div`
    line-height: 24px;
    font-weight: 600;
`

const DividerLine = styled.div`
    border-bottom: 1px solid #e4e4e4;
    height: 0px;
`

const BetRecordSpanHighlight = styled.span<{ bold?: boolean } & React.HTMLAttributes<HTMLSpanElement>>`
    color: #e51717;
    font-weight: ${(props) => (props.bold ? 700 : 500)};
`

const getFormattedDate = (date: string) => dayjs(new Date(date)).format('YYYY-MM-DD HH:mm:ss')

export const ParlayExpandRecordList: React.FC<ParlayExpandRecordListProps> = ({
    isExpanded,
    data,
    uuid,
    createTime,
    numOfcombination,
    antePerCombination,
    betTitle,
    betData,
    status,
}) => {
    const { t } = useTranslation()
    const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })
    const isLoading = useSelector((state) => state.sportGlobal.isGlobalLoading)
    const language = window.localStorage.getItem('language')
    const ExpandRecordListHeight = { height: isExpanded ? height : 0, immediate: isLoading }
    const recordHeightStyleProps = useSpring(ExpandRecordListHeight)
    const animatedStyle = {
        overflow: 'hidden',
        ...recordHeightStyleProps,
    }
    const AnimatedDiv = Animated.div

    return (
        <AnimatedDiv style={animatedStyle}>
            <div ref={ref}>
                {data.map((parlayInfo) => {
                    const {
                        header,
                        fixtureId,
                        sportType,
                        marketCode,
                        marketName,
                        seasonName,
                        homeTeam,
                        awayTeam,
                        outcomeName,
                        specifier,
                        odds,
                        live,
                        startTime,
                    } = parlayInfo

                    //Order of betdata and metadata is not the same
                    const relevantBetData = betData.find((element) => element.fixtureId === fixtureId)
                    const status = getCompetitionResult(relevantBetData?.winLoseStatus || null)
                    const isCancelled = /cancel/i.test(status) || /cancel/i.test(relevantBetData?.status ?? '')

                    const resultOutCome = getBetResultOutcomeName(relevantBetData, language ?? 'zh')
                    const isShowResult = resultOutCome && relevantBetData?.marketId !== 'or'
                    const result = `(${t('betRecord.result')}: ${resultOutCome ?? t('betRecord.unknown')})`

                    return (
                        <React.Fragment key={`expand-bet-record-container-${fixtureId}`}>
                            <DividerLine />
                            <ExpandRecordList>
                                {marketCode === 'or' ? (
                                    <BetRecordInfoItem>{`${t(`betRecord.sport.${sportType}`)} ${t(
                                        'competition.outrights',
                                    )}`}</BetRecordInfoItem>
                                ) : (
                                    <BetRecordInfoItem>{`${homeTeam} v ${awayTeam}${getLiveScore(
                                        parlayInfo,
                                    )}`}</BetRecordInfoItem>
                                )}
                                <BetRecordInfoItem>{seasonName}</BetRecordInfoItem>
                                {marketCode !== 'or' && (
                                    <BetRecordInfoItem>{`${t(matchStatusMap[live ? FixtureStatus.Live : ''])} ${
                                        header ?? marketName
                                    }`}</BetRecordInfoItem>
                                )}
                                <BetRecordInfoItem>
                                    <BetRecordSpanHighlight>
                                        {`${outcomeName}${getSpecifier(marketCode, specifier)}`}
                                    </BetRecordSpanHighlight>
                                    {` @ `}
                                    <BetRecordSpanHighlight bold={true}>{odds}</BetRecordSpanHighlight>
                                </BetRecordInfoItem>
                                {relevantBetData ? (
                                    relevantBetData.status === 'UNSETTLE' ? (
                                        <></>
                                    ) : isCancelled ? (
                                        <BetRecordInfoItemBold>
                                            {`${t(`betRecord.voidReason.cancel`)}: ${t(
                                                `betRecord.voidReason.${relevantBetData.voidReason}`,
                                                t('betRecord.voidReason.UnknownReason'),
                                            )}`}
                                        </BetRecordInfoItemBold>
                                    ) : (
                                        <BetRecordInfoItem>
                                            {`${t(`betRecord.${status}`)} ${isShowResult ? result : ''} `}
                                        </BetRecordInfoItem>
                                    )
                                ) : (
                                    <BetRecordInfoItem>error occured</BetRecordInfoItem>
                                )}
                                <BetRecordInfoItem>{getFormattedDate(startTime)}</BetRecordInfoItem>
                            </ExpandRecordList>
                        </React.Fragment>
                    )
                })}
                <DividerLine />
                <ExpandRecordList>
                    <BetRecordInfoItem>{`${betTitle} ${numOfcombination}X${antePerCombination}`}</BetRecordInfoItem>
                    <BetRecordInfoItem>
                        {`${t('betRecord.betUuid')} `}
                        <BetRecordUuid>{uuid}</BetRecordUuid>
                    </BetRecordInfoItem>
                    <BetRecordInfoItem>{`${t('betRecord.betDate')} ${getFormattedDate(createTime)}`}</BetRecordInfoItem>
                    <BetRecordInfoItem>
                        {`${t('betRecord.status.title')}: `}
                        <BetRecordSpanHighlight>{t(`betRecord.status.${status}`)}</BetRecordSpanHighlight>
                    </BetRecordInfoItem>
                </ExpandRecordList>
            </div>
        </AnimatedDiv>
    )
}

export const SingleExpandRecordList: React.FC<SingleExpandRecordListProps> = ({
    isExpanded,
    seasonName,
    uuid,
    startTime,
    createTime,
    status,
}) => {
    const { t } = useTranslation()
    const [ref, { height }] = useMeasure({ polyfill: ResizeObserver })
    const isLoading = useSelector((state) => state.sportGlobal.isGlobalLoading)
    const ExpandRecordListHeight = { height: isExpanded ? height : 0, immediate: isLoading }
    const recordHeightStyleProps = useSpring(ExpandRecordListHeight)
    const animatedStyle = {
        overflow: 'hidden',
        ...recordHeightStyleProps,
    }
    const AnimatedDiv = Animated.div

    return (
        <AnimatedDiv style={animatedStyle}>
            <div ref={ref}>
                <DividerLine />
                <ExpandRecordList>
                    <BetRecordInfoItemBold>{seasonName}</BetRecordInfoItemBold>
                    <BetRecordInfoItem>{getFormattedDate(startTime)}</BetRecordInfoItem>
                    <BetRecordInfoItem>
                        {`${t('betRecord.betUuid')} `}
                        <BetRecordUuid>{uuid}</BetRecordUuid>
                    </BetRecordInfoItem>
                    <BetRecordInfoItem>{`${t('betRecord.betDate')} ${getFormattedDate(createTime)}`}</BetRecordInfoItem>
                    <BetRecordInfoItem>
                        {`${t('betRecord.status.title')}: `}
                        <BetRecordSpanHighlight>{t(`betRecord.status.${status}`)}</BetRecordSpanHighlight>
                    </BetRecordInfoItem>
                </ExpandRecordList>
            </div>
        </AnimatedDiv>
    )
}
