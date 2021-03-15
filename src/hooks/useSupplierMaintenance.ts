import { useContext } from 'react'
import { SupplierMaintenanceContext } from '../app/maintenanceProvider'

const useSupplierMaintenance = () => useContext(SupplierMaintenanceContext)

export default useSupplierMaintenance
