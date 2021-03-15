import MovingCounter from '@sport/components/mobile/movingTimer'
import converter from '@sport/converters'
import { ConvertedEvent, ConvertedSeason } from '@sport/converters/types'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { MatchApiSportType, MatchInfo, MobileMainMatchesData, Points } from '@services/sportData/types'
import { getAllBgSrLiveStream } from '@services/sportLive/actions'
import { SportTypeEnum } from '@services/sportLive/types'
import styled from 'styled-components/macro'
import { device } from '@sport/styles/common/device'
import { allCounts, mobileSportsCount } from '@sport/util/dataProcess'
import { liveSectionCodeMap, sportTypeCodeMap } from '@sport/util/dictionary'
import { isEmptyObject } from '@sport/util/general'
import { sportSId } from '@sport/util/constant'
import BaseballLiveStatus from '../baseballLiveStatus'
// import ExpandableHeader from '../header/ExpandableHeader'
import HigherRateButton from '../higherRateButton'
import LiveStreamIcon from '../liveStreamIcon'
import LiveStatIcon from '../statIcon'
import AllSportInplayButton from './AllSportInplayButton'
import MainTitle from './MainTitle'
import { scrollToTop } from '@utils/v1Functions'

interface ComponentProps {
    data: MobileMainMatchesData
}

interface BodyComponentProps {
    event: ConvertedEvent
    info: MatchInfo
    sport: MatchApiSportType
}
interface FootballComponentProps {
    seasons: ConvertedSeason[]
    sport: MatchApiSportType
    liveCount: number
}

const SMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 6px;
    margin-bottom: 6px;
`
const STableHeader = styled.div`
    color: #bd4700;
    font-weight: bold;
    text-align: left;
    width: 100%;
    padding: 10px 0 0px 14px;
    font-size: 16px;
`
const SWhiteContainer = styled.div`
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 3px;
`
const SSportsContainer = styled.div`
    width: 100%;
    margin-bottom: 8px;
    box-shadow: 0px 8px 0px 0px rgba(245, 245, 245, 1);
`
const SBodyContainer = styled.div`
    background: white;
    padding-bottom: 5px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const STableContainer = styled.div<{ even: boolean }>`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
    padding: 0 10px;

    > a:last-child {
        border-bottom: none;
    }

    > a:nth-last-child(2) {
        border-bottom: ${(props) => (props.even ? `1px solid rgba(0, 0, 0, 0.1)` : `none`)};
    }

    @media ${device.tablet} {
        flex-wrap: wrap;
        flex-direction: row;
        margin: 0 10px;

        > a:nth-last-child(2) {
            border-bottom: none;
        }
    }
`

const STableBodyMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 6px 4px 6px 4px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media ${device.tablet} {
        width: 50%;
    }
`
const SEmptyTableBodyMainContainer = styled(Link)`
    width: 100%;
    padding: 0 0 0 0;

    @media ${device.tablet} {
        width: 50%;
    }
`

const STableBodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SEmptyTableBodyContainer = styled.div`
    width: 100%;
`

const SCompetitorsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 4px 0;
    font-size: 15px;
    flex: 3;
`

const STimeDate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    /* margin-right: 8px; */
    /* min-width: 140px; */
`

const SGameStatus = styled.div`
    color: #999999;
`

const STableRightColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 200px;
    /* max-width: 103px; */

    @media ${device.tablet} {
        /* flex: 1; */
        max-width: 200px;
        padding-right: 10px;
    }
`

const SChevron = styled.div`
    width: 10px;
    height: 10px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    /* margin-right: 10px; */
    transform: rotate(45deg);
`
const SCompetitorScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;

    @media ${device.tablet} {
        flex: 2;
    }
`

const SScore = styled.div`
    color: #bd4700;
    font-size: 16px;
    flex: 1.2;
    margin-right: 4px;
    min-width: 30px;

    @media ${device.tablet} {
        flex: 1.2;
    }
