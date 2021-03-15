import styled from 'styled-components/macro'
import GameSuppliers from '@constants/gameSuppliers'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'
import useTranslation from '@hooks/useTranslation'
import bgImg from '@styles/mixins/backgroundImg'
import spanaImg from '@brand/assets/images/boardGame/mobile/spana.png'

const isMobile = process.env.APP_PLATFORM === 'mobile'

interface IProps {
    supplier: GameSuppliers
}

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
`

const SMaintainingLeft = styled.div`
    padding: 0.5em;
    background: #ffc200;
    opacity: 0.85;
    border-top-left-radius: 0.75em;
    border-bottom-left-radius: 0.75em;
    font-size: ${isMobile ? '0.75em' : '1.75em'};
    text-align: center;
    color: #333333;
    flex: 1 1 20%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SMaintainingIcon = styled.div`
    ${bgImg(spanaImg, 'contain', 'no-repeat', '50% 50%')}
    padding: 25%;
    margin: 0.25em;
`

const SMaintainingDescription = styled.div`
    padding: 1em;
    background: #fff;
    border-top-right-radius: 0.75em;
    border-bottom-right-radius: 0.75em;
    font-size: ${isMobile ? '0.65em' : '2em'};
    overflow: auto;
    text-overflow: ellipsis;
    color: #1a1a1a;
    flex: 1 1 75%;
`

export default ({ supplier }: IProps) => {
    const t = useTranslation()
    const supplierMaintenance = useSupplierMaintenance()
    const isMaintenance = supplierMaintenance[supplier]?.isMaintenance
    const notice = isMaintenance && supplierMaintenance[supplier] && supplierMaintenance[supplier].notice

    return isMaintenance ? (
        <SContainer>
            <SMaintainingLeft>
                <SMaintainingIcon data-qa={'imgKyMaintenanceIcon'} />
                {t('general.maintaining')}
            </SMaintainingLeft>
            <SMaintainingDescription data-qa={'txtKyMaintenanceMsg'}>{notice}</SMaintainingDescription>
        </SContainer>
    ) : null
}
