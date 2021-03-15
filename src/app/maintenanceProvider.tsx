import React, { createContext } from 'react'
import { MaintenanceGames } from '@services/app/types'
import GameContainerModes from '@constants/gameContainerMode'

interface SupplierMaintenanceItem {
    isMaintenance: boolean
    notice: string
    enterGameMethod: GameContainerModes
    time: string
}

type ISupplierMaintenanceContext = Record<string, SupplierMaintenanceItem>

interface IProps {
    supplierMaintenance: MaintenanceGames[]
    maintenanceTime: string
}

export const SupplierMaintenanceContext = createContext<ISupplierMaintenanceContext>({})

const SupplierMaintenanceProvider: React.FC<IProps> = ({ supplierMaintenance, maintenanceTime, children }) => {
    let data: ISupplierMaintenanceContext = {}
    supplierMaintenance.forEach(({ name, isMaintenance, notice, enterGameMethod }) => {
        data[name] = {
            isMaintenance,
            notice,
            enterGameMethod,
            time: maintenanceTime,
        }
    })

    return <SupplierMaintenanceContext.Provider value={data}>{children}</SupplierMaintenanceContext.Provider>
}

export default SupplierMaintenanceProvider
