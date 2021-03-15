import React from 'react'
import styled from 'styled-components/macro'
import playgroundIcon from '@brand/assets/images/home/icon_live1.svg'
import liveIcon from '@brand/assets/images/home/icon_live2.svg'
import { IPopularData } from '@type'
import dayjs from 'dayjs'

const SLayout = styled.div`
    padding: 10px;
    background: #fff;
    position: relative;
    cursor: pointer;

    &:hover {
        background: #f3f3f3;
    }

    transition: 0.3s all;
`

const SCardLayout = styled.div`
    cursor: pointer;
`

const SSelectLine = styled.div<{ isShow: boolean }>`
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 3px;
    height: ${(props) => (props.isShow ? '100%' : 0)};
    background: #e02020;
    position: absolute;
    transition: 0.3s all;

    ${SCardLayout}:hover & {
        height: 100%;
    }
`

const SInfoRow = styled.div`
    display: flex;
    align-items: center;
`

const SLeagueInfo = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    flex-grow: 1;
    font-size: 14px;
`

const SIconLayout = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
    padding-left: 10px;
    width: 61.38px;
    justify-content: flex-end;
    flex-shrink: 0;
`

const SIconAbsolute = styled.div`
    display: flex;
    height: 30px;
    align-items: center;
    padding-left: 10px;
    width: 61.38px;
    justify-content: flex-end;
    position: absolute;
    right: 10px;
    top: 10px;
`

const STeamRow = styled.div`
    display: flex;
    margin-top: 10px;
`

const STeamColumn = styled.div<{ alignRight?: boolean }>`
    width: 36%;
    display: flex;
    word-break: break-all;
    font-size: 14px;
    align-items: center;
    text-align: ${(props) => (props.alignRight ? 'right' : 'left')};
    ${(props) => props.alignRight && `justify-content: flex-end`};
    ${(props) => props.alignRight && `padding-left: 8px`};
    ${(props) => !props.alignRight && `padding-right: 8px`};
`

const SScoreColumn = styled.div`
    width: 28%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
`

const SScoreText = styled.div`
    padding: 0 5px;
`

const SIcon = styled.img`
    width: 20.7px;
    height: 20.7px;
    cursor: pointer;
`

const SLiveIconLayout = styled.div`
    padding-left: 10px;
    height: 20.7px;
`

const SLeagueNameLayout = styled.div<{ isLive: boolean }>`
    ${(props) => !props.isLive && `flex-grow: 1`};
    ${(props) => props.isLive && `width: 120px`};
    word-break: break-all;
    padding-right: 8px;
`

const STimeLayout = styled.div`
    width: 90px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    flex-shrink: 0;
`

const STime = styled.div`
    font-size: 14px;
`

const SDate = styled.div`
    font-size: 14px;
`

const SLiveBadge = styled.div`
    width: 66px;
    height: 30px;
    border-radius: 18px;
    background: #e02020;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 12px;
    color: #fff;
`

type ComponentProps = {
    isLive: boolean
    isSelected: boolean
    data: IPopularData
    onVideoPreferenceChange: (preference: 'live' | 'animation') => any
    onCardSelected: (matchId: string) => any
}

const EventCard = ({ isLive, isSelected, data, onVideoPreferenceChange, onCardSelected }: ComponentProps) => {
    return (
        <SLayout>
            <SCardLayout onClick={() => onCardSelected(data.info.matchId)}>
                <SInfoRow>
                    <SLeagueInfo>
                        <SLeagueNameLayout isLive={isLive}>{data.seasonInfo.name}</SLeagueNameLayout>
                        {isLive && (data.info.liveStatusText || data.info.clock) ? (
                            <SLiveBadge>
                                {data.info.liveStatusText && <div>{data.info.liveStatusText}</div>}
                                {data.info.clock && <div>{data.info.clock}</div>}
                            </SLiveBadge>
                        ) : (
                            <STimeLayout>
                                <SDate>{dayjs(data.info.startTime).format('MM-DD')}</SDate>
                                <STime>{dayjs(data.info.startTime).format('HH:ss')}</STime>
                            </STimeLayout>
                        )}
                    </SLeagueInfo>
                    {isLive && (
                        <SIconLayout>
                            {
                                //   dummy space
                            }
                        </SIconLayout>
                    )}
                </SInfoRow>
                <STeamRow>
                    <STeamColumn>{data.events.competitors.home.name}</STeamColumn>
                    <SScoreColumn>
                        <span>{isLive && data.events.score.homeScore}</span>
                        <SScoreText>VS</SScoreText>
                        <span>{isLive && data.events.score.awayScore}</span>
                    </SScoreColumn>
                    <STeamColumn alignRight>{data.events.competitors.away.name}</STeamColumn>
                </STeamRow>
                <SSelectLine isShow={isSelected} />
            </SCardLayout>
            <SIconAbsolute>
                {isLive && (
                    <>
                        {data.info.animationProviderVendor && (
                            <SIcon
                                src={playgroundIcon}
                                onClick={() => {
                                    if (!isSelected) {
                                        onCardSelected(data.info.matchId)
                                    }

                                    onVideoPreferenceChange('animation')
                                }}
                            />
                        )}
                        {data.info.videoVendor && (
                            <SLiveIconLayout
                                onClick={() => {
                                    if (!isSelected) {
                                        onCardSelected(data.info.matchId)
                                    }

                                    onVideoPreferenceChange('live')
                                }}>
                                <SIcon src={liveIcon} />
                            </SLiveIconLayout>
                        )}
                    </>
                )}
            </SIconAbsolute>
        </SLayout>
    )
}

export default EventCard
