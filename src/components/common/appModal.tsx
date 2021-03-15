import styled from 'styled-components/macro'
import BaseModal from './baseModal'
import { BaseModalProps } from './baseModal/types'
import ModalIconsImage from '@brand/assets/images/modal/app-modal-icons.png'

import imageSprite from '@mixins/imageSprite'

const isMobile = process.env.APP_PLATFORM === 'mobile'
const modalIconWidth = isMobile ? 300 : 340
const modalIconHeight = isMobile ? 141 : 160

export enum ModalIcons {
    ringbell = 1,
    phone = 2,
    pen = 3,
    exclamation = 4,
}

interface AppModalProps extends BaseModalProps {
    icon?: ModalIcons
    title?: string
}

const AppModalBody = styled(BaseModal.Body)`
    padding-top: 0;
    text-align: center;
`

const AppModalTitle = styled.div`
    margin-bottom: 8px;
    color: #1f1f1f;
    ${(props) => props.theme.typography.Subtitle1}
`

const AppModalIcon = styled.div<{ icon: ModalIcons }>`
    display: inline-block;
    width: ${modalIconWidth}px;
    height: ${modalIconHeight}px;
    margin: 0 -16px 16px;
    ${(props) =>
        imageSprite({
            url: ModalIconsImage,
            width: modalIconWidth,
            height: modalIconHeight,
            itemIndex: props.icon - 1,
        })}
`

const AppModal: React.FC<AppModalProps> = ({ icon, title, children, ...otherProps }) => (
    <BaseModal {...otherProps}>
        <AppModalBody>
            {icon && <AppModalIcon icon={icon} />}
            {title && <AppModalTitle data-qa="txtAlertTitle">{title}</AppModalTitle>}
            {children}
        </AppModalBody>
    </BaseModal>
)

export default AppModal
