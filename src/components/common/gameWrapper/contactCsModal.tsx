import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/appModal'
import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { useContext } from 'react'
import { GameContext } from '@app/gameProvider'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 40px;
    }
`

const ContactCsModal: React.FC<{}> = () => {
    const t = useTranslation()
    const { modalControls, closeContactCsModal, errorCode } = useContext(GameContext)

    return (
        <Modal
            id="game-contact-cs-modal"
            icon={ModalIcons.phone}
            title={t('general.components.modal.contactCs')}
            isOpen={modalControls.isContactCsOpened}
            closeModal={closeContactCsModal}>
            <div>
                <Description data-qa="txtContactCsDesc">{t('general.components.modal.accountAbnormal')}</Description>
                {errorCode && (
                    <Description data-qa="txtAlertDesc">
                        {t('general.components.modal.errorCode', { errorCode })}
                    </Description>
                )}
            </div>
            <RoundedButton type="button" buttonType="secondary" onClick={closeContactCsModal} data-qa="btnConfirmAlert">
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}

export default ContactCsModal
