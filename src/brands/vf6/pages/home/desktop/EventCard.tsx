import { useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import stadiumIcon from '@brand/assets/images/home/stadium@2x.png'
import videoIcon from '@brand/assets/images/home/video@2x.png'
import { IPopularData } from '@type'
import dayjs from 'dayjs'
import MovingCounter from '@components/common/counter'

import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'

import bgImg from '@mixins/backgroundImg'
const { ResizeObserver } = require('@juggle/resize-observer')

const SLayout = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.03);
    margin-top: 2px;
`
const SLeagueInfo = styled.div`
    display: flex;
    font-size: 12px;
`
const STeams = styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 15px;
`

const STeamName = styled.div<{ right?: boolean }>`
    width: 43%;
    text-align: ${(props) => (props.right ? 'right' : 'left')};
`

const SVSText = styled.div`
    width: 14%;
    text-align: center;
`

const SLeagueName = styled.div`
    width: 50%;
    padding-right: 10px;
    display: flex;
    align-items: center;
    font-weight: bold;
`
const SLeagueDetail = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SDateLayout = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
`

const SIconLayout = styled.div`
    display: flex;
    min-width: 50px;
    justify-content: flex-end;
    padding-left: 25px;
`

const SIcon = styled.div<{ type: string }>`
    ${(props) => props.type === 'stadium' && bgImg(stadiumIcon, 'cover', 'no-repeat')};
    ${(props) => props.type === 'video' && bgImg(videoIcon, 'cover', 'no-repeat')};
    height: 22px;
    width: 22px;
`

const SVideoLayout = styled.div`
    margin-left: 5px;
`

const SLiveBadge = styled.div`
    background: #e02020;
    padding: 3px 8px;
    color: #fff;
    font-size: 13px;
    border-radius: 10px;
    font-weight: 500;
`

const SEventTime = styled.span`
    margin-left: 10px;
`

const SScoreText = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: #232323;
`

type componentProps = {
    event: IPopularData
    onCardPressed: (seasonId: string) => void
    isSelected?: boolean
}

const EventCard = ({ event, onCardPressed, isSelected = false }: componentProps) => {
    const [bind, { height }] = useMeasure({ polyfill: ResizeObserver })
    const [isInit, setInit] = useState(false)
    const props = useSpring({ height: isSelected ? 0 : isInit ? height : 'auto', overflow: 'hidden' })

    useEffect(() => {
        setInit(true)
    }, [])

    return (
        <animated.div style={{ height: props.height, overflow: props.overflow }}>
            <SLayout onClick={() => onCardPressed(event.info.matchId)} ref={bind}>
                <SLeagueInfo>
                    <SLeagueName>
                        {event.info.status === 'Live' ? (
                            <div>
                                {(event.info.liveStatusText || event.info.clock) && (
                                    <SLiveBadge>
                                        {`${event.info.liveStatusText}`}{' '}
                                        {event.info.clock && (
                                            <MovingCounter
                                                currentTime={event.info.clock}
                                                staticTimer={event.seasonInfo.sId !== '1'}
                                            />
                                        )}
                                    </SLiveBadge>
                                )}
                            </div>
                        ) : (
                            event.seasonInfo.name
                        )}
                    </SLeagueName>
                    <SLeagueDetail>
                        <SDateLayout>
                            {event.info.status === 'Live' ? (
                                <SScoreText>{`${event.events.score.homeScore} - ${event.events.score.awayScore}`}</SScoreText>
                            ) : (
                                <>
                                    <span>{dayjs(event.info.startTime).format('MM/DD')}</span>
                                    <SEventTime>{dayjs(event.info.startTime).format('HH:mm')}</SEventTime>
                                </>
                            )}
                        </SDateLayout>
                        {(event.info.animationProviderVendor || event.info.videoVendor) && (
                            <SIconLayout>
                                {event.info.animationProviderVendor && <SIcon type={'stadium'} />}
                                {event.info.videoVendor && (
                                    <SVideoLayout>
                                        <SIcon type={'video'} />
                                    </SVideoLayout>
                                )}
                            </SIconLayout>
                        )}
                    </SLeagueDetail>
                </SLeagueInfo>
                <STeams>
                    <STeamName>{event.events.competitors.home.name}</STeamName>
                    <SVSText>VS</SVSText>
                    <STeamName right={true}>{event.events.competitors.away.name}</STeamName>
                </STeams>
            </SLayout>
        </animated.div>
    )
}

export default EventCard
