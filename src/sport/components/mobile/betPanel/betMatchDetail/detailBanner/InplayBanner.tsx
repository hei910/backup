import BaseballLiveStatus from '@sport/components/mobile/baseballLiveStatus'
import LiveVideo from '@sport/components/mobile/betPanel/betMatchDetail/detailBanner/liveVideo'
import MovingCounter from '@sport/components/mobile/movingTimer'
import { ConvertedMatches } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { NewCompetitors, Points, Score, ScoreBarInfo } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { sportTypeMap } from '@sport/util/constant'
import { liveSectionCodeMap } from '@sport/util/dictionary'
import { SAlignCenter } from '../common/styles'
import { isNcaa } from '@sport/util/dataProcess'
import TennisBanner from './InplayTennisBanner'

interface ComponentProps {
    // data?: Fixture[];
    convertedData: ConvertedMatches
    fixtureId?: string
}

interface FootballBannerProps {
    competitors: NewCompetitors
    clock: string
    status: string
    scores: Score
}

// interface SportsBannerProps {
//     competitors: NewCompetitors
//     clock: string
//     status: string
//     scores?: ScoreBarInfo
// }

interface IBasketballBannerProps {
    competitors: NewCompetitors
    status: string
    totalScore: Score
    scores?: ScoreBarInfo
    convertedData: ConvertedMatches
}

interface BasketballScoreProps {
    points: Points | null
    current?: string
}

const SMainContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    border-bottom: 1px solid #f2f2f2;
    /* height: 100%; */
`

const SBasketballMainContainer = styled(SMainContainer)`
    flex-direction: column;
    padding: 5px 10px;
`

const SAlignCenterContainer = styled(SAlignCenter)`
    justify-content: space-between;
    /* align-items: center; */
    width: 100%;
    /* height: 100%; */
    /* padding: 15px 0; */
`

const SCompetitors = styled.div<{ textAlign: string }>`
    text-align: ${(props) => (props.textAlign === 'left' ? 'left' : 'right')};
    font-size: 15px;
    font-weight: 800;
    flex: 3.5;
    max-width: 120px;
    color: #232323;
    background: #ffffff;
    /* height: 100%; */
    word-break: break-all;
    padding: 8px 0 8px;
    ${(props) => (props.textAlign === 'left' ? `padding-left: 5px;` : 'padding-right: 5px;')}

    @media ${device.tablet} {
        max-width: 200px;
    }
`

const SScores = styled.div<{ textAlign: string }>`
    font-size: 35px;
    font-weight: 500;
    color: ${(props) => props.theme.sport.colors.accent};
    text-align: ${(props) => props.textAlign};
    flex: 1;
    line-height: 35px;
    height: 100%;
    /* padding: 0px 2px; */
    margin: 0 2px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`

const STimeStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1.5;
    margin: 0 2px;
    color: #232323;
    max-width: 100px;
`
const SBasketballTimeStatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* flex: 1.5; */
    color: #232323;
`

const SBasketballScoresContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;

    /* border-top: 1px solid ${(props) => props.theme.sport.colors.background}; */
`

const SBasketballScore = styled.div<{ active: string }>`
    font-size: 10px;
    margin: 0 5px;
    color: ${(props) => (props.active === 'true' ? props.theme.sport.colors.accent : props.theme.sport.colors.primary)};
`

const SClock = styled.div`
    font-size: 16px;
    line-height: 16px;
`

const SLiveStatus = styled.div`
    font-size: 12px;
    margin: 0 2.5px;
    color: ${(props) => props.theme.sport.colors.primary};
    text-align: center;
`

const SBballLiveStatus = styled.div`
    font-size: 12px;
    line-height: 16px;
    /* margin: 0 2.5px; */
    color: ${(props) => props.theme.sport.colors.primary};
    text-align: center;
`
const SRedCard = styled.div`
    height: 100%;
    background: #a51100;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15px;
    padding: 25px 0;
`
const SEmptyCard = styled(SRedCard)`
    background: #ffffff;
`

const FootballBanner: React.FC<FootballBannerProps> = ({ competitors, clock, status, scores }) => {
    const { sports } = useCustomParams()
    return (
        <SMainContainer>
            <SAlignCenterContainer>
                {scores?.hRedCard > 0 ? <SRedCard>{scores?.hRedCard}</SRedCard> : <SEmptyCard />}
                <SCompetitors textAlign={'left'}>{competitors?.home?.name}</SCompetitors>
                <SScores textAlign={'right'}>{scores?.homeScore}</SScores>

                <STimeStatusContainer>
                    <SClock>{clock && <MovingCounter currentTime={clock} />}</SClock>
                    {sports !== 'baseball' && <SLiveStatus>{status}</SLiveStatus>}
                    {sports === 'baseball' && (
                        <BaseballLiveStatus liveStatus={status} fontSize={12} color={'#4b4b4b'} />
                    )}
                </STimeStatusContainer>
                <SScores textAlign={'left'}>{scores?.awayScore}</SScores>
                <SCompetitors textAlign={'right'}>{competitors?.away?.name}</SCompetitors>
                {scores?.aRedCard > 0 ? <SRedCard>{scores?.aRedCard}</SRedCard> : <SEmptyCard />}
            </SAlignCenterContainer>
        </SMainContainer>
    )
}

