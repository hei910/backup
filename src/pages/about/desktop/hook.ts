import { useEffect } from 'react'
import { useSelector, useDispatch } from '@redux'
import { fetchDepositMinAmountAction } from '@services/setting/action'

export const useDepositHelpInit = () => {
    const depositMinAmount = useSelector((state) => state.setting.depositMinAmount)
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDepositMinAmountAction())
    }, [dispatch])

    return {
        depositMinAmount,
        brandName,
    }
}
