import { ConvertedMatches } from '@brand/sport/converters/types'
import React from 'react'
import styled from 'styled-components/macro'
import { useTranslation } from 'react-i18next'
import { tennisMarketSectionMap, tennisSectionMap } from '@sport/util/dictionary'
import { Points, ScoreBarInfo } from '@services/sportData/types'
interface ComponentProps {
    // data?: Fixture[];
    convertedData: ConvertedMatches
}
interface InplayScoreProps {
    scoreBarInfo?: ScoreBarInfo
}

const SMainContainer = styled.div``
const STable = styled.table`
    width: 100%;
    padding: 8px 8px 0 8px;
`
const STableHeaderSpan = styled.span`
    margin-left: 4px;
`

const STableScoreHeader = styled.th`
    font-size: 12px;
    font-weight: normal;
`
const STableScoreBody = styled.td`
    font-size: 14px;
`
const STableRow = styled.tr`
    /* vertical-align: top; */
`
const STableScoreHeaderTurn = styled.th`
    width: 8px;
`
const STableScoreBodyTurn = styled.td`
    vertical-align: top;
    width: 6px;
`
const STableTurn = styled.div<{ teamTurn: boolean }>`
    height: 16px;
    ${(props) => props.teamTurn && `border-left: 2px solid ${props.theme.sport.colors.accent};`}
`
const STableHeaderTeamRounds = styled(STableScoreHeader)`
    min-width: 200px;
    text-align: left;
    color: ${(props) => props.theme.sport.colors.accent};
`
const STableBodyTeamRounds = styled(STableScoreBody)`
    min-width: 200px;
    text-align: left;
    vertical-align: baseline;
    /* font-weight: 400; */
`

const STableHeaderScores = styled(STableScoreHeader)`
    width: 35px;
    text-align: center;
    /* font-weight: 400; */
`
const STableBodyScores = styled(STableScoreBody)<{ scoreType: string }>`
    width: 35px;
    text-align: center;
    font-size: 16px;
    vertical-align: text-top;
    ${(props) => props.scoreType === 'fts' && `color: ${props.theme.sport.colors.accent};`}
    ${(props) => props.scoreType === 'point' && `color: #999999;`}
`
const SSectionScoreContainer = styled.div`
    padding-left: 21px;
    margin-bottom: 8px;
`
const SSectionScore = styled.span`
    margin-right: 5px;
    color: #999999;
    font-size: 12px;
`
const InplayScores: React.FC<InplayScoreProps> = ({ scoreBarInfo }) => {
    const sectionFilter = (points?: Points[], section?: string) => {
        if (points !== undefined && section !== undefined) {
            return points.filter((point) => point?.period === section)
        } else {
            return []
        }
    }
    const homeAwayScore = (section: string, home: boolean) => {
        return home
            ? sectionFilter(scoreBarInfo?.points, section)?.[0]?.homeScore
            : sectionFilter(scoreBarInfo?.points, section)?.[0]?.awayScore
    }
    return (
        <SSectionScoreContainer>
            {['s1', 's2', 's3', 's4', 's5'].map((section, index) => (
                <React.Fragment key={`tennis-inplay-score-${section}-${index}`}>
                    {homeAwayScore(section, true) !== undefined && homeAwayScore(section, false) !== undefined && (
                        <SSectionScore>
                            {homeAwayScore(section, true)}-{homeAwayScore(section, false)}
                        </SSectionScore>
                    )}
                </React.Fragment>
            ))}
        </SSectionScoreContainer>
    )
}

const InplayTennisBanner: React.FC<ComponentProps> = ({ convertedData }) => {
    const { t } = useTranslation()
    const sectionFilter = (points?: Points[], section?: string) => {
        if (points !== undefined && section !== undefined) {
            return points.filter((point) => point?.period === section)
        } else {
            return []
        }
    }
    const homeAwayScore = (section: string, home: boolean) => {
        return home
            ? sectionFilter(convertedData?.info?.scoreBarInfo?.points, section)?.[0]?.homeScore
            : sectionFilter(convertedData?.info?.scoreBarInfo?.points, section)?.[0]?.awayScore
    }
    const liveStatus =
        convertedData?.info?.liveStatus === 's1' ||
        convertedData?.info?.liveStatus === 's2' ||
        convertedData?.info?.liveStatus === 's3' ||
        convertedData?.info?.liveStatus === 's4' ||
        convertedData?.info?.liveStatus === 's5'
            ? t(tennisSectionMap[`mobile${convertedData?.info?.liveStatus}`])
            : t(tennisSectionMap[convertedData?.info?.liveStatus])
    return (
        <SMainContainer>
            <STable>
                <thead>
                    <STableRow>
                        <STableScoreHeaderTurn> </STableScoreHeaderTurn>
                        <STableHeaderTeamRounds>
                            {liveStatus} /<STableHeaderSpan>{convertedData?.info?.round}</STableHeaderSpan>
                            <STableHeaderSpan>{t(tennisMarketSectionMap['set'])}</STableHeaderSpan>
                            <STableHeaderSpan>{convertedData?.info?.game}</STableHeaderSpan>
                        </STableHeaderTeamRounds>
                        <STableHeaderScores> {t(tennisMarketSectionMap['fts'])}</STableHeaderScores>
                        <STableHeaderScores>{t(tennisMarketSectionMap['set'])}</STableHeaderScores>
                        <STableHeaderScores>{t(tennisMarketSectionMap['p'])}</STableHeaderScores>
                    </STableRow>
                </thead>
                <tbody>
                    <STableRow>
                        <STableScoreBodyTurn>
                            <STableTurn teamTurn={convertedData?.info?.scoreBarInfo?.turn === 1}></STableTurn>
                        </STableScoreBodyTurn>
                        <STableBodyTeamRounds>{convertedData?.info?.competitors?.home?.name}</STableBodyTeamRounds>
                        {['fts', 'set', 'point'].map((section, index) => (
                            <STableBodyScores key={`tennisInplay-body-${section}-${index}`} scoreType={section}>
                                {homeAwayScore(section, true)}
                            </STableBodyScores>
                        ))}
                    </STableRow>
                </tbody>
                <tbody>
                    <STableRow>
                        <STableScoreBodyTurn>
                            <STableTurn teamTurn={convertedData?.info?.scoreBarInfo?.turn === 0}></STableTurn>
                        </STableScoreBodyTurn>
                        <STableBodyTeamRounds>{convertedData?.info?.competitors?.away?.name}</STableBodyTeamRounds>
                        {['fts', 'set', 'point'].map((section, index) => (
                            <STableBodyScores key={`tennisInplay-body-${section}-${index}`} scoreType={section}>
                                {homeAwayScore(section, false)}
                            </STableBodyScores>
                        ))}
                    </STableRow>
                </tbody>
            </STable>
            <InplayScores scoreBarInfo={convertedData?.info?.scoreBarInfo} />
        </SMainContainer>
    )
}

export default InplayTennisBanner
