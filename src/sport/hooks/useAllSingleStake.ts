import { useSelector } from '@redux'
import { calculateSingleToWin } from '@sport/util/betCalculate'

const useAllSingleStake = (): [number, number] => {
    const list = useSelector((store) => store.sportBet.list)
    const single = useSelector((store) => store.sportBet.stake.single)
    const data = useSelector((store) => store.sportBet.data)

    let firstStake = -1
    let isSameStake = true
    let allToWin = 0

    for (const id of list) {
        if (Object.prototype.hasOwnProperty.call(single, id)) {
            if (firstStake === -1) {
                firstStake = single?.[id]?.bet
            }

            allToWin += calculateSingleToWin(firstStake, data[id].euOdds)

            if (firstStake !== single?.[id]?.bet) {
                isSameStake = false
                break
            }
        } else {
            isSameStake = false
            break
        }
    }

    if (!isSameStake) {
        return [0, 0]
    }

    return [firstStake, allToWin]
}

export default useAllSingleStake