`

const SCompetitor = styled.div`
    margin-right: 4px;
    flex: 9.5;
    color: ${(props) => props.theme.sport.colors.text.tertiary};

    @media ${device.tablet} {
        flex: 8;
    }
`

const STennisCompetitor = styled.div`
    font-size: 15px;
    padding: 4px 0;
    color: ${(props) => props.theme.sport.colors.text.tertiary};
`

const STennisScoreContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin-top: 3px;
`
const SClockWrapper = styled.div`
    width: 40px;
    text-align: center;
    margin-bottom: 5px;
    color: #000000;
`

const STennisScore = styled.div<{ visibility: string }>`
    color: #bd4700;
    margin-right: 6px;
    font-size: 16px;
    visibility: ${(props) => (props.visibility === 'true' ? `visible` : `hidden`)};
`

const STimeDateMore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 6px;
    min-width: 40px;
`

const SHigherRateButtonContainer = styled.div`
    margin: 2px 5px 0 0;
`
const SIconMargin = styled.div`
    margin-right: 5px;
    min-width: 24px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const SIsNeutural = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background: #80b100;
    border-radius: 2px;
    width: 20px;
    height: 15.5px;
    margin-right: 2px;
    align-self: flex-start;
    margin-top: 2px;
    font-size: 11px;
