import styled from 'styled-components/macro'
import GameSuppliers from '@constants/gameSuppliers'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

const isMobile = process.env.APP_PLATFORM === 'mobile'

interface IProps {
    supplier: GameSuppliers
}

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
`

const SMaintainingDescription = styled.div`
    margin: 0 auto;
    padding: 1em 1.25em;
    background: #fff;
    opacity: 0.8;
    border-radius: 1.25em;
    font-size: ${isMobile ? '0.75em' : '1.25em'};
    color: #646464;
`

export default ({ supplier }: IProps) => {
    const supplierMaintenance = useSupplierMaintenance()
    const isMaintenance = supplierMaintenance[supplier]?.isMaintenance
    const notice = isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].notice

    return isMaintenance ? (
        <SContainer>
            <SMaintainingDescription data-qa={'txtKyMaintenanceMsg'}>{notice}</SMaintainingDescription>
        </SContainer>
    ) : null
}
