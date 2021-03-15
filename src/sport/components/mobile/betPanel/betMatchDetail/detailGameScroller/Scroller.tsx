import { MobileBackToArrow } from '@sport/components/icons'
import BaseballLiveStatus from '@sport/components/mobile/baseballLiveStatus'
import MovingCounter from '@sport/components/mobile/movingTimer'
import { ConvertedMatches, ConvertedSeason } from '@sport/converters/types'
import dayjs from 'dayjs'
import useCustomParams from '@sport/hooks/useCustomParams'
import useUpdateEffect from '@sport/hooks/useUpdateEffect'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useHistory } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import { useSelector } from '@sport/stores'
import { MatchInfo, Score } from '@services/sportData/types'
import styled from 'styled-components/macro'
import { liveSectionCodeMap } from '@sport/util/dictionary'
interface ComponentProps {
    seasonGames?: ConvertedMatches[]
    allSeasons?: ConvertedSeason[]
    isShow: boolean
}

interface GameBlockComponent {
    isActive: boolean
    isShow: boolean
    info: MatchInfo
}
interface InplayGameBlockComponent {
    isActive: boolean
    firstBlock: boolean
    info: MatchInfo
    score: Score
}

interface InplayScoreComponent {
    score?: Score | null
    home: boolean
}
const SMainContainter = styled.div`
    width: 100%;
    position: relative;
`

const SGameRow = styled(animated.div)<{ inplay: string; nogames: string; isshow?: string }>`
    overflow-x: scroll;
    white-space: nowrap;
    align-items: center;
    padding-left: ${(props) => (props.inplay === 'true' ? '5px' : '0px')};
    ${(props) => props.nogames && 'height: 60px;'}
    ${(props) => (props.inplay === 'true' ? 'flex: 9' : 'width: 100%')};
    margin-top: 10px;
    padding-right: 5px;
    transition: padding-top 1s ease;
`

const SInplayGameRow = styled.div<{ nogames: string }>`
    overflow-x: scroll;
    white-space: nowrap;
    align-items: center;
    padding-left: 5px;
    ${(props) => props.nogames && 'height: 60px;'}
    flex: 9;
    margin-top: 10px;
    padding-right: 5px;
    transition: padding-top 1s ease;
`

const SBlock = styled.div<{ isActive: string; isshow?: string }>`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: ${(props) => (props.isActive === 'true' ? 'white' : '#666')};
    min-width: 134px;
    height: 45px;
    /* max-width: 200px; */
    /* overflow-x: hidden; */
    background: ${(props) => (props.isActive === 'true' ? props.theme.sport.colors.accent : 'white')};
    border-radius: 5px;
    margin: 0 5px;
    padding: 0px 10px;
    transition: background-color 1s ease-in-out, color 0.5s ease-in-out;
    box-shadow: ${(props) =>
        props.isActive === 'true' ? '3px 3px 6px 0px rgba(255, 146, 0, 0.3)' : '3px 3px 6px 0px rgba(0,0,0,0.1)'};
    visibility: ${(props) => (props.isshow === 'true' ? 'visible' : 'hidden')};
`

const SBlockWrapper = styled(Link)<{ firstblock?: string }>`
    ${(props) => props.firstblock === 'true' && 'margin-left: 35px;'}
    display: inline-block;
    margin-bottom: 10px;
`

const SLeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
`

const SInplayScoreTeam = styled.div`
    display: flex;
    align-items: center;
    flex-direction: flex-start;
    margin: 3px 0px;
`

const SRightColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SCompetitors = styled.div`
    font-size: 12px;
    /* margin-top: 5px; */
    /* max-width: 100px; */

    /* white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
`

const STime = styled(SCompetitors)`
    margin: 3px 0px;
`

const SDate = styled(SCompetitors)`
    font-size: 10px;
    margin: 3px 0px;
`
const SScore = styled.div`
    font-size: 12px;
    margin-right: 10px;
    min-width: 10px;
`

const SRedCard = styled.div`
    min-height: 10px;
    /* width: 10px; */
    background: ${(props) => props.theme.sport.colors.error};
    margin: 0 5px;
    padding: 0px 2px;
    font-size: 10px;
    color: white;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SEmptyCard = styled.div`
    height: 10px;
    width: 10px;
    margin-right: 3px;
`

const SInplayArrowContainer = styled.div`
    width: 15px;
    height: 15px;
    margin-right: 5px;
`
const SInplayBackArrow = styled.div`
    background: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    height: 45px;
    width: 35px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`

const InplayScore: React.FC<InplayScoreComponent> = ({ home, score }) => {
    if (score === undefined || score === null) {
        return null
    } else {
        if (home) {
            if (score.hRedCard > 0) {
                return <SRedCard>{score?.hRedCard}</SRedCard>
            } else if (score.hRedCard === 0 && score.aRedCard > 0) {
                return <SEmptyCard />
            } else {
                return null
            }
        } else {
            if (score.aRedCard > 0) {
                return <SRedCard>{score?.aRedCard}</SRedCard>
            } else if (score.aRedCard === 0 && score.hRedCard > 0) {
                return <SEmptyCard />
            } else {
                return null
            }
        }
    }
}

