import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/appModal'
import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { SeparatedWalletSuppliers } from '@constants/gameSuppliers'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 8px;

    &:last-child {
        margin-bottom: 40px;
    }
`

const TransferPartialFailModal: React.FC<{
    isOpen: boolean
    closeModal: () => void
    failList: SeparatedWalletSuppliers[]
}> = ({ isOpen, closeModal, failList }) => {
    const t = useTranslation()
    const failListStr = failList?.map((supplier) => t(`transfer.walletName.${supplier}`))?.join(t('general.and'))

    return (
        <Modal
            id="game-transfer-fail-modal"
            icon={ModalIcons.phone}
            title={t('general.components.modal.contactCs')}
            isOpen={isOpen}
            closeModal={closeModal}>
            <div>
                <Description>
                    {t('transfer.modal.partialTransferFail', { supplierList: failListStr || '' })}
                </Description>
            </div>
            <RoundedButton type="button" buttonType="secondary" onClick={closeModal}>
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}

export default TransferPartialFailModal
