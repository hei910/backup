import { useEffect } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
import { getRulesLimits } from '@services/sportRules/actions'
import { PlayerBetLimitsResponseData } from '@services/sportRules/types'

const useRulesLimits: () => PlayerBetLimitsResponseData = () => {
    const dispatch = useDispatch()
    const rulesLimits = useSelector((store) => store.sportRules)
    // const isLogin = useSelector((state) => state.user.isLoggedIn)

    useEffect(() => {
        // if (isLogin) {
        dispatch(getRulesLimits())
        // }
    }, [dispatch])

    return rulesLimits
}

export default useRulesLimits