const GameBlock: React.FC<GameBlockComponent> = ({ isActive, info, isShow }) => {
    const { sports, date } = useCustomParams()
    const source = useSelector((state) => state.sportGlobal.dataSource)
    return (
        <SBlockWrapper to={`/sport/${date}/${sports}/details/${info.matchId}/${source}`}>
            <SBlock isActive={isActive.toString()} isshow={isShow.toString()}>
                <SLeftColumn>
                    <SCompetitors>{info?.competitors?.home?.name}</SCompetitors>
                    <SCompetitors>{info?.competitors?.away?.name}</SCompetitors>
                </SLeftColumn>
                <SRightColumn>
                    <STime>{dayjs(info?.startTime).format('HH:mm')}</STime>
                    <SDate>{dayjs(info?.startTime).format('DD-MM')}</SDate>
                </SRightColumn>
            </SBlock>
        </SBlockWrapper>
    )
}

const InplayGameBlock: React.FC<InplayGameBlockComponent> = ({ isActive, score, info, firstBlock }) => {
    const { sports } = useCustomParams()
    const source = useSelector((state) => state.sportGlobal.dataSource)
    const { t } = useTranslation()

    return (
        <SBlockWrapper
            firstblock={firstBlock.toString()}
            to={`/sport/inplay/${sports}/details/${info.matchId}/${source}`}>
            <SBlock isActive={isActive.toString()} isshow={'true'}>
                <SLeftColumn>
                    <SInplayScoreTeam>
                        <SScore>{score?.homeScore}</SScore>
                        <SCompetitors>{info?.competitors?.home?.name}</SCompetitors>
                        <InplayScore home={true} score={score} />
                    </SInplayScoreTeam>
                    <SInplayScoreTeam>
                        <SScore>{score?.awayScore}</SScore>
                        <SCompetitors>{info?.competitors?.away?.name}</SCompetitors>
                        <InplayScore home={false} score={score} />
                    </SInplayScoreTeam>
                </SLeftColumn>
                <SRightColumn>
                    {info?.clock?.length > 0 && (
                        <STime>
                            {sports === 'football' && <MovingCounter currentTime={info?.clock} />}
                            {sports !== 'football' && <>{info?.clock}</>}
                        </STime>
                    )}
                    {sports !== 'baseball' && <SDate>{t(liveSectionCodeMap(sports, info.liveStatus))}</SDate>}
                    {sports === 'baseball' && (
                        <BaseballLiveStatus
                            liveStatus={info.liveStatus}
                            fontSize={10}
                            color={isActive ? '#ffffff' : '#666'}
                        />
                    )}
                </SRightColumn>
            </SBlock>
        </SBlockWrapper>
    )
}

const Scroller: React.FC<ComponentProps> = ({ seasonGames, allSeasons, isShow }) => {
    const { fixtureId, date, sports } = useCustomParams()
    const history = useHistory()
    const [init, setInit] = useState(false)
    const props = useSpring({
        height: isShow ? 59 : 0,
        transform: `translate3d(0,20px,0)`,
        from: { height: isShow ? 0 : 59, transform: `translate3d(0,0,0)` },
        immediate: !init,
    })
    const backToPage = useSelector((state) => state.sportGlobal.backToPage)
    useUpdateEffect(() => {
        setInit(true)
    }, [isShow])
    const onClickGoBack = () => {
        if (backToPage === 'home') {
            history.push(`/sport/home`)
        } else {
            history.push(`/sport/inplay/${sports}`)
        }
    }
    return (
        <>
            <SMainContainter>
                {date === 'inplay' && allSeasons !== undefined && allSeasons.length > 0 && (
                    <SInplayBackArrow onClick={onClickGoBack}>
                        <SInplayArrowContainer>
                            <MobileBackToArrow />
                        </SInplayArrowContainer>
                    </SInplayBackArrow>
                )}
                {date !== 'inplay' && (
                    <SGameRow
                        style={{ height: props.height, transform: props.transform }}
                        inplay={'false'}
                        nogames={(seasonGames === undefined || seasonGames.length === 0).toString()}
                        isshow={isShow.toString()}>
                        {seasonGames !== undefined && seasonGames.length > 0 && (
                            <>
                                {seasonGames.map((game, index) => {
                                    return (
                                        <GameBlock
                                            isActive={isShow ? game?.info?.matchId.toString() === fixtureId : false}
                                            info={game?.info}
                                            isShow={isShow}
                                            key={`SGameRow-GameBlock-${index}`}
                                        />
                                    )
                                })}
                            </>
                        )}
                    </SGameRow>
                )}

                {date === 'inplay' && (
                    <>
                        {allSeasons !== undefined && allSeasons.length > 0 && (
                            <SInplayGameRow nogames={(allSeasons !== undefined && allSeasons.length > 0).toString()}>
                                {allSeasons?.map((season, sIndex) => (
                                    <React.Fragment key={`SGameRow-InplayGameBlock-${sIndex}`}>
                                        {season.matchs.map((game, index) => (
                                            <InplayGameBlock
                                                isActive={isShow ? game?.info?.matchId.toString() === fixtureId : false}
                                                info={game?.info}
                                                score={game?.events?.[0]?.score}
                                                firstBlock={sIndex === 0 && index === 0}
                                                key={`SGameRow-InplayGameBlock-${sIndex}-${index}`}
                                            />
                                        ))}
                                    </React.Fragment>
                                ))}
                            </SInplayGameRow>
                        )}
                    </>
                )}
            </SMainContainter>
        </>
    )
}

export default Scroller
