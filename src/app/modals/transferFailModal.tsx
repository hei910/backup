import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/appModal'
import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { useDispatch, useSelector } from '@redux'
import { useCallback } from 'react'
import { setIsTransferFailModalOpened } from '@services/modal/action'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 40px;
    }
`

const ContactCsModal: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const t = useTranslation()

    const isOpen = useSelector((state) => state.modal.isTransferFailModalOpened)

    const closeModal = useCallback(() => {
        dispatch(setIsTransferFailModalOpened(false))
    }, [dispatch])

    return (
        <Modal
            id="game-transfer-fail-modal"
            icon={ModalIcons.exclamation}
            title={t('general.components.modal.pleaseNote')}
            isOpen={isOpen}
            closeModal={closeModal}>
            <div>
                <Description data-qa="txtAlertDesc">{t('general.components.modal.transferFail')}</Description>
            </div>
            <RoundedButton type="button" buttonType="secondary" onClick={closeModal} data-qa="btnConfirmAlert">
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}

export default ContactCsModal
