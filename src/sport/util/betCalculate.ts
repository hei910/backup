import { Stake } from '@services/sportBet/types'
import { Dictionary } from './dictionary'

// export const roundUp = (n: number) => Math.round(n * 100) / 100;
export const roundDown = (n: number) => Math.floor(n * 100) / 100

export const smartRoundDown = (value: string | number) => {
    const valueString = value.toString()
    const manyNineRegex = /\.\d{0,}9{3,}\d$/
    let correctedValue = value

    if (manyNineRegex.test(valueString)) {
        correctedValue = correctedValue.toString().replace(/(\d{0,}\.)(\d{0,}?)(9)(9{2,})(\d$)/, '$1$2$3')
        const [, decimal = ''] = correctedValue.split('.')
        correctedValue = parseFloat(correctedValue).toFixed(decimal.length - 1 >= 0 ? decimal.length - 1 : 0)
    }

    return correctedValue.toString()
}

const sumArray = (arr: Array<number>) => {
    return arr.reduce((a, b) => a + b)
}

export const sumTotal = (stake: Dictionary<Stake>, key: keyof Stake) => {
    const stakeArray = Object.values(stake).map((s) => s[key])
    const arr = stakeArray.length > 0 ? stakeArray : [0]
    return sumArray(arr)
}

export const sumParlayStakeTotal = (stake: Dictionary<Stake>, n: number) => {
    const stakeArray = Object.entries(stake).map(([key, value]) => {
        const r = parseInt(key)
        if (r > 0) {
            return value.bet * nCr(n, r)
        } else {
            return value.bet * totalCombination(n)
        }
    })

    const arr = stakeArray.length > 0 ? stakeArray : [0]
    return sumArray(arr)
}

export const calculateSingleToWin = (totalBet: number, odds: string, marketCode: string = '') => {
    if (Math.sign(parseFloat(odds)) === -1) {
        return totalBet
    }

    const n = totalBet * parseFloat(odds) - totalBet
    return n
}

// export const calculateSingleToWin = (totalBet: number, odds: string, marketCode: string = '', oddsType: OddsType) => {
//     if (Math.sign(parseFloat(odds)) === -1) {
//         return 1;
//     }

//     const withoutPrincipal = oddsType !== OddsType.EURO && /(ah)|(ou)|(oe)/.test(marketCode);
//     const n = totalBet * parseFloat(odds) - (withoutPrincipal ? 0 : totalBet);
//     return n;
// };

export const oddsToEuOdds = (odds: string, marketCode: string) => {
    const isWithoutPrincipal = /(ah)|(ou)|(oe)/.test(marketCode)
    return isWithoutPrincipal ? parseFloat(odds) + 1 : parseFloat(odds)
}

export const calculateParlayToWin = (totalBet: number, odds: number, maxPayout: number) => {
    let totalWin = totalBet * odds

    if (maxPayout && totalWin > maxPayout) {
        totalWin = maxPayout
    }

    return totalWin
}

const factorialArray = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800]

const factorial = (n: number): number => {
    if (factorialArray[n]) {
        return factorialArray[n]
    }

    let total = 1

    for (let i = 1; i <= n; i++) {
        total *= i

        if (!factorialArray[i]) {
            factorialArray[i] = total
        }
    }

    return total
}

export const nCr = (n: number, r: number): number => {
    return factorial(n) / (factorial(r) * factorial(n - r))
}

const oddsMultiplier = (oddsArray: number[], r: number, position: number): number => {
    let resultOdds = 0

    if (r > 0) {
        const n = oddsArray.length

        for (let i = position; i <= n - r; i++) {
            resultOdds += oddsArray[i] * oddsMultiplier(oddsArray, r - 1, i + 1)
        }
    } else {
        resultOdds = 1
    }

    return resultOdds
}

const parlayOdds = (oddsArray: number[], r: number) => {
    // Since Odds is ( Stake x (Odds - 1) = ToWin ),
    // we need to minus (1 x Combination) to remove the +1 adjustment in every combination
    return oddsMultiplier(oddsArray, r, 0) - nCr(oddsArray.length, r)
}

const combinationTotalArray: number[] = [1, 1, 1, 4, 11, 26, 57, 120, 247, 502, 1013]

export const totalCombination = (length: number): number => {
    if (combinationTotalArray[length]) {
        return combinationTotalArray[length]
    }

    let combinationTotal = 0

    for (let i = 1; i <= length; i++) {
        const combination = nCr(length, i)
        combinationTotal += combination
    }

    combinationTotalArray[length] = combinationTotal

    return combinationTotal
}

export const folds = (oddsArray: number[] = []) => {
    const length = oddsArray.length
    const list = []
    let oddsTotal = 0

    if (length <= 1) {
        return []
    }

    for (let i = 2; i <= length; i++) {
        const odds = parlayOdds(oddsArray, i)

        oddsTotal += odds

        list[i] = odds
    }

    list[0] = oddsTotal

    return list
}

export const foldsArrayToOddsArray = (foldsArray: string[] = []): number[] => {
    return foldsArray.map((element) => parseFloat(element) + 1)
}