`

const CompetitorsSection: React.FC<BodyComponentProps> = ({ event, info, sport }) => {
    return (
        <SCompetitorScoreContainer>
            {sport !== 'tennis' && (
                <>
                    <SCompetitorsContainer>
                        <SScore>{event?.score?.homeScore}</SScore>
                        <SCompetitor>{event?.competitors?.home?.name}</SCompetitor>
                    </SCompetitorsContainer>
                    <SCompetitorsContainer>
                        <SScore>{event?.score?.awayScore}</SScore>
                        <SCompetitor>{event?.competitors?.away?.name}</SCompetitor>
                    </SCompetitorsContainer>
                </>
            )}
            {sport === 'tennis' && (
                <>
                    <STennisCompetitor>{event?.competitors?.home?.name}</STennisCompetitor>
                    <STennisCompetitor>{event?.competitors?.away?.name}</STennisCompetitor>
                </>
            )}
        </SCompetitorScoreContainer>
    )
}

const RegularBody: React.FC<BodyComponentProps> = ({ event, info, sport }) => {
    const { t } = useTranslation()
    const history = useHistory()
    const source = useSelector((state) => state.sportGlobal.dataSource)
    const sectionRounds = info?.round === '3' ? ['s1', 's2', 's3'] : ['s1', 's2', 's3', 's4', 's5']
    const sectionFilter = (points?: Points[], section?: string) => {
        if (points !== undefined && section !== undefined) {
            return points.filter((point) => point?.period === section)
        } else {
            return []
        }
    }
    const sectionScore = (section: string) => {
        return sectionFilter(info?.scoreBarInfo?.points, section)?.[0]
    }

    const sectionVisibility = (section: string) => {
        const sectionNumber = Number(section.split('')[1])
        const currentSectionNumber = Number(info?.scoreBarInfo?.period?.split('')[1])
        return sectionNumber <= currentSectionNumber
    }

    const onMainContainerClick = () => {
        scrollToTop()
        document.getElementById('layout-container')?.scrollTo({ top: 0, behavior: 'smooth' })
        history.push(`/sport/inplay/${sport}/details/${info.matchId}/${source}`)
    }

    return (
        <STableBodyMainContainer onClick={onMainContainerClick} data-mid={info.matchId}>
            <STableBodyContainer>
                <CompetitorsSection event={event} info={info} sport={sport} />

                <STableRightColumn>
                    {info?.isNeutral && <SIsNeutural>N</SIsNeutural>}
                    <SIconMargin>
                        <LiveStreamIcon
                            matchId={info?.matchId}
                            sports={sport}
                            fixtureId={event?.fixtureId}
                            source={info?.source}
                        />
                        <LiveStatIcon sId={sportSId[sport]} mId={info.matchId} />
                    </SIconMargin>
                    {event?.markets.filter((market) => market?.marketCode === 'eps').length > 0 && (
                        <SHigherRateButtonContainer>
                            <HigherRateButton />
                        </SHigherRateButtonContainer>
                    )}
                    <STimeDateMore>
                        <STimeDate>
                            {/* {info?.isNeutral && <SIsNeutural>N</SIsNeutural>} */}
                            {/* <SIconMargin>
                                <LiveStreamIcon
                                    matchId={info?.matchId}
                                    sports={sport}
                                    fixtureId={event?.fixtureId}
                                    source={info?.source}
                                />
                                <LiveStatIcon
                                    sId={sportSId[sport]}
                                    mId={info.matchId}
                                />
                            </SIconMargin> */}
                            {/* {info.clock && sport === 'football' && (
                                <SClockWrapper>
                                    <MovingCounter currentTime={info.clock} />
                                </SClockWrapper>
                            )} */}
                            {/* {info.clock && sport !== 'football' && <SClockWrapper>{info?.clock}</SClockWrapper>} */}
                            {sport !== 'baseball' && (
                                <SGameStatus>{t(liveSectionCodeMap(sport, info?.liveStatus))}</SGameStatus>
                            )}

                            {sport === 'baseball' && (
                                <BaseballLiveStatus liveStatus={info?.liveStatus} fontSize={13} color={'#939393'} />
                            )}
                            {info.clock && sport === 'football' && (
                                <SClockWrapper>
                                    <MovingCounter currentTime={info.clock} />
                                </SClockWrapper>
                            )}
                            {info.clock && sport !== 'football' && <SClockWrapper>{info?.clock}</SClockWrapper>}
                        </STimeDate>
                    </STimeDateMore>
                    <SChevron />
                </STableRightColumn>
            </STableBodyContainer>
            {sport === 'tennis' && (
                <STennisScoreContainer>
                    {/* {scoreBarInfo?.points.map((session, index) => (
                        <STennisScore key={`tennisScore-${index}`}>
                            {session?.homeScore}-{session?.awayScore}
                        </STennisScore>
                    ))} */}
                    {sectionRounds.map((section, index) => (
                        <STennisScore
                            visibility={sectionVisibility(section).toString()}
                            key={`topPage-tennisInplay-body-sections-${section}-${index}`}>
                            {sectionScore(section)?.homeScore}-{sectionScore(section)?.awayScore}
                        </STennisScore>
                    ))}
                </STennisScoreContainer>
            )}
        </STableBodyMainContainer>
    )
}

const Body: React.FC<FootballComponentProps> = ({ seasons, sport, liveCount }) => {
    const { t } = useTranslation()

    const even = mobileSportsCount(seasons) % 2 === 0
    // const rightSide = <AllSportInplayButton sport={sport} count={liveCount} date={'inplay'} />
    return (
        <SSportsContainer>
            <SBodyContainer>
                <STableHeader>{t(sportTypeCodeMap[sport])}</STableHeader>
                {/* <ExpandableHeader title={t(sportTypeCodeMap[sport])} defaultShow={true} rightSide={rightSide}> */}
                <STableContainer even={even}>
                    {seasons.map((season, index) => (
                        <React.Fragment key={`TableInplay-${sport}-${season?.key}-${index}`}>
                            {season?.matchs.map((match, mIndex) => (
                                <React.Fragment key={`TableInplay-${sport}-${season?.key}-${index}-${mIndex}`}>
                                    {match.events.map((event, eIndex) => (
                                        <RegularBody
                                            event={event}
                                            info={match?.info}
                                            sport={sport}
                                            key={`TableInplay-${sport}-${season?.key}-${index}-${mIndex}-${eIndex}`}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                    {!even && (
                        <SEmptyTableBodyMainContainer to={'/'}>
                            <SEmptyTableBodyContainer />
                        </SEmptyTableBodyMainContainer>
                    )}
                </STableContainer>
                <AllSportInplayButton sport={sport} count={liveCount} date={'inplay'} />
                {/* </ExpandableHeader> */}
            </SBodyContainer>
        </SSportsContainer>
    )
}
const InplayGame: React.FC<ComponentProps> = ({ data }) => {
    const { t } = useTranslation()
    const lastParams = useSelector((state) => state.sportData.lastUpdate?.params)
    const inplay = data?.live
    const inplayFootball = data?.live?.football
    const convertedInplayFootball = converter('football', lastParams, inplayFootball)?.iot
    const inplayBasketball = data?.live?.basketball
    const convertedInplayBasketball = converter('basketball', lastParams, inplayBasketball)?.iot
    const inplayTennis = data?.live?.tennis
    const convertedInplayTennis = converter('tennis', lastParams, inplayTennis)?.iot
    const inplayBaseball = data?.live?.baseball
    const convertedInplayBaseball = converter('baseball', lastParams, inplayBaseball)?.iot
    const matchCount = data.matchCount
    const allSportsCount = allCounts(
        mobileSportsCount(convertedInplayFootball),
        mobileSportsCount(convertedInplayBasketball),
        mobileSportsCount(convertedInplayTennis),
        mobileSportsCount(convertedInplayBaseball),
    )

    // const allLiveCount = () => {
    //     return (
    //         mobileSportsCount(convertedInplayFootball) +
    //         mobileSportsCount(convertedInplayBasketball) +
    //         mobileSportsCount(convertedInplayTennis) +
    //         mobileSportsCount(convertedInplayBaseball)
    //     );
    // };
    const dispatch = useDispatch()

    useEffect(() => {
        if (mobileSportsCount(convertedInplayFootball)) {
            dispatch(getAllBgSrLiveStream(SportTypeEnum.Football))
        }

        if (mobileSportsCount(convertedInplayBasketball)) {
            dispatch(getAllBgSrLiveStream(SportTypeEnum.Basketball))
        }

        if (mobileSportsCount(convertedInplayTennis)) {
            dispatch(getAllBgSrLiveStream(SportTypeEnum.Tennis))
        }

        if (mobileSportsCount(convertedInplayBaseball)) {
            dispatch(getAllBgSrLiveStream(SportTypeEnum.Baseball))
        }
    }, [convertedInplayBaseball, convertedInplayBasketball, convertedInplayFootball, convertedInplayTennis, dispatch])

    return (
        <>
            {!isEmptyObject(inplay) && (
                <>
                    {allSportsCount > 0 && (
                        <SMainContainer>
                            <SWhiteContainer>
                                <MainTitle title={t('topPage.inplay')} count={allSportsCount} date={'inplay'} />
                                {mobileSportsCount(convertedInplayFootball) > 0 && (
                                    <Body
                                        seasons={convertedInplayFootball}
                                        liveCount={matchCount?.football?.liveCount}
                                        sport={'football'}
                                    />
                                )}
                                {mobileSportsCount(convertedInplayBasketball) > 0 && (
                                    <Body
                                        seasons={convertedInplayBasketball}
                                        liveCount={matchCount?.basketball?.liveCount}
                                        sport={'basketball'}
                                    />
                                )}
                                {mobileSportsCount(convertedInplayTennis) > 0 && (
                                    <Body
                                        seasons={convertedInplayTennis}
                                        liveCount={matchCount?.tennis?.liveCount}
                                        sport={'tennis'}
                                    />
                                )}
                                {mobileSportsCount(convertedInplayBaseball) > 0 && (
                                    <Body
                                        seasons={convertedInplayBaseball}
                                        liveCount={matchCount?.baseball?.liveCount}
                                        sport={'baseball'}
                                    />
                                )}
                            </SWhiteContainer>
                        </SMainContainer>
                    )}
                </>
            )}
        </>
    )
}

export default InplayGame
