import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@sport/stores'
import { SubmitBetResultSingle } from '@services/sportBet/types'
import styled from 'styled-components/macro'
import { matchStatusMap, teamMap } from '@sport/util/dictionary'
import { FixtureStatus, Score } from '@services/sportData/types'
import { isEmptyObject } from '@sport/util/general'

interface SingleBetProps {
    id: string
    result: SubmitBetResultSingle
}

const SSinglesContainer = styled.div`
    padding: 10px 0;
    background-color: #edf4e2;
`

const SSingleContainer = styled.div`
    margin: 5px;
    border-bottom: 1px solid #b2c498;
`

const SSingleTitle = styled.div`
    font-size: 13px;
    color: #000;
    margin: 5px 0;
`

const SSingleOdds = styled.div`
    font-size: 14px;
    color: #5a6e32;
`

const SSingleTeams = styled.div`
    font-size: 13px;
`

const SRecord = styled.div``

const SRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
`

const SLeft = styled.div`
    text-align: left;
`

const SRight = styled.div`
    text-align: right;
`

const SAmountLabel = styled.div`
    font-size: 15px;
    color: #c0c0c0;
`

const SAmount = styled.div`
    color: #5a6e32;
`

const SBetInvoiceNumber = styled.div`
    margin-bottom: 5px;
`

const SingleBet: React.FC<SingleBetProps> = ({ result }) => {
    const {
        unitAnte,
        estimatedWinnings,
        uuid,
        resultOdds,
        title = '',
        item = '',
        outcomeCode = '',
        marketId = '',
        ename = '',
        outcomeId = '',
        ctid = '',
        fixtureId = '',
    } = result

    let { homeTeam = '', awayTeam = '' } = result

    const key = `${ctid}.${fixtureId}.${marketId}.${outcomeCode}.${outcomeId}.${ename}`
    const uid = useSelector((store) => store.sportBet.uidMap[key])
    const status = useSelector((store) => store.sportBet.data[uid]?.status) ?? FixtureStatus.Pre
    const headerTitle = useSelector((store) => store.sportBet.data[uid]?.marketName)
    const competitors = useSelector((store) => store.sportBet.data[uid]?.competitors)
    const specifiers = useSelector((store) => store.sportBet.data[uid]?.specifiers)
    const score = useSelector((store) => store.sportBet.data[uid]?.score)
    const isLive = useSelector((store) => store.sportBet.data[uid]?.status === FixtureStatus.Live)
    const isEps = useSelector((store) => store.sportBet.data[uid]?.marketCode === 'eps')
    const teamName = useSelector((store) => store.sportBet.data[uid]?.outcomeName)
    const showScore = isLive && !isEmptyObject(score)
    const getScore = (s: Score) => ({
        home: s.home ?? s.homeScore,
        away: s.away ?? s.awayScore,
    })

    homeTeam = teamMap('h', competitors) || homeTeam
    awayTeam = teamMap('a', competitors) || awayTeam

    const showTeams = homeTeam !== '' && awayTeam !== ''

    const { t } = useTranslation()

    const hasResult =
        typeof unitAnte !== 'undefined' && typeof estimatedWinnings !== 'undefined' && typeof uuid !== 'undefined'

    return (
        <SSingleContainer>
            <SSingleTitle>
                {t(matchStatusMap[isLive ? FixtureStatus.Live : status])}
                {`${title || headerTitle}`}
                {showScore && ` (${getScore(score).home}-${getScore(score).away})`}
            </SSingleTitle>
            <SSingleOdds>
                {item && `${item} `}
                {!item && teamName && `${teamName}`}
                {specifiers && !isEps && `${specifiers}`}
                {`@${resultOdds}`}
            </SSingleOdds>
            {showTeams && <SSingleTeams>{`${homeTeam} vs ${awayTeam}`}</SSingleTeams>}
            {hasResult && (
                <SRecord>
                    <SRow>
                        <SLeft>
                            <SAmountLabel>{t('betList.stake')}</SAmountLabel>
                            <SAmount>{unitAnte?.toFixed(2)}</SAmount>
                        </SLeft>
                        <SRight>
                            <SAmountLabel>{t('betList.toWin')}</SAmountLabel>
                            <SAmount>{estimatedWinnings?.toFixed(2)}</SAmount>
                        </SRight>
                    </SRow>
                    <SBetInvoiceNumber>{`${t('betList.invoiceNumber')}: ${uuid}`}</SBetInvoiceNumber>
                </SRecord>
            )}
        </SSingleContainer>
    )
}

const SingleBetMemo = React.memo(SingleBet)

const BetListSuccessSingle = () => {
    const submitBetResultSingle = useSelector((store) => store.sportBet.submitBetResult?.single ?? {})

    const singles = Object.entries(submitBetResultSingle).map(([key, value]) => (
        <SingleBetMemo key={`betSubmit-result-single-${key}`} id={key} result={value} />
    ))

    return <SSinglesContainer>{singles}</SSinglesContainer>
}

export default React.memo(BetListSuccessSingle)
