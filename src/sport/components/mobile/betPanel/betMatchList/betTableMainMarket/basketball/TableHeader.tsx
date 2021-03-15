import { LiveVenueIcon1 } from '@sport/components/icons'
import HigherRateButton from '@sport/components/mobile/higherRateButton'
import LiveStreamIcon from '@sport/components/mobile/liveStreamIcon'
import LiveStatIcon from '@sport/components/mobile/statIcon'
import MoreMarketBadge from '@sport/components/mobile/moreMarketBadge'
import NeutralIcon from '@sport/components/mobile/neutralIcon'
import { ConvertedEvent, ConvertedMatches, ConvertedMatchInfo } from '@sport/converters/types'
import dayjs from 'dayjs'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'
import { basketballSectionMap } from '@sport/util/dictionary'
import { getDiffMinutes } from '@sport/util/general'
import { Link } from 'react-router-dom'
import { sportSId } from '@sport/util/constant'

const SHeaderLayout = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    height: 30px;
    background: #fff;
    padding: 0 6px 0 10px;
`

const SHeaderLeft = styled.div`
    display: flex;
    align-items: center;
`

const SHeaderRight = styled.div`
    display: flex;
    align-items: center;
`

const SDate = styled.div`
    color: #666666;
    font-weight: 100;
`
const STime = styled.div`
    font-weight: 600;
    margin-left: 5px;
`

const SMoreLayout = styled.div`
    margin-left: 8px;
`

const SCtidDescription = styled.span`
    padding: 1px 7px;
    color: #fff;
    font-size: 10px;
    background: #4d9fea;
    font-weight: bold;
    border-radius: 5px;
`
const SPlaygroundIcon = styled(LiveVenueIcon1)`
    width: 21px;
    height: 20px;
    margin-left: 5px;

    rect,
    polygon {
        fill: ${(props) => props.theme.sport.colors.secondary};
    }
`

interface TableTeamHeaderHeaderProps {
    match: ConvertedMatches
    matchInfo: ConvertedMatchInfo
    event: ConvertedEvent
}

const TeamHeader: React.FC<TableTeamHeaderHeaderProps> = ({ match, matchInfo, event }) => {
    const { t } = useTranslation()
    const { date, matchsStatus } = useCustomParams()
    const timezone = useSelector((state) => parseInt(state.sportGlobal.timezone))

    // Convert timezone to '+/-0X format eg. +08 / -04
    const timezoneCode = `${timezone > 0 ? '+' : '-'}${`0${Math.abs(timezone)}`.slice(-2)}`
    const matchStartTime = new Date(`${matchInfo.startTime}${timezoneCode}:00`)

    const getLiveStatusText = (liveStatus: string) => {
        const displayText = t(basketballSectionMap[liveStatus])
        return displayText || ''
    }

    const shouldEPSButtonShow = () => {
        //only one event e.g. ctid = 0;
        const selectedEvent = match.events.find((event) => {
            return event.ctid === 0
        })

        return selectedEvent?.markets.some((market) => {
            return market.marketCode === 'eps'
        })
    }

    const getDay = () => {
        switch (date) {
            case 'inplay':
                return getLiveStatusText(matchInfo.liveStatus)
            case 'upcoming':
                return ''
            default:
                return dayjs(matchInfo.startTime).format('DD/MM')
        }
    }

    const getTime = () => {
        switch (date) {
            case 'inplay':
                return matchInfo.clock
            case 'upcoming':
                // return `${Math.abs(dayjs().diff(matchStartTime, 'minute'))} ${t('betPanel.minute')}`;
                return matchStartTime.toString() === 'Invalid Date'
                    ? dayjs(matchInfo.startTime).format('HH:mm')
                    : `${getDiffMinutes(new Date(), matchStartTime)} ${t('betPanel.minute')}`
            default:
                return dayjs(matchInfo.startTime).format('HH:mm')
        }
    }
    const copiedMatchStatus = { matchStatus: `${matchsStatus}` }
    return (
        <SHeaderLayout>
            <SHeaderLeft>
                {event.ctid !== 0 ? (
                    <SCtidDescription>{event.description}</SCtidDescription>
                ) : (
                    <>
                        <SDate>{getDay()}</SDate>
                        <STime>{getTime()}</STime>
                    </>
                )}
                <SMoreLayout>
                    <MoreMarketBadge count={matchInfo.totalMarkets} matchId={matchInfo.matchId} />
                </SMoreLayout>
            </SHeaderLeft>
            <SHeaderRight>
                {shouldEPSButtonShow() && event.ctid === 0 && <HigherRateButton fixtureId={matchInfo.matchId} />}
                {matchInfo.isNeutral && <NeutralIcon />}
                {date === 'inplay' && (
                    <Link
                        to={{
                            pathname: `/sport/${date}/basketball/details/${matchInfo.matchId}/${matchInfo.source}`,
                            state: copiedMatchStatus,
                        }}>
                        <LiveStreamIcon
                            matchId={matchInfo.matchId}
                            sports={'basketball'}
                            fixtureId={event.fixtureId}
                            source={matchInfo.source}
                        />
                    </Link>
                )}
                {date !== 'inplay' && matchInfo.haveLiveMatch && (
                    <Link
                        to={{
                            pathname: `/sport/${date}/basketball/details/${matchInfo.matchId}/${matchInfo.source}`,
                            state: copiedMatchStatus,
                        }}>
                        <SPlaygroundIcon />
                    </Link>
                )}
                <LiveStatIcon
                    sId={sportSId['basketball']}
                    mId={matchInfo.matchId}
                />
            </SHeaderRight>
        </SHeaderLayout>
    )
}

export default TeamHeader
