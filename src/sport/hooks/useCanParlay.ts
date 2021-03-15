import { useSelector } from '@redux'

const useCanParlay = () => {
    const list = useSelector((store) => store.sportBet.list)
    const singleMatch = useSelector((store) => store.sportBet.list.length <= 1)
    const sameMatch = useSelector((store) => store.sportBet.sameMatchList.length > 0)
    const sameSeason = useSelector((store) => store.sportBet.orSameSeasonList.length > 0)
    const isNotParlay = useSelector((store) => {
        const data = store.sportBet.data

        for (const id of list) {
            if (!data[id]?.hasParlay) {
                return true
            }
        }

        return false
    })
    const mixedOr = useSelector((store) => {
        const data = store.sportBet.data
        let firstIsOr: boolean | undefined

        for (const id of list) {
            if (typeof firstIsOr === 'undefined') {
                firstIsOr = data[id]?.isOr
            } else {
                if (data[id]?.isOr !== firstIsOr) {
                    return true
                }
            }
        }

        return false
    })

    const canParlay = !singleMatch && !sameMatch && !sameSeason && !isNotParlay && !mixedOr

    return [canParlay, singleMatch, sameMatch, sameSeason, isNotParlay, mixedOr]
}

export default useCanParlay
