import { transferAllToSportWallet, transferToThirdPartyWallet } from '@services/transfer/api'
import GameSuppliers, { SeparatedWalletSuppliers } from '@constants/gameSuppliers'
import { useCallback, useState } from 'react'
import { useDispatch } from '@redux'
import { setIsTransferFailModalOpened, setIsTransferSuccessModalOpened } from '@services/modal/action'

export default (refetchBalances: () => void) => {
    const [isConfirmTransferOpened, setIsConfirmTransferOpened] = useState(false)
    const [isPartialFailModalOpened, setIsPartialFailModalOpened] = useState(false)
    const [failSuppliers, setFailSuppliers] = useState<SeparatedWalletSuppliers[]>([])
    const [selectedSupplier, setSelectedSupplier] = useState<SeparatedWalletSuppliers>(GameSuppliers.sport)
    const dispatch = useDispatch()

    const onWalletCardClick = useCallback(async (supplier: SeparatedWalletSuppliers) => {
        setSelectedSupplier(supplier)
        setIsConfirmTransferOpened(true)
    }, [])

    const onConfirmClick = useCallback(async () => {
        setIsConfirmTransferOpened(false)

        try {
            if (selectedSupplier === GameSuppliers.sport) {
                const failSuppliers = await transferAllToSportWallet()

                // partial success handling
                if (failSuppliers.length > 0) {
                    setIsPartialFailModalOpened(true)
                    setFailSuppliers(failSuppliers)
                } else {
                    dispatch(setIsTransferSuccessModalOpened(true))
                }
            } else {
                await transferToThirdPartyWallet(selectedSupplier as GameSuppliers)
                dispatch(setIsTransferSuccessModalOpened(true))
            }

            refetchBalances()
        } catch {
            dispatch(setIsTransferFailModalOpened(true))
        }
    }, [dispatch, selectedSupplier, refetchBalances])

    const closeConfirmModal = useCallback(() => {
        setIsConfirmTransferOpened(false)
    }, [])

    const closePartialFailModal = useCallback(() => {
        setIsPartialFailModalOpened(false)
    }, [])

    return {
        onWalletCardClick,
        onConfirmClick,
        isConfirmTransferOpened,
        selectedSupplier,
        closeConfirmModal,
        isPartialFailModalOpened,
        closePartialFailModal,
        failSuppliers,
    }
}
