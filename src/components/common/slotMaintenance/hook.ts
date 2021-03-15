import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { useParams } from 'react-router-dom'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

const useSlotMaintenance = () => {
    const { supplier = '' } = useParams<{ supplier?: string }>()
    const t = useTranslation()
    const supplierMaintenance = useSupplierMaintenance()
    const isMaintenance = supplierMaintenance[supplier]?.isMaintenance
    const notice = isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].notice
    const time = (isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].time) || ''
    const { complaintPhone, csPhone, webEmail: email, brandName } = useSelector((state) => state.app.brandInfo)
    const title = `${t(`slotmachine.title`, { type: supplier?.toUpperCase() })},`

    return {
        supplierMaintenance,
        isMaintenance,
        brandName,
        notice,
        time,
        csPhone,
        complaintPhone,
        email,
        supplier,
        title,
    }
}

export default useSlotMaintenance
