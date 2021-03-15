import { useSelector } from '@redux'
import { nCr, totalCombination } from '@sport/util/betCalculate'

const useTotalStakeAndToWin = (): [number, number, number] => {
    const n = useSelector((store) => store.sportBet.list.length)
    const single = useSelector((store) => store.sportBet.stake.single)
    const parlay = useSelector((store) => store.sportBet.stake.parlay)

    let totalStake = 0
    let totalToWin = 0
    let betCount = 0

    for (const id in single) {
        if (Object.prototype.hasOwnProperty.call(single, id) && single[id].bet > 0) {
            totalStake += single[id].bet
            totalToWin += single[id].toWin
            betCount += 1
        }
    }

    for (const r in parlay) {
        if (Object.prototype.hasOwnProperty.call(parlay, r) && parlay[r].bet > 0) {
            const c = r === '0' ? totalCombination(n) : nCr(n, parseInt(r))

            totalStake += parlay[r].bet * c
            totalToWin += parlay[r].toWin
            betCount += c
        }
    }

    return [totalStake, totalToWin, betCount]
}

export default useTotalStakeAndToWin
