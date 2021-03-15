import styled from 'styled-components/macro'
import GameSuppliers from '@constants/gameSuppliers'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

import maintainingIcon from '@brand/assets/images/boardGame/mobile/icon-maintenance.png'

import bgImg from '@styles/mixins/backgroundImg'

interface IProps {
    supplier: GameSuppliers
}

const SContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    position: relative;
    display: flex;
    font-size: 0.6em;
    border-radius: 0.5em;
    overflow: hidden;
`

const SMaintainingDescription = styled.div`
    flex-grow: 1;
    padding: 0.5em 0.5em;
    line-height: 1.38;
    background: #ffffff;
    color: #1a1a1a;
`

const MainIconWrapper = styled.div`
    min-width: 5.5em;
    background-color: #ffc200;
    text-align: center;
`

const MainIcon = styled.div`
    margin: 0.6em auto 0.2em;
    width: 2.5em;
    height: 2.5em;
    ${bgImg(maintainingIcon, 'auto 100%')}
`

export default ({ supplier }: IProps) => {
    const supplierMaintenance = useSupplierMaintenance()
    const notice = supplierMaintenance[supplier] && supplierMaintenance[supplier].notice

    return (
        <SContainer>
            <MainIconWrapper>
                <MainIcon />
                <div>维护中</div>
            </MainIconWrapper>
            <SMaintainingDescription data-qa={'txtKyMaintenanceMsg'}>{notice}</SMaintainingDescription>
        </SContainer>
    )
}
