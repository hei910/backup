import { MobileLiveIcon } from '@sport/components/icons'
import converter from '@sport/converters'
import { ConvertedEvent, ConvertedSeason } from '@sport/converters/types'
import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { MatchInfo, MobileMainMatchesData } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { mobileSportsCount } from '@sport/util/dataProcess'
import { isEmptyObject } from '@sport/util/general'
import { sportSId } from '@sport/util/constant'
import HigherRateButton from '../higherRateButton'
import MainTitle from './MainTitle'
import LiveStatIcon from '../statIcon'
import { scrollToTop } from '@utils/v1Functions'

interface ComponentProps {
    data: MobileMainMatchesData
}

interface ConvertedEventProps {
    event: ConvertedEvent
    info: MatchInfo
    sport: string
}
interface BodyProps {
    seasons: ConvertedSeason[]
    sport: string
}

interface SeasonProps {
    season: ConvertedSeason
    sport: string
}

const SMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0 0 6px;
    background: white;
    margin-bottom: 8px;
`

const SWhiteContainer = styled.div`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 3px;
    padding: 0 10px;
    padding-bottom: 6px;

    > a:last-child {
        border-bottom: none;
        /* background: red; */
    }
`

const SBodyContainer = styled.div`
    background: white;
    width: 100%;
    margin: 0 10px;
    /* padding: 0 10px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 1px ${(props) => props.theme.sport.colors.background} solid;
`

const STableContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 0px 4px;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;
`

const SHigherRateButtonContainer = styled.div`
    margin: 2px 5px 0 0;
`

const STableBodyContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0px 15px;
    /* border-bottom: 1px ${(props) => props.theme.sport.colors.background} solid; */
`

const SInplayIcon = styled(MobileLiveIcon)`
    width: 24px;
    height: auto;

    path {
        fill: ${(props) => props.theme.sport.colors.table.column.icon};
    }
`
const SCompetitors = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: ${(props) => props.theme.sport.colors.text.tertiary};
`
const STimeDateMore = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-right: 6px;
    min-width: 40px;
`

const STimeDate = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    font-size: 13px;
    color: #939393;
`

const STime = styled.div`
    color: black;
    margin-bottom: 5px;
`
const STableRightColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    max-width: 200px;
`

const SChevron = styled.div`
    width: 10px;
    height: 10px;
    border-top: 1px solid black;
    border-right: 1px solid black;
    transform: rotate(45deg);
`

const SIconMargin = styled.div`
    margin-right: 5px;
    /* min-width: 25px; */
    display: flex;
    align-items: center;
    flex-direction: column;
`

const SAwayRow = styled.div`
    margin-top: 5px;
`

const TableEvent: React.FC<ConvertedEventProps> = ({ event, info, sport }) => {
    const source = useSelector((state) => state?.sportGlobal?.dataSource)
    const history = useHistory()

    const onMainContainerClick = () => {
        scrollToTop()
        document.getElementById('layout-container')?.scrollTo({ top: 0, behavior: 'smooth' })
        history.push(`/sport/all/${sport}/details/${event?.fixtureId}/${source}`)
    }

    return (
        <SBodyContainer onClick={onMainContainerClick} data-mid={info.matchId}>
            <STableContainer>
                <STableBodyContainer>
                    <SCompetitors>
                        <div>{event?.competitors?.home?.name}</div>
                        <SAwayRow>{event?.competitors?.away?.name}</SAwayRow>
                    </SCompetitors>
                    <STableRightColumn>
                        <SIconMargin>
                            {info.haveLiveMatch && <SInplayIcon />}
                            <LiveStatIcon sId={sportSId[sport]} mId={info.matchId} />
                        </SIconMargin>
                        {event?.markets.filter((market) => market?.marketCode === 'eps').length > 0 && (
                            <SHigherRateButtonContainer>
                                <HigherRateButton />
                            </SHigherRateButtonContainer>
                        )}
                        <STimeDateMore>
                            <STimeDate>
                                <div>{dayjs(info.startTime).format('MM/DD')}</div>
                                <STime>{dayjs(info.startTime).format('HH:mm')}</STime>
                            </STimeDate>
                        </STimeDateMore>
                        <SChevron />
                    </STableRightColumn>
                </STableBodyContainer>
            </STableContainer>
        </SBodyContainer>
    )
}

const Season: React.FC<SeasonProps> = ({ season, sport }) => {
    return (
        <>
            {season?.matchs?.map((match, index) => (
                <React.Fragment key={`SpecialGame-Seasons-${season.key}-${index}`}>
                    {match.events.map((event, eIndex) => (
                        <TableEvent
                            event={event}
                            info={match.info}
                            sport={sport}
                            key={`SpecialGame-Seasons-${season.key}-${index}-${event.fixtureId}-${eIndex}`}
                        />
                    ))}
                </React.Fragment>
            ))}
        </>
    )
}
const Body: React.FC<BodyProps> = ({ seasons, sport }) => {
    return (
        <>
            {seasons.map((season, index) => (
                <Season season={season} sport={sport} key={`SpecialGame-Seasons-${index}`} />
            ))}
        </>
    )
}
const SpecialGame: React.FC<ComponentProps> = ({ data }) => {
    const { t } = useTranslation()
    const lastParams = useSelector((state) => state?.sportData?.lastUpdate?.params)
    const special = data?.special
    const specialFootball = special?.football
    const convertedSpecialFootball = converter('football', lastParams, specialFootball)?.not

    const mobileSpecialCount = () => {
        if (convertedSpecialFootball) {
            if (convertedSpecialFootball.length === 0 || convertedSpecialFootball === undefined) {
                return 0
            } else {
                return convertedSpecialFootball.length
            }
        } else {
            return 0
        }
    }

    return (
        <>
            {!isEmptyObject(special) && (
                <SMainContainer>
                    <MainTitle
                        title={t('topPage.popular')}
                        count={isEmptyObject(special) ? 0 : mobileSpecialCount()}
                        date={'special'}
                        type={'special'}
                    />
                    <>
                        {convertedSpecialFootball !== undefined && (
                            <>
                                {mobileSportsCount(convertedSpecialFootball) > 0 && (
                                    <SWhiteContainer>
                                        <Body seasons={convertedSpecialFootball} sport={'football'} />
                                    </SWhiteContainer>
                                )}
                            </>
                        )}
                    </>
                </SMainContainer>
            )}
        </>
    )
}

export default SpecialGame
