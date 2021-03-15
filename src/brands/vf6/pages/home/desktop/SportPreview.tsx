import { useEffect, useState } from 'react'

import { IPopularData, sIdType } from '@type'

import styled from 'styled-components/macro'
import EventInfo from './EventInfo'
import EventCard from './EventCard'
import VideoIFrame from '@components/common/liveFrame'
import useTranslation from '@hooks/useTranslation'

const SLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
`

const SIFrameLayout = styled.div`
    width: 100%;
    flex-shrink: 0;
    /* border: 1px solid #dcdcdc; */
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
`

const SEventInfoLayout = styled.div`
    background: #f3f3f3;
    margin-top: 10px;
    padding-bottom: 20px;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.03);
`

const SCardLayout = styled.div`
    flex-grow: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.03);

    &::-webkit-scrollbar {
        display: none;
    }
`

const SSportChange = styled.div`
    display: flex;
    height: 50px;
    align-items: center;
    background: #fff;
    box-shadow: 5px -8px 10px 0 rgba(23, 29, 41, 0.08);
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
`

const SMenuItem = styled.div<{ selected: boolean }>`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    position: relative;
    height: 30px;
    transition: 0.3s all;
    color: ${(props) => (props.selected ? '#3d7eeb' : 'initial')};
`

const SSelectHighlight = styled.div<{ isShow: boolean }>`
    position: absolute;
    opacity: ${(props) => (props.isShow ? 1 : 0)};
    transition: 0.3s all;
    height: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 35px;
    bottom: 0;
    border-radius: 3px;
    background: #3d7eeb;
`

const SMenuText = styled.div`
    cursor: pointer;
    user-select: none;
`

const SSportDetailLayout = styled.div`
    height: 100%;
    width: 100%;
    padding-bottom: 50px;
    /* padding-bottom: 10px 20px 50px 20px; */
`

const SInnerLayout = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px 20px 0 20px;
    height: 100%;
    width: 100%;
    box-shadow: -1px -1px 4px 0px rgba(0, 0, 0, 0.1);
`

const SEventCardLayout = styled.div`
    cursor: pointer;
`

type ISportItem = {
    title: string
    sId: sIdType
}

type ISportPreviewProps = {
    data: IPopularData[] | null
    dataLoading: boolean
    dataError: boolean
    onSIdChange: (sId: sIdType) => void
    currentSId: sIdType
}

const SportPreview = ({ data, dataLoading, dataError, onSIdChange, currentSId }: ISportPreviewProps) => {
    const [currentSelectedId, setCurrentSelectedId] = useState<undefined | string>(undefined)
    const [videoPreference, setVideoPreference] = useState<undefined | 'live' | 'animation'>(undefined)
    const t = useTranslation()

    const sportMenu: ISportItem[] = [
        {
            title: t('home.football'),
            sId: '1',
        },
        {
            title: t('home.basketball'),
            sId: '2',
        },
        {
            title: t('home.tennis'),
            sId: '3',
        },
        {
            title: t('home.baseball'),
            sId: '4',
        },
    ]

    // update currentMatchId when sid is changed, but not interval update
    useEffect(() => {
        if (!data) {
            // if no data is found, skip the update
            return
        }

        // check new data still have current matchId
        const matchedMatch = data?.find((item) => {
            return item.info.matchId === currentSelectedId
        })

        // if current selected match is removed after api update, replaced with the first match in data
        // if Sid changed, replaced with the first match in data in selected sport

        if (!matchedMatch || !currentSelectedId) {
            return setCurrentSelectedId(data?.[0]?.info?.matchId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const onSportSelected = (sId: sIdType) => {
        // clear current selected id when new sid is selected
        setCurrentSelectedId(undefined)
        onSIdChange(sId)
    }

    const onSportIdChanged = (matchId: string) => {
        setCurrentSelectedId(matchId)
    }

    const getCurrentData = () => {
        if (!currentSelectedId) {
            return data?.[0]
        } else {
            return data?.find((item) => {
                return item.info.matchId === currentSelectedId
            })
        }
    }

    return (
        <SLayout>
            <SSportDetailLayout>
                <SInnerLayout>
                    <SIFrameLayout>
                        <VideoIFrame
                            dataLoading={dataLoading}
                            dataError={dataError}
                            data={getCurrentData()}
                            videoPreference={videoPreference}
                            matchId={currentSelectedId}
                        />
                    </SIFrameLayout>
                    <SEventInfoLayout>
                        <EventInfo
                            data={getCurrentData()}
                            dataLoading={dataLoading}
                            dataError={dataError}
                            onVideoPreferenceChange={(preference: 'animation' | 'live') =>
                                setVideoPreference(preference)
                            }
                        />
                    </SEventInfoLayout>
                    <SCardLayout>
                        {!dataLoading &&
                            data?.map((event, index) => {
                                return (
                                    <SEventCardLayout key={`${event.events.fixtureId}-${index}`}>
                                        <EventCard
                                            isSelected={event.info.matchId === currentSelectedId}
                                            event={event}
                                            onCardPressed={(matchId) => {
                                                onSportIdChanged(matchId)
                                            }}
                                        />
                                    </SEventCardLayout>
                                )
                            })}
                    </SCardLayout>
                </SInnerLayout>
            </SSportDetailLayout>
            <SSportChange>
                {sportMenu.map((sport) => {
                    return (
                        <SMenuItem selected={currentSId === sport.sId} key={sport.sId}>
                            <SMenuText onClick={() => onSportSelected(sport.sId)} data-qa={`sid${sport.sId}`}>{sport.title}</SMenuText>
                            <SSelectHighlight isShow={currentSId === sport.sId} />
                        </SMenuItem>
                    )
                })}
            </SSportChange>
        </SLayout>
    )
}

export default SportPreview
