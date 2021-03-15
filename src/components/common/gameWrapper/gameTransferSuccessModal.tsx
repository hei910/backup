import { GameContext } from '@app/gameProvider'
import BaseTransferSuccessModal from '@components/common/baseTransferSuccessModal'
import useTranslation from '@hooks/useTranslation'
import { useContext } from 'react'
import { RoundedButton } from '@components/common/button'

export default () => {
    const t = useTranslation()
    const { modalControls, closeSuccessTransferModal, enterGame } = useContext(GameContext)

    return (
        <BaseTransferSuccessModal
            description={t('general.components.modal.gameTransferSuccess')}
            isOpen={modalControls.isSuccessTransferOpened}
            closeModal={closeSuccessTransferModal}>
            <RoundedButton type="button" buttonType="primary" onClick={enterGame as () => void}>
                {t('general.components.button.enterGame')}
            </RoundedButton>
        </BaseTransferSuccessModal>
    )
}