const BaseketballScores: React.FC<BasketballScoreProps> = ({ current, points }) => {
    if (points === null) {
        return <></>
    }
    return (
        <SBasketballScore active={(current === points.period).toString() ?? 'false'}>
            {points?.period.toUpperCase()}({points?.homeScore}-{points?.awayScore})
        </SBasketballScore>
    )
}

const BasketballBanner: React.FC<IBasketballBannerProps> = ({
    competitors,
    status,
    totalScore,
    scores,
    convertedData,
}) => {
    const ftScore = (points?: Points[], period?: string) => {
        if (points === undefined || period === undefined) {
            return null
        }
        return points.filter((point) => point.period === period)[0]
    }

    const renderPeriod = (currentPeriod?: string, quarter?: string) => {
        if (currentPeriod === undefined || quarter === undefined) {
            return false
        }
        if (quarter === 'ot') {
            return currentPeriod === quarter
        } else if (quarter === '1h' || quarter === '2h') {
            const currentPeriodNum = Number(currentPeriod.split('h')[0])
            const quarterNum = Number(quarter.split('h')[0])

            return currentPeriod === 'ot' || currentPeriodNum >= quarterNum
        } else {
            const currentPeriodNum = Number(currentPeriod.split('q')[1])
            const quarterNum = Number(quarter.split('q')[1])

            return currentPeriod === 'ot' || currentPeriodNum >= quarterNum
        }
    }

    const scoreMap = isNcaa(convertedData) ? ['1h', '2h', 'ot'] : ['q1', 'q2', 'q3', 'q4', 'ot']

    return (
        <SBasketballMainContainer>
            <SAlignCenterContainer>
                <SCompetitors textAlign={'left'}>{competitors?.home?.name}</SCompetitors>
                <SScores textAlign={'right'}>{totalScore.homeScore}</SScores>
                <STimeStatusContainer>
                    <SBasketballTimeStatusContainer>
                        <SBballLiveStatus>{scores?.countTime}</SBballLiveStatus>
                        <SBballLiveStatus>{status}</SBballLiveStatus>
                    </SBasketballTimeStatusContainer>
                </STimeStatusContainer>
                <SScores textAlign={'left'}>{totalScore.awayScore}</SScores>
                <SCompetitors textAlign={'right'}>{competitors?.away?.name}</SCompetitors>
            </SAlignCenterContainer>
            <SBasketballScoresContainer>
                {scoreMap.map((status, index) => (
                    <React.Fragment key={`basketballInplayBanner-${status}-${index}`}>
                        {renderPeriod(scores?.period, status) && (
                            <BaseketballScores current={scores?.period} points={ftScore(scores?.points, status)} />
                        )}
                    </React.Fragment>
                ))}
            </SBasketballScoresContainer>
        </SBasketballMainContainer>
    )
}

const InplayBanner: React.FC<ComponentProps> = ({ convertedData, fixtureId }) => {
    const { sports } = useCustomParams()
    const sportTypeEnum = sports && sportTypeMap[sports]
    const { t } = useTranslation()
    const detailSportsSwitcher = () => {
        switch (sports) {
            case 'football':
                return (
                    <FootballBanner
                        competitors={convertedData?.info?.competitors}
                        clock={convertedData?.info.clock}
                        status={t(liveSectionCodeMap(sports, convertedData?.info.liveStatus))}
                        scores={convertedData?.events?.[0].score}
                    />
                )
            case 'basketball':
                return (
                    <BasketballBanner
                        competitors={convertedData?.info?.competitors}
                        totalScore={convertedData?.events?.[0]?.score}
                        status={t(liveSectionCodeMap(sports, convertedData?.info.liveStatus))}
                        scores={convertedData?.info?.scoreBarInfo}
                        convertedData={convertedData}
                    />
                )
            case 'baseball':
                return (
                    <FootballBanner
                        competitors={convertedData?.info?.competitors}
                        clock={convertedData?.info?.clock}
                        status={convertedData?.info?.liveStatus}
                        scores={convertedData?.events?.[0].score}
                    />
                )
            case 'tennis':
                return <TennisBanner convertedData={convertedData} />
            default:
                return (
                    <FootballBanner
                        competitors={convertedData?.info?.competitors}
                        clock={convertedData?.info.clock}
                        status={t(liveSectionCodeMap(sports, convertedData?.info.liveStatus))}
                        scores={convertedData?.events?.[0].score}
                    />
                )
        }
    }
    return (
        <>
            {detailSportsSwitcher()}
            <LiveVideo
                matchIdFromProps={convertedData?.info?.matchId}
                sportTypeFromProps={sportTypeEnum || null}
                sourceFromProps={convertedData?.info?.source || null}
            />
        </>
    )
}

export default InplayBanner
