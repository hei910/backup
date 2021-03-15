import usePopularData from '@hooks/usePopularData'
import { sIdType } from '@type'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import EventCard from './EventCard'
import OddsDisplay from './OddsDisplay'
import PopularBanner from './PopularBanner'
import VideoFrame from '@components/common/liveFrame'
import useTranslation from '@hooks/useTranslation'

const SHeader = styled.div`
    display: flex;
    align-items: center;
`

const SLayout = styled.div``

const SHeaderText = styled.div`
    line-height: 36px;
    font-weight: 800;
    font-size: 28px;
`

const SLiveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px rgba(242, 242, 242, 0.6);
    background-image: linear-gradient(to bottom, #d2b497, #f4dfc8);
    margin-left: 20px;
    border-radius: 15px;
    color: #0c186c;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 16px;
`

const SSportSwitchLayout = styled.div`
    margin-top: 15px;
    display: flex;
`

const SSportSwitch = styled.div`
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
    display: flex;

    & > div:not(:last-child) {
        border-right: 1px solid rgba(23, 29, 41, 0.08);
    }
`

const SSportItem = styled.div<{ selected: boolean }>`
    color: ${(props) => (props.selected ? '#0c186c' : '#6d7278')};
    padding: 0 20px;
    margin: 10px 0;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
    position: relative;
`

const SSelectIndicator = styled.div<{ isShow?: boolean }>`
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
    width: ${(props) => (props.isShow ? '33px' : '0')};
    height: 3px;
    background: #0c186c;
    transition: 0.3s all;

    ${SSportItem}:hover & {
        width: 33px;
    }
`

const SPreviewLayout = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
    position: relative;
`

const SVideoLayout = styled.div`
    width: 66.5%;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
    background-color: #0c186c;
    border-radius: 10px;
    height: 100%;
`

const SMatchSelectLayout = styled.div<{ height?: number }>`
    width: 33%;
    border-radius: 10px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
`

const SSelectHeader = styled.div`
    background: #0c186c;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    justify-content: center;
    padding: 15px 0;
`

const SVideoSectionLayout = styled.div`
    margin-top: 10px;
    padding: 10px;
`

const SVideoStreamLayout = styled.div`
    color: #fff;
    width: 100%;
    border: 1px solid #dcdcdc;
`

const SOddsLayout = styled.div`
    padding: 0 10px 30px 10px;
`

const SPreHeader = styled.div`
    background: #fff;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #727272;
    font-weight: 500;
    font-size: 18px;
    display: flex;
    justify-content: center;
    padding: 15px 0;
    box-shadow: 0 1px 4px 0 #f2f2f2;
`

const SPreEventCardLayout = styled.div`
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    position: relative;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
`

const SPreEventCardItemLayout = styled.div`
    margin-top: 2px;
    flex-grow: 1;
    overflow-y: auto;
    background: #fff;
`

const SLiveLoadingLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background: #fff;
`

const SNoLiveMatchLayout = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SLiveLayout = styled.div`
    height: 204px;
    width: 100%;
    flex-shrink: 0;
    background: #fff;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    overflow: hidden;
`

const SDividerLine = styled.div`
    margin: 0 10px;
    border-top: 1px solid #d8d8d8;
`

const SHoverLayout = styled.div`
    cursor: pointer;
`

const SLiveCardLayout = styled.div`
    height: 152px;
    overflow-y: auto;
`

const SNoNonLiveLayout = styled.div`
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SBorderBottomLine = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: -7px;
    height: 5px;
    box-shadow: 0px -9px 6px 1px rgba(0, 0, 0, 0.4);
`

type ISportItem = {
    title: string
    sId: sIdType
    dataQa: string
}

const PopularLive = () => {
    const [sId, setSId] = useState<sIdType>('1')
    const { data, loading, error } = usePopularData({ sId })
    const [selectedId, setSelectedId] = useState('')
    const [videoPreference, setVideoPreference] = useState<'live' | 'animation'>('live')
    const t = useTranslation()

    const sportMenu: ISportItem[] = [
        {
            title: t('home.football'),
            sId: '1',
            dataQa: 'btnLiveFootball',
        },
        {
            title: t('home.basketball'),
            sId: '2',
            dataQa: 'btnLiveBasketball',
        },
        {
            title: t('home.tennis'),
            sId: '3',
            dataQa: 'btnLiveTennis',
        },
        {
            title: t('home.baseball'),
            sId: '4',
            dataQa: 'btnLiveBaseball',
        },
    ]

    //initialize the initial match at start
    useEffect(() => {
        if (data && data?.length !== 0 && data[0].seasonInfo.sId === sId && !selectedId) {
            setSelectedId(data[0].info.matchId)
        }
    }, [data, sId, selectedId])

    // remove current match selection when SID changed
    useEffect(() => {
        setSelectedId('')
    }, [sId])

    const getCurrentMatch = () => {
        if (!selectedId || !data) {
            return undefined
        }

        const match = data.find((item) => {
            return item.info.matchId === selectedId
        })

        return match
    }

    const getLiveMatch = () => {
        if (!data) {
            return undefined
        }

        const liveData = data.filter((item) => {
            return item.info.status === 'Live'
        })

        return liveData
    }

    const onMatchSelected = (matchId: string) => {
        //setting match Index
        setSelectedId(matchId)
        setVideoPreference('live')
    }

    const getNotLiveMatch = () => {
        if (!data) {
            return null
        }

        const liveData = data.filter((item) => {
            return item.info.status !== 'Live'
        })

        return liveData
    }

    const onSIdChange = (sId: sIdType) => {
        setSId(sId)
    }

    const liveMatch = getLiveMatch()
    const notLiveMatch = getNotLiveMatch()

    return (
        <SLayout>
            <SHeader>
                <SHeaderText>POPULAR LIVE</SHeaderText>
                <SLiveButton>{t('home.popularLive')}</SLiveButton>
            </SHeader>
            <SSportSwitchLayout>
                <SSportSwitch>
                    {sportMenu.map((item, index) => {
                        return (
                            <SSportItem
                                selected={sId === item.sId}
                                key={index}
                                onClick={() => onSIdChange(item.sId)}
                                data-qa={item.dataQa}>
                                {item.title}
                                <SSelectIndicator isShow={sId === item.sId} />
                            </SSportItem>
                        )
                    })}
                </SSportSwitch>
            </SSportSwitchLayout>

            <SPreviewLayout>
                <SVideoLayout>
                    <PopularBanner data={getCurrentMatch()} />
                    <SVideoSectionLayout>
                        <SVideoStreamLayout>
                            <VideoFrame
                                data={getCurrentMatch()}
                                dataLoading={loading}
                                dataError={error}
                                defaultHeight={387}
                                matchId={selectedId}
                                videoPreference={videoPreference}
                                data-qa="liveFrame"
                            />
                        </SVideoStreamLayout>
                    </SVideoSectionLayout>
                    <SOddsLayout>
                        <OddsDisplay data={getCurrentMatch()} />
                    </SOddsLayout>
                </SVideoLayout>
                <SMatchSelectLayout key={sId}>
                    <SLiveLayout>
                        <SSelectHeader>{t('home.inLive')}</SSelectHeader>
                        <SLiveCardLayout>
                            {!loading &&
                                liveMatch?.map((item, index) => {
                                    return (
                                        <SHoverLayout key={`${item.events.fixtureId}-${index}`}>
                                            <EventCard
                                                onCardSelected={onMatchSelected}
                                                onVideoPreferenceChange={(preference) => setVideoPreference(preference)}
                                                isLive={true}
                                                isSelected={selectedId === item.info.matchId}
                                                data={item}
                                            />
                                            <SDividerLine />
                                        </SHoverLayout>
                                    )
                                })}
                            {loading && <SLiveLoadingLayout>{t('home.loadingLive')}</SLiveLoadingLayout>}
                            {liveMatch?.length === 0 && (
                                <SNoLiveMatchLayout>{t('home.noLiveMatch')}</SNoLiveMatchLayout>
                            )}
                        </SLiveCardLayout>
                    </SLiveLayout>
                    <SPreEventCardLayout>
                        <SPreHeader>{t('home.preMatch')}</SPreHeader>
                        <SPreEventCardItemLayout>
                            {!loading &&
                                notLiveMatch?.map((item, index) => {
                                    return (
                                        <SHoverLayout key={`${item.events.fixtureId}-${index}`}>
                                            <EventCard
                                                onCardSelected={onMatchSelected}
                                                onVideoPreferenceChange={(preference) => setVideoPreference(preference)}
                                                isSelected={selectedId === item.info.matchId}
                                                isLive={false}
                                                data={item}
                                            />
                                            <SDividerLine />
                                        </SHoverLayout>
                                    )
                                })}
                            {loading && <SNoNonLiveLayout>{t('home.loadingMatch')}</SNoNonLiveLayout>}
                            {notLiveMatch?.length === 0 && <SNoNonLiveLayout>{t('home.noPreMatch')}</SNoNonLiveLayout>}
                        </SPreEventCardItemLayout>
                        <SBorderBottomLine />
                    </SPreEventCardLayout>
                </SMatchSelectLayout>
            </SPreviewLayout>
        </SLayout>
    )
}

export default PopularLive
