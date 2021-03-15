import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { useDispatch, useSelector } from '@redux'
import { useCallback } from 'react'
import { setIsTransferSuccessModalOpened } from '@services/modal/action'
import BaseTransferSuccessModal from '@components/common/baseTransferSuccessModal'

const TransferSuccessModal: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const t = useTranslation()

    const isOpen = useSelector((state) => state.modal.isTransferSuccessModalOpened)

    const closeModal = useCallback(() => {
        dispatch(setIsTransferSuccessModalOpened(false))
    }, [dispatch])

    return (
        <BaseTransferSuccessModal isOpen={isOpen} closeModal={closeModal}>
            <RoundedButton type="button" buttonType="primary" onClick={closeModal} data-qa="btnNextTransfer">
                {t('general.components.button.nextTransfer')}
            </RoundedButton>
        </BaseTransferSuccessModal>
    )
}

export default TransferSuccessModal
