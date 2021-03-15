import { useSelector } from '@redux'
import { nCr, totalCombination } from '@sport/util/betCalculate'

const useTotalCountOfBet = (): number => {
    const n = useSelector((store) => store.sportBet.list.length)
    const single = useSelector((store) => store.sportBet.stake.single)
    const parlay = useSelector((store) => store.sportBet.stake.parlay)

    let total = 0

    for (const id in single) {
        if (Object.prototype.hasOwnProperty.call(single, id) && single[id].bet > 0) {
            total += 1
        }
    }

    for (const r in parlay) {
        if (Object.prototype.hasOwnProperty.call(parlay, r)) {
            const c = r === '0' ? totalCombination(n) : nCr(n, parseInt(r))

            total += c
        }
    }

    return total
}

export default useTotalCountOfBet
