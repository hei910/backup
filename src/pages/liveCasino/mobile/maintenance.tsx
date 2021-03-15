import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import GameSuppliers from '@constants/gameSuppliers'
import maintenanceIcon from '@brand/assets/images/liveCasino/mobile/maintenance.svg'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'
import bgImg from '@styles/mixins/backgroundImg'

interface IProps {
    supplier: GameSuppliers
}

const SContainer = styled.div`
    width: 80%;
    height: 100%;
    margin: auto;
    padding: 2.5em 0 1.5em 0;
    position: relative;
`

const SMaintenanceIcon = styled.div`
    width: 4em;
    height: 4em;
    margin: 0 auto 0.25em;
    ${bgImg(maintenanceIcon, 'cover')}
`

const SMaintainingText = styled.div`
    width: auto;
    margin: 0 auto;
    ${(props) => props.theme.typography.Body1}
    text-align: center;
    color: #fff;
`

const SMaintainingDescription = styled.div`
    margin: 1.25em 0 0 0;
    padding: 1.5em 1.25em;
    font-size: 0.5em;
    color: #000;
    background: hsla(0, 0%, 100%, 0.8);
    border-radius: 1.25em;
`

export default ({ supplier }: IProps) => {
    const t = useTranslation()
    const supplierMaintenance = useSupplierMaintenance()
    const isMaintenance = supplierMaintenance[supplier]?.isMaintenance
    const notice = isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].notice

    return isMaintenance ? (
        <SContainer>
            <SMaintenanceIcon />
            <SMaintainingText>{t('general.maintaining')}</SMaintainingText>
            <SMaintainingDescription>{notice}</SMaintainingDescription>
        </SContainer>
    ) : null
}
