import { useState, useCallback } from 'react'
import GameSuppliers from '@constants/gameSuppliers'
import useCopyRight from '@hooks/useCopyRight'
import useThirdPartyGame from '@hooks/useThirdPartyGame'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

export default () => {
    const [supplier, setSupplier] = useState(GameSuppliers.ky)
    const supplierMaintenance = useSupplierMaintenance()
    const { startEnterGameFlow, startEnterTrialGameFlow } = useThirdPartyGame(supplier)
    const copyRight = useCopyRight()

    const onEnterClick = useCallback(
        (newSupplier: GameSuppliers) => {
            setSupplier(newSupplier)
            startEnterGameFlow()
        },
        [startEnterGameFlow],
    )

    const onTrialEnterClick = useCallback(
        (newSupplier: GameSuppliers) => {
            setSupplier(newSupplier)
            startEnterTrialGameFlow()
        },
        [startEnterTrialGameFlow],
    )

    return {
        setSupplier,
        onEnterClick,
        onTrialEnterClick,
        supplier,
        supplierMaintenance,
        copyRight,
    }
}
