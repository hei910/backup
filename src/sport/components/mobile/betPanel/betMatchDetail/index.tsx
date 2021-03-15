import { ConvertedMatches, ConvertedSeason } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import styled from 'styled-components/macro'
import BaseballDetail from './baseball'
import BasketballDetail from './basketball'
import DetailBanner from './detailBanner'
import FootballDetail from './football'
import TennisDetail from './tennis'

interface ComponentProps {
    // fixtureId?: string;
    convertedData: ConvertedSeason[]
    seasonGames: ConvertedSeason[]
    locationMatchStatus?: string
}
const SMainContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
`
const STopContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const MBetMatchDetail: React.FC<ComponentProps> = ({ convertedData, seasonGames, locationMatchStatus }) => {
    const { sports, fixtureId } = useCustomParams()
    // if (convertedData === undefined) {
    //     return null;
    // }

    const currentSeason = () => {
        const currentSeason: ConvertedSeason[] = []
        if (convertedData !== undefined) {
            convertedData.forEach((season: ConvertedSeason) =>
                season.matchs.forEach((match: ConvertedMatches) => {
                    if (match.info.matchId.toString() === fixtureId) {
                        currentSeason.push(season)
                    }
                }),
            )
            return currentSeason?.[0]
            // return convertedData?.[0]
        }
    }

    const currentMatch = () => {
        const currentMatch: ConvertedMatches[] = []
        currentSeason()?.matchs.forEach((match: ConvertedMatches) => {
            if (match?.info?.matchId.toString() === fixtureId) {
                currentMatch.push(match)
            }
        })
        return currentMatch?.[0]
        // return convertedData[0].matchs[0]
    }
    // console.log(fixtureId)
    // console.log(currentSeason())
    // console.log(currentMatch())
    const defaultSeasonInfo = {
        zh: '',
        en: '',
        name: '',
        seasonId: '',
        firstStart: '',
    }
    const seasonInfo = currentSeason()?.info ?? defaultSeasonInfo

    const sportsSwitcher = () => {
        switch (sports) {
            case 'football':
                return <FootballDetail convertedData={currentMatch()} fixtureId={fixtureId} />
            case 'basketball':
                return <BasketballDetail convertedData={currentMatch()} fixtureId={fixtureId} />
            case 'tennis':
                return <TennisDetail convertedData={currentMatch()} fixtureId={fixtureId} />
            case 'baseball':
                return <BaseballDetail convertedData={currentMatch()} fixtureId={fixtureId} />
            default:
                return <FootballDetail convertedData={currentMatch()} fixtureId={fixtureId} />
        }
    }

    // console.log(currentMatch());
    // console.log(currentSeason());
    return (
        <>
            {convertedData !== undefined && currentMatch() !== undefined && (
                <SMainContainer>
                    <STopContainer>
                        <DetailBanner
                            convertedData={currentMatch()}
                            seasonInfo={seasonInfo}
                            fixtureId={fixtureId}
                            seasonGames={seasonGames}
                            locationMatchStatus={locationMatchStatus}
                        />
                    </STopContainer>
                    {sportsSwitcher()}
                </SMainContainer>
            )}
        </>
    )
}

export default MBetMatchDetail
