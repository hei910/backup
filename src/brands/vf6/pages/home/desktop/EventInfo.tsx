import styled from 'styled-components/macro'
import { IPopularData } from '@type'

import { animated, useSpring } from 'react-spring'
import useMeasure from 'react-use-measure'
import MovingCounter from '@components/common/counter'

import stadiumIcon from '@brand/assets/images/home/stadium@2x.png'
import videoIcon from '@brand/assets/images/home/video@2x.png'
import homeIcon from '@brand/assets/images/home/red-left.png'
import awayIcon from '@brand/assets/images/home/blue-right.png'
import bgImg from '@mixins/backgroundImg'

const { ResizeObserver } = require('@juggle/resize-observer')

const SScoreLayout = styled.div`
    display: flex;
    text-align: center;
    margin-top: 10px;
    align-items: center;
`

const STeamLayout = styled.div`
    width: 38%;
    padding: 0 8px;
`

const SScore = styled.div`
    width: 24%;
`

const SIconLayout = styled.div`
    margin-bottom: 10px;
`
const STeamText = styled.div`
    font-size: 13px;
    color: #333745;
`

const SIcon = styled.div<{ type: string }>`
    ${(props) => props.type === 'stadium' && bgImg(stadiumIcon, 'cover', 'no-repeat')};
    ${(props) => props.type === 'video' && bgImg(videoIcon, 'cover', 'no-repeat')};
    height: 23px;
    width: 23px;
    cursor: pointer;
`

const SIconLayout2 = styled.div`
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
`

const SVideoDetail = styled.div`
    height: 30px;
    align-items: center;
    display: flex;
    justify-content: center;
    position: relative;
`

const SPeriod = styled.div`
    padding: 0 10px;
    font-size: 13px;
    color: #ffffff;
    display: flex;
    height: 20px;
    align-items: center;
    background: #e02020;
    border-radius: 10px;
`

const SVideoLayout = styled.div`
    margin-left: 5px;
`

const SLoading = styled.div`
    padding: 40px;
    display: flex;
    justify-content: center;
`

const SLayout = styled.div`
    padding-top: 10px;
`

const STeamImg = styled.img`
    height: 50px;
    width: 50px;
`

const SMovingCounterLayout = styled.div`
    margin-left: 8px;
`

const EventInfo = ({
    data,
    dataLoading,
    dataError,
    onVideoPreferenceChange,
}: {
    data: IPopularData | undefined
    dataLoading: boolean
    dataError: boolean
    onVideoPreferenceChange: (preference: 'animation' | 'live') => any
}) => {
    const [bind, { height }] = useMeasure({ polyfill: ResizeObserver })
    const props = useSpring({ height })

    const getStatusText = () => {
        if (dataLoading) {
            return '载入中...'
        } else if (dataError) {
            return '载入发生错误'
        } else if (!data) {
            return '没有场次显示'
        }
    }

    return (
        <animated.div style={props}>
            <SLayout ref={bind}>
                {data && !dataLoading ? (
                    <>
                        {data.info.liveStatusText && (
                            <SVideoDetail>
                                <SPeriod>
                                    {data.info.liveStatusText}
                                    {data.info.clock && (
                                        <SMovingCounterLayout>
                                            <MovingCounter
                                                currentTime={data.info.clock}
                                                staticTimer={data.seasonInfo.sId !== '1'}
                                            />
                                        </SMovingCounterLayout>
                                    )}
                                </SPeriod>
                                <SIconLayout2>
                                    {data.info.animationProviderVendor && (
                                        <SIcon type={'stadium'} onClick={() => onVideoPreferenceChange('animation')} />
                                    )}
                                    {data.info.videoVendor && (
                                        <SVideoLayout>
                                            <SIcon type={'video'} onClick={() => onVideoPreferenceChange('live')} />
                                        </SVideoLayout>
                                    )}
                                </SIconLayout2>
                            </SVideoDetail>
                        )}

                        <SScoreLayout>
                            <STeamLayout>
                                <SIconLayout>
                                    <STeamImg src={homeIcon} />
                                </SIconLayout>
                                <STeamText>{data.events.competitors.home.name}</STeamText>
                            </STeamLayout>
                            <SScore>
                                {data.events.score.homeScore} : {data.events.score.awayScore}
                            </SScore>
                            <STeamLayout>
                                <SIconLayout>
                                    <STeamImg src={awayIcon} />
                                </SIconLayout>
                                <STeamText>{data.events.competitors.away.name}</STeamText>
                            </STeamLayout>
                        </SScoreLayout>
                    </>
                ) : (
                    <SLoading>{getStatusText()}</SLoading>
                )}
            </SLayout>
        </animated.div>
    )
}

export default EventInfo
