import stores from '@redux'
import { isEmptyObject } from './general'
import { getBetLimits, getParlayBetLimits } from './getBetLimit'

interface CheckStakeBetLimitsResponse {
    valid: boolean
    min?: number
    max?: number
}

const checkStakeBetLimits = (): CheckStakeBetLimitsResponse => {
    const {
        sportBet: {
            stake: { single: stakeSingle, parlay: stakeParlay },
        },
    } = stores.getState()

    let result = { valid: true, min: 0, max: 0 }

    if (!isEmptyObject(stakeSingle)) {
        for (const id in stakeSingle) {
            if (Object.prototype.hasOwnProperty.call(stakeSingle, id)) {
                const { bet } = stakeSingle[id]
                const { minAnte, singleAnteLimit } = getBetLimits(id)

                if (bet < minAnte || bet > singleAnteLimit) {
                    result = { valid: false, min: minAnte, max: singleAnteLimit }
                }
            }
        }
    }

    if (!isEmptyObject(stakeParlay)) {
        for (const r in stakeParlay) {
            if (Object.prototype.hasOwnProperty.call(stakeParlay, r)) {
                const { bet } = stakeParlay[r]
                const { minAnte, singleAnteLimit } = getParlayBetLimits()

                if (bet < minAnte || bet > singleAnteLimit) {
                    result = { valid: false, min: minAnte, max: singleAnteLimit }
                }
            }
        }
    }

    return result
}

export default checkStakeBetLimits
