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
    width: 100%;
    min-height: 32%;
    height: 32%;
    margin: 35% auto 0 auto;
    padding: 0.3125em 1.5625em;
    position: relative;
    display: flex;
    justify-content: stretch;
    align-items: center;
    background: #4a3c7d;
    color: #fff;
    opacity: 0.8;
`

const SMaintainingText = styled.div`
    margin: 0 1.25em 0 0;
    flex: 0.25;
    ${(props) => props.theme.typography.Body6}
    text-align: center;

    :before {
        content: '';
        display: block;
        width: 2em;
        height: 2em;
        margin: 0 auto 0.25em;
        ${bgImg(maintenanceIcon, 'cover')}
    }
`

const SMaintainingDescription = styled.span`
    flex: 1 1 auto;
    display: block;
    ${(props) => props.theme.typography.Body6}
`

export default ({ supplier }: IProps) => {
    const t = useTranslation()
    const supplierMaintenance = useSupplierMaintenance()
    const isMaintenance = supplierMaintenance[supplier]?.isMaintenance
    const notice = isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].notice

    return isMaintenance ? (
        <SContainer>
            <SMaintainingText>{t('liveCasino.maintaining')}</SMaintainingText>
            <SMaintainingDescription>{notice}</SMaintainingDescription>
        </SContainer>
    ) : null
}
