import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/appModal'
import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { useCallback } from 'react'
import { directToTransferRecord } from '@utils/v1Functions'

interface TransferSuccessModalProps {
    isOpen: boolean
    closeModal: () => void
    description?: string
}

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 40px;
    }
`

const ButtonContainer = styled.div`
    display: flex;

    ${RoundedButton}:not(:first-child) {
        margin-left: 12px;
    }
`

const BaseTransferSuccessModal: React.FC<TransferSuccessModalProps> = ({
    children,
    isOpen,
    closeModal,
    description,
}) => {
    const t = useTranslation()

    const viewTransactionRecord = useCallback(() => {
        closeModal()
        directToTransferRecord()
    }, [closeModal])

    return (
        <Modal
            id="base-transfer-success-modal"
            icon={ModalIcons.ringbell}
            title={t('general.components.modal.kindReminder')}
            isOpen={isOpen}
            closeModal={closeModal}>
            <div>
                <Description data-qa="txtTransferSuccess">
                    {description || t('general.components.modal.transferSuccess')}
                </Description>
            </div>
            <ButtonContainer>
                <RoundedButton
                    type="button"
                    buttonType="secondary"
                    onClick={viewTransactionRecord}
                    data-qa="btnTransferRecord">
                    {t('general.components.button.viewRecord')}
                </RoundedButton>
                {children}
            </ButtonContainer>
        </Modal>
    )
}

export default BaseTransferSuccessModal
