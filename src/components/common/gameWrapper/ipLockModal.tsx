import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'
import useTranslation from '@hooks/useTranslation'
import { GameContext } from '@app/gameProvider'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: left;
    margin-bottom: 40px;
`

const IPLockModal: React.FC<{}> = () => {
    const t = useTranslation()
    const { modalControls, closeIPLockModal, gameTitle } = useContext(GameContext)

    return (
        <Modal
            id="app-ip-lock-modal"
            icon={ModalIcons.exclamation}
            title={t('general.components.modal.pleaseNote')}
            isOpen={modalControls.isIPLockOpened}
            closeModal={closeIPLockModal}>
            <Description data-qa="txtAlertDesc">
                {t('general.components.modal.ipLockReminder', { supplierName: gameTitle })}
            </Description>
            <RoundedButton type="button" buttonType="secondary" onClick={closeIPLockModal} data-qa="btnConfirmAlert">
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}

export default IPLockModal
