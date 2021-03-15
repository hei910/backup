import { useEffect } from 'react'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { getSettingV2 } from '@services/sportSetting/actions'
import { SettingState } from '@services/sportSetting/types'

const useSettingV2: () => SettingState = () => {
    const dispatch = useDispatch()
    const setting = useSelector((state) => state.sportSetting)

    useEffect(() => {
        dispatch(getSettingV2())
    }, [dispatch])

    return setting
}

export default useSettingV2
