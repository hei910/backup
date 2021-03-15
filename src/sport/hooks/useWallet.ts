import { useEffect } from 'react'
import { useDispatch } from '@sport/stores'
import { RootState, useSelector } from '@redux'
import { getWallet } from '@services/sportPlayer/actions'
import { PlayerState } from '@services/sportPlayer/types'

const useWallet: () => PlayerState = () => {
    const dispatch = useDispatch()
    const player = useSelector((state: RootState) => state.sportPlayer)

    useEffect(() => {
        dispatch(getWallet())
    }, [dispatch])

    return player
}

export default useWallet
