import styled from 'styled-components/macro'
import { ISectionCardProps } from './types'
import { ratioHeightForMobile, ratioWidthForMobile } from '@mixins/ratioLength'
import bgImg from '@mixins/backgroundImg'
import { AutoWrapItem } from '@components/common/autoWrapContainer'
import maintenanceLabel from '@brand/assets/images/home/mobile/maintenance-label.png'

const SectionCard = styled(AutoWrapItem)`
    position: relative;
    box-shadow: 0 4px 12px 0 rgba(23, 29, 41, 0.08);
    background-color: #ffffff;
    flex: 1 1 calc(105 / 375 * 100vw);
    border-radius: 10px;
    margin: 12px 0 0 8px;

    :nth-child(3n + 1) {
        margin-left: 0;
    }

    :first-child {
        margin-left: 0;
    }
`

const SectionCardImg = styled.div<{ bg: string; hvTitle: boolean }>`
    ${(props) => bgImg(props.bg, 'cover', 'no-repeat', 'center top')}
    ${(props) => ratioHeightForMobile(props.hvTitle ? 69 : 109)};
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    ${(props) => !props.hvTitle && `border-radius: 10px;`}
`

const SectionCardTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #333333;
    height: 40px;
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
    top: 4px;
    left: -8px;
`

const SectionCards: React.FC<ISectionCardProps> = ({
    className,
    img,
    title,
    onClick,
    maintenanceImg,
    isMaintenance,
    id,
}) => {
    return (
        <SectionCard onClick={onClick} className={className} data-qa={id}>
            <SectionCardImg bg={isMaintenance ? maintenanceImg : img} hvTitle={!!title} />
            {title && <SectionCardTitle>{title}</SectionCardTitle>}
            {isMaintenance && <MaintenanceLabel />}
        </SectionCard>
    )
}

export default SectionCards
