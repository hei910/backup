import { MobileBackToArrow } from '@sport/components/icons'
import { ConvertedMatches, ConvertedSeason } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import useUpdateEffect from '@sport/hooks/useUpdateEffect'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { animated, useSpring } from 'react-spring'
import { SeasonInfo } from '@services/sportData/types'
import styled from 'styled-components/macro'
import Scroller from './Scroller'
import dayjs from 'dayjs'
import { useSelector } from '@redux'

interface ComponentProps {
    seasonInfo: SeasonInfo
    seasonGames: ConvertedSeason[]
    convertedData?: ConvertedMatches
    locationMatchStatus?: string
}
const SMainContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: Column;
    align-items: center;
    border-top: 1px solid #f2f2f2;
`
const SArrowContainer = styled.div`
    width: 13px;
    height: 14.8px;
    margin: 0 10px 8px 0;
`

// const SInplayArrowContainer = styled.div`
//     width: 20px;
//     height: 20px;
//     margin-right: 5px;
// `;

const SBackArrow = styled.div`
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SInnerContainerFlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #ffffff;
    padding: 10px;
`

const SLeftColumn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const SSeasonName = styled.div`
    font-size: 18px;
    font-weight: 600;
`

const SRightColumn = styled.div``

// const SExpandLayout = styled.div<{ isShow: boolean }>`
//     width: 100%;
//     height: ${(props) => (props.isShow ? '59x' : '0px')};
//     transition: all 1s ease;
// `;

const SExpandLayout = styled(animated.div)`
    width: 100%;
`

const SChevronTop = styled.div`
    width: 6px;
    height: 6px;
    border-top: 1px solid white;
    border-right: 1px solid white;
    transform: rotate(-45deg);
    margin-left: 5px;
    margin-top: 3px;
`

const SChevronBottom = styled(SChevronTop)`
    margin-top: 2px;
    transform: rotate(135deg);
`
const SGameCountInSeason = styled.div`
    background: black;
    border-radius: 5px;
    height: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 6px;
`

const SCount = styled.div`
    color: white;
    font-size: 12px;
`

const SMainInplayContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

// const SInplayBackArrow = styled.div`
//     background: white;
//     display: flex;
//     flex-direction: row;
//     align-items: center;
//     justify-content: center;
//     margin-top: 10px;
//     height: 50px;
//     width: 50px;
//     border-top-right-radius: 30px;
//     border-bottom-right-radius: 30px;
// `;
const RegularScroller: React.FC<ComponentProps> = ({ seasonInfo, seasonGames, convertedData, locationMatchStatus }) => {
    const history = useHistory()
    const { date, sports } = useCustomParams()
    const defaultShow = seasonGames?.[0]?.matchs?.length > 1 ? true : false
    const [isShow, setShow] = useState(defaultShow)
    const [init, setInit] = useState(false)
    const isShowHandler = () => {
        setShow(!isShow)
    }
    const gameDate = dayjs(convertedData?.info?.startTime ?? '').format(`YYYY-MM-DD`)
    const d = new Date()
    const currentDate = dayjs(d).format(`YYYY-MM-DD`)
    const matchStatus = locationMatchStatus ?? gameDate === currentDate ? 'Today' : gameDate

    const backToPage = useSelector((state) => state.sportGlobal.backToPage)
    const props = useSpring({
        height: isShow ? 59 : 0,
        transform: `translate3d(0,20px,0)`,
        from: { height: isShow ? 0 : 59, transform: 'translate3d(0,0,0)' },
        immediate: !init,
    })

    const onClickGoBack = () => {
        if (backToPage === 'home') {
            history.push(`/sport/home`)
        } else {
            if (date === 'parlay') {
                history.push(`/sport/${date}/${sports}/${seasonInfo.seasonId}/parlay-Early`)
            } else if (date === 'parlay-Live' || date === 'parlay-Today') {
                history.push(`/sport/${date}/${sports}`)
            } else if (date === 'future') {
                history.push(`/sport/${date}/${sports}/${seasonInfo.seasonId}/${matchStatus}`)
            } else {
                history.push(`/sport/${date}/${sports}/${seasonInfo.seasonId}`)
            }
        }
    }

    useUpdateEffect(() => {
        setInit(true)
    }, [isShow])
    return (
        <SMainContainer>
            <SInnerContainerFlexRow>
                <SLeftColumn>
                    <SBackArrow onClick={onClickGoBack}>
                        <SArrowContainer>
                            <MobileBackToArrow />
                        </SArrowContainer>
                    </SBackArrow>
                    <SSeasonName>{seasonInfo?.name}</SSeasonName>
                </SLeftColumn>
                {seasonGames?.[0]?.matchs.length > 1 && (
                    <SRightColumn>
                        <SGameCountInSeason onClick={isShowHandler}>
                            <SCount>{seasonGames?.[0]?.matchs.length}</SCount>
                            {isShow ? <SChevronTop /> : <SChevronBottom />}
                        </SGameCountInSeason>
                    </SRightColumn>
                )}
            </SInnerContainerFlexRow>
            {/* <SExpandLayout>{isShow && <Scroller seasonGames={seasonGames?.[0]?.matchs} />}</SExpandLayout> */}
            <SExpandLayout style={{ height: props.height, transform: props.transform }}>
                <Scroller seasonGames={seasonGames?.[0]?.matchs} isShow={isShow} />
            </SExpandLayout>
        </SMainContainer>
    )
}

const InplayScroller: React.FC<ComponentProps> = ({ seasonInfo, seasonGames }) => {
    return (
        <SMainInplayContainer>
            <Scroller allSeasons={seasonGames} isShow={true} />
        </SMainInplayContainer>
    )
}

const DetailGameScroller: React.FC<ComponentProps> = ({
    seasonInfo,
    seasonGames,
    convertedData,
    locationMatchStatus,
}) => {
    const { date } = useCustomParams()

    return (
        <>
            {date !== 'inplay' && (
                <RegularScroller
                    seasonInfo={seasonInfo}
                    seasonGames={seasonGames}
                    convertedData={convertedData}
                    locationMatchStatus={locationMatchStatus}
                />
            )}
            {date === 'inplay' && <InplayScroller seasonInfo={seasonInfo} seasonGames={seasonGames} />}
        </>
    )
}

export default DetailGameScroller
