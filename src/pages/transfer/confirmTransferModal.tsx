import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'
import useTranslation from '@hooks/useTranslation'
import GameSuppliers from '@constants/gameSuppliers'

interface ModalProps {
    isOpen: boolean
    onCancel: () => void
    onConfirm: () => void
    supplier: GameSuppliers
}

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 40px;
`

const ButtonContainer = styled.div`
    display: flex;

    ${RoundedButton}:not(:first-child) {
        margin-left: 12px;
    }
`

const ConfirmTransferModal: React.FC<ModalProps> = ({ isOpen, onCancel, onConfirm, supplier }) => {
    const t = useTranslation()

    return (
        <Modal
            id="alertCollectionConfirm"
            title={t('general.components.modal.kindReminder')}
            icon={ModalIcons.lightbulb}
            isOpen={isOpen}
            closeModal={onCancel}>
            <Description data-qa="txtCollectionConfirm">
                {t(
                    supplier === GameSuppliers.sport
                        ? 'transfer.modal.confirmCollect'
                        : 'transfer.modal.confirmTransfer',
                    { game: t(`transfer.walletName.${supplier}`) },
                )}
            </Description>
            <ButtonContainer>
                <RoundedButton type="button" buttonType="ghost" onClick={onCancel} data-qa="btnCollectionCancel">
                    {t('general.components.button.cancel')}
                </RoundedButton>
                <RoundedButton type="button" buttonType="secondary" onClick={onConfirm} data-qa="btnCollectionConfirm">
                    {t('general.components.button.confirm')}
                </RoundedButton>
            </ButtonContainer>
        </Modal>
    )
}

export default ConfirmTransferModal
