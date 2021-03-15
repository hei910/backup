import { useMemo } from 'react'
import useTabs from '@hooks/useTabs'
import { IGameTypeItem } from './'
import GameSuppliers from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

const brandWithNewDesign = ['vc3', 'vf6']

let gameTypes: string[]

if (brandWithNewDesign.includes(process.env.BRAND_CODE)) {
    gameTypes = [
        GameSuppliers.mg,
        GameSuppliers.dt,
        GameSuppliers.pt,
        GameSuppliers.pg,
        GameSuppliers.cq9,
        GameSuppliers.jdb,
    ]
} else {
    gameTypes = [
        GameSuppliers.hot,
        GameSuppliers.mg,
        GameSuppliers.dt,
        GameSuppliers.jdb,
        GameSuppliers.cq9,
        GameSuppliers.pt,
        GameSuppliers.pg,
    ]
}

const useGameType = () => {
    const t = useTranslation()
    const params = useTabs(gameTypes)
    const supplierMaintenance = useSupplierMaintenance()

    const gameTypeList: IGameTypeItem[] = useMemo(() => {
        return params.map((param) => {
            const isMaintenance = supplierMaintenance[param.param] && supplierMaintenance[param.param].isMaintenance
            return {
                supplier: param.param,
                to: param.to,
                title: t(`general.suppliers.slotmachine.${param.param}`),
                isMaintenance: isMaintenance,
                isActive: param.isActive,
                className: `${isMaintenance ? 'maintenance' : ''} ${param.isActive ? 'active' : ''}`,
            }
        })
    }, [params, supplierMaintenance, t])

    return gameTypeList
}

export default useGameType
