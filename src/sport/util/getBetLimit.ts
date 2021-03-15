import { PlayerBetLimitsTableElement } from '@services/sportRules/types'
import stores from '@redux'

const defaultLimits: PlayerBetLimitsTableElement = {
    // minOdds: 0,
    minAnte: 10,
    // singleMatchLimit: 500000,
    singleAnteLimit: 100000,
    maxPayout: 0,
}

export const getSingleBetLimit = (
    sportRule: any,
    matchStatus: string,
    sportType: string,
    marketCode: string,
    type = 'singleBetLimit',
): number => {
    const date = matchStatus === 'Live' ? 'isLive' : 'nonLive'

    let limit = sportRule?.[`${sportType}Limit`]?.[date]?.[marketCode]?.[type] || 0

    if (type === 'singleBetLimit') {
        if (!limit) {
            limit = defaultLimits.singleAnteLimit
        }
    }

    if (type === 'minBetAmount') {
        if (!limit) {
            limit = defaultLimits.minAnte
        }
    }

    return limit
}

// export const getParlayBetLimitItem = (
//     sportRule: PlayerBetLimitsResponseData,
//     matchStatus: string,
//     sportType: string,
//     marketCode: string,
//     type = 'singleBetLimit',
// ): number => {
//     return sportRule?.[`${sportType}Limit`]?.[date]?.[marketCode]?.[type] || 0
// }

export const getBetLimits = (serializedCombinedId: string) => {
    const store = stores.getState()
    const { status, sportType, marketCode } = store.sportBet.data[serializedCombinedId]

    const singleBetLimit = getSingleBetLimit(store.sportRules, status, sportType?.toLowerCase(), marketCode)

    if (singleBetLimit) {
        return {
            singleAnteLimit: getSingleBetLimit(store.sportRules, status, sportType?.toLowerCase(), marketCode),
            minAnte: getSingleBetLimit(store.sportRules, status, sportType?.toLowerCase(), marketCode, 'minBetAmount'),
            maxPayout: getSingleBetLimit(store.sportRules, status, sportType?.toLowerCase(), marketCode, 'maxPayout'),
        }
    } else {
        return defaultLimits
    }
}

export const getParlayBetLimits = () => {
    const store = stores.getState()

    if (!store.sportRules.parlayLimit) {
        return defaultLimits
    }

    return {
        singleAnteLimit: store.sportRules.parlayLimit?.singleBetLimit,
        minAnte: store.sportRules.parlayLimit?.minBetAmount,
        maxPayout: store.sportRules.parlayLimit?.maxPayout,
    }
}
