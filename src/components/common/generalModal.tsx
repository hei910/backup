import React from 'react'
import styled from 'styled-components/macro'
import BaseModal from './baseModal'
import { BaseModalProps } from './baseModal/types'

import imageSprite from '@styles/mixins/imageSprite'
import Icons from '@brand/assets/images/modal/general-modal-icons.svg'

export enum ModalIcons {
    lightbulb = 1,
    exclamation = 2,
}

interface AppModalProps extends BaseModalProps {
    title: string
    icon?: ModalIcons
}

const GeneralModalHeader = BaseModal.Header

const HeaderTitle = styled.span`
    ${(props) => props.theme.typography.Subtitle1}
`

const HeaderIcon = styled.div<{ iconIndex: ModalIcons }>`
    width: 24px;
    height: 24px;
    margin-right: 8px;
    ${(props) =>
        imageSprite({
            url: Icons,
            width: 24,
            height: 24,
            itemIndex: props.iconIndex - 1,
        })}
`

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
`

const GeneralModalBody = BaseModal.Body

const GeneralModal: React.FC<AppModalProps> = ({ icon = ModalIcons.lightbulb, title, children, ...otherProps }) => (
    <BaseModal {...otherProps}>
        <GeneralModalHeader>
            <HeaderContainer>
                <HeaderIcon iconIndex={icon} />
                <HeaderTitle data-qa="txtAlertTitle">{title}</HeaderTitle>
            </HeaderContainer>
        </GeneralModalHeader>
        <GeneralModalBody>{children}</GeneralModalBody>
    </BaseModal>
)

export default GeneralModal
