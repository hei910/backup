import React, { useCallback, useContext } from 'react'
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

const GameTrialModal: React.FC<{}> = () => {
    const t = useTranslation()
    const { modalControls, closeGameTrialReminder, enterGame } = useContext(GameContext)
    const enterTrialGame = useCallback(() => enterGame({ isTry: true }), [enterGame])

    return (
        <Modal
            id="app-game-trial-modal"
            icon={ModalIcons.exclamation}
            title={t('general.components.modal.pleaseNote')}
            isOpen={modalControls.isGameTrialReminderOpened}
            closeModal={closeGameTrialReminder}>
            <Description data-qa="txtAlertDesc">{t('general.components.modal.gameTrialReminder')}</Description>
            <RoundedButton type="button" buttonType="secondary" onClick={enterTrialGame} data-qa="btnConfirmAlert">
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}

export default GameTrialModal
