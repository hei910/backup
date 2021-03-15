import { useEffect } from 'react'
import { useSelector } from '@redux'
import { useDispatch } from '@sport/stores'
// import { useDispatch } from 'react-redux'
import { getPlayer } from '@services/sportPlayer/actions'
import { PlayerState } from '@services/sportPlayer/types'
import { RootState } from '@redux'

const usePlayer: () => PlayerState = () => {
    const dispatch = useDispatch()
    const player = useSelector((state: RootState) => state.sportPlayer)
    const { id = -1 } = player

    useEffect(() => {
        if (id === -1) {
            dispatch(getPlayer())
        }
    }, [dispatch, id])

    return player
}

export default usePlayer
