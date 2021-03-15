import { useCallback } from 'react'
import { useDispatch } from '@redux'
import { enableAppScrollAction, disableAppScrollAction } from '@services/app/action'

export default (id: string) => {
    const dispatch = useDispatch()

    const disableScrolling = useCallback(() => {
        dispatch(disableAppScrollAction(id))
    }, [dispatch, id])

    const enableScrolling = useCallback(() => {
        dispatch(enableAppScrollAction(id))
    }, [dispatch, id])

    return {
        disableScrolling,
        enableScrolling,
    }
}
