import styled from 'styled-components/macro'
import { ISectionCardProps } from './types'

import { ratioHeightForMobile, ratioWidthForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import maintenanceLabel from '@brand/assets/images/home/mobile/maintenance-label.png'

const SSectionCard = styled(AutoWrapItem)`
    position: relative;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    flex: 1 1 calc(99 / 375 * 100vw);
    border-radius: 10px;
    margin: 12px 0 0 15px;

    :first-child {
        margin-left: 0;
    }

    :nth-child(3n + 1) {
        margin-left: 0;
    }
`

const SectionCardImg = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain', 'no-repeat', 'center center')}
    ${ratioHeightForMobile(100)}
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`

const SectionCardTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle4}
    ${ratioHeightForMobile(30)}
    color: #333333;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const MaintenanceLabel = styled.div`
    ${bgImg(maintenanceLabel, 'contain')}
    ${ratioHeightForMobile(20)}
    ${ratioWidthForMobile(45)}
    position: absolute;
    top: 0;
    left: 0;
`

const SectionCard: React.FC<ISectionCardProps> = ({ className, img, title, onClick, maintenanceImg, isMaintenance, id }) => {
    return (
        <SSectionCard onClick={onClick} className={className} data-qa={id}>
            <SectionCardImg bg={isMaintenance ? maintenanceImg : img} />
            <SectionCardTitle>{title}</SectionCardTitle>
            {isMaintenance && <MaintenanceLabel />}
        </SSectionCard>
    )
}

export default SectionCard
