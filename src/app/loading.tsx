import { useEffect } from 'react'
import { useDispatch, useSelector } from '@redux'
import Loading from '@components/common/loading'
import { enableAppScrollAction, disableAppScrollAction } from '@services/app/action'
import { showV1Loading, hideV1Loading } from '@utils/v1Functions'

export default () => {
    const loadingList = useSelector((state) => state.app.loadingList)
    const dispatch = useDispatch()

    useEffect(() => {
        if (loadingList.length === 0) {
            hideV1Loading()
            dispatch(enableAppScrollAction('app_loading'))
        } else {
            dispatch(disableAppScrollAction('app_loading'))
            showV1Loading()
        }
    }, [loadingList, dispatch])

    return loadingList.length === 0 ? null : <Loading />
}
