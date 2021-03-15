import React from 'react'
import styled from 'styled-components/macro'

import red from '@brand/assets/images/home/red.png'
import blue from '@brand/assets/images/home/blue.png'

import DummyTeamIcon from '@brand/assets/images/home/dummy-team.png'
import { IPopularData } from '@type'

const SHomeTeamBackgroundImage = styled.img`
    position: absolute;
    top: 0;
    right: 50%;
    bottom: 0px;
    left: 0;
    height: 100%;
    object-fit: cover;
`

const SAwayTeamBackgroundImage = styled.img`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0px;
    height: 100%;
    object-fit: cover;
`

const STeamLayout = styled.div`
    display: flex;
    padding: 10px;
    position: relative;
    min-height: 100px;
`

const STeamIconLayout = styled.div<{ team: 'home' | 'away' }>`
    width: 12%;
    display: flex;
    justify-content: ${(props) => (props.team === 'home' ? 'flex-end' : 'flex-start')};
    align-items: center;
    z-index: 3;
`

const STeamTitleLayout = styled.div`
    width: 76%;
    z-index: 3;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    color: #fff;
    font-size: 18px;
`

const STeamInfoLayout = styled.div<{ team: 'home' | 'away' }>`
    width: 42%;
    text-align: ${(props) => (props.team === 'home' ? 'right' : 'left')};
    word-break: break-all;
`

const SVSTextLayout = styled.div`
    width: 16%;
    text-align: center;
`

const SHomeTeamIcon = styled.img`
    width: 70px;
    height: 70px;
`

const SLeagueHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`

const STeamVSLayout = styled.div`
    display: flex;
    margin-top: 20px;
`

const PopularBanner = ({ data }: { data?: IPopularData }) => {
    return (
        <STeamLayout>
            <SHomeTeamBackgroundImage src={red} />
            <SAwayTeamBackgroundImage src={blue} />
            <STeamIconLayout team={'home'}>{data && <SHomeTeamIcon src={DummyTeamIcon} />}</STeamIconLayout>
            <STeamTitleLayout>
                <SLeagueHeader>{data ? data.seasonInfo.name : 'Loading'}</SLeagueHeader>
                {data && (
                    <STeamVSLayout>
                        <STeamInfoLayout team={'home'}>{data.events.competitors.home.name}</STeamInfoLayout>
                        <SVSTextLayout>VS</SVSTextLayout>
                        <STeamInfoLayout team={'away'}>{data.events.competitors.away.name}</STeamInfoLayout>
                    </STeamVSLayout>
                )}
            </STeamTitleLayout>
            <STeamIconLayout team={'away'}>{data && <SHomeTeamIcon src={DummyTeamIcon} />}</STeamIconLayout>
        </STeamLayout>
    )
}

export default PopularBanner
