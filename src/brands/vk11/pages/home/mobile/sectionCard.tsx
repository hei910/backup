import styled from 'styled-components/macro'

import { ratioHeightForMobile, ratioWidthForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'
import maintenanceLabel from '@brand/assets/images/home/mobile/maintenance-label.png'
import { ISectionCardProps } from './types'
import { AutoWrapItem } from '@components/common/autoWrapContainer'

const SSectionCard = styled(AutoWrapItem)`
    position: relative;
    box-shadow: 2px 2px 6px 0 rgba(255, 132, 12, 0.09);
    flex: 1 1 calc(129 / 375 * 100vw);
    background-color: #ffffff;
    border-radius: 10px;

    /* :nth-child(3n + 1) {
        margin-left: 0;
    }

    :first-child {
        margin-left: 0;
    } */
`

const SectionCardImg = styled.div<{ bg: string; hvTitle: boolean }>`
    ${(props) => bgImg(props.bg, 'contain', 'no-repeat', 'center top')}
    ${(props) => ratioHeightForMobile(props.hvTitle ? 89 : 109)};
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    ${(props) => !props.hvTitle && `border-radius: 10px;`}
`

const SectionCardTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #626d8e;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MaintenanceWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: absolute;
    top: 30%;
    background: #626d8e;
    opacity: 0.8;
`

const MaintenanceLabel = styled.div`
    ${bgImg(maintenanceLabel, 'contain')}
    ${ratioHeightForMobile(20)}
    ${ratioWidthForMobile(45)}
`

const MaintenanceText = styled.div`
    color: white;
`

const Maintenance = () => {
    return (
        <MaintenanceWrapper data-qa={'imgMaintenanceLabel'}>
            <MaintenanceLabel />
            <MaintenanceText>维护中</MaintenanceText>
        </MaintenanceWrapper>
    )
}

const SectionCards: React.FC<ISectionCardProps> = ({ wrapperAutomationId, img, isMaintenance, imgAutomationId, title, onClick, children }) => {
    return (
        <SSectionCard onClick={onClick} data-qa={`btn${wrapperAutomationId === 'sport' ? 'Sport' : wrapperAutomationId}`}>
            <SectionCardImg data-qa={imgAutomationId} bg={img} hvTitle={!!title} />
            {title && <SectionCardTitle>{title}</SectionCardTitle>}
            {isMaintenance && <Maintenance />}
            {children}
        </SSectionCard>
    )
}

export default SectionCards
