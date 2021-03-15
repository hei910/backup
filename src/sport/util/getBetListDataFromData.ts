import { serializedIDToCombinedID } from '@services/sportData/actions'
import { MatchesResponseData } from '@services/sportData/types'

interface IDsHash {
    [key: string]: {
        [key: string]: {
            [key: string]: string[]
        }
    }
}

const getBetListDataFromData = (serializedCombinedIDs: string[], merge?: MatchesResponseData) => {
    const idsHash: IDsHash = {}

    for (const serializedCombinedID of serializedCombinedIDs) {
        const { fixtureId = '', ctId = '', marketId = '', outcomeUId = '' } = serializedIDToCombinedID(
            serializedCombinedID,
        )

        if (!idsHash[fixtureId]) {
            idsHash[fixtureId] = {}
        }

        if (!idsHash[fixtureId][ctId]) {
            idsHash[fixtureId][ctId] = {}
        }

        if (!idsHash[fixtureId][ctId][marketId]) {
            idsHash[fixtureId][ctId][marketId] = []
        }

        idsHash[fixtureId][ctId][marketId].push(outcomeUId)
    }

    if (!merge) {
        return {}
    }

    const { iot = {}, not = {} } = merge
    const seasons = { ...iot, ...not }

    Object.values(seasons).forEach((season) => {
        Object.values(season.match).forEach((match) => {
            for (const event in match.events) {
                if (match.events[event].fixtureId !== 'fixtureId') {
                    continue
                }
            }
        })
    })

    return {}
}

export default getBetListDataFromData
