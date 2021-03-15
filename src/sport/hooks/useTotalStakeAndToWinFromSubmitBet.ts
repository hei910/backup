import { useSelector } from '@redux'

const useTotalStakeAndToWinFromSubmitBet = (): [number, number, number] => {
    const single = useSelector((store) => store.sportBet.submitBetResult?.single)
    const parlay = useSelector((store) => store.sportBet.submitBetResult?.parlay)

    let totalStake = 0
    let totalToWin = 0
    let betCount = 0

    if (!single && !parlay) {
        return [0, 0, 0]
    }

    for (const singleBet in single) {
        if (Object.prototype.hasOwnProperty.call(single, singleBet)) {
            if (single[singleBet]?.unitAnte && single[singleBet]?.estimatedWinnings) {
                totalStake += single[singleBet].unitAnte || 0
                totalToWin += single[singleBet].estimatedWinnings || 0
                betCount += 1
            }
        }
    }

    for (const parlayBet in parlay) {
        if (Object.prototype.hasOwnProperty.call(parlay, parlayBet)) {
            if (parlay[parlayBet]?.unitAnte && parlay[parlayBet]?.estimatedWinnings) {
                totalStake += parlay[parlayBet].unitAnte * parlay[parlayBet].c
                totalToWin += parlay[parlayBet].estimatedWinnings
                betCount += parlay[parlayBet].c
            }
        }
    }

    return [totalStake, totalToWin, betCount]
}

export default useTotalStakeAndToWinFromSubmitBet
