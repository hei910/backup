import { useCallback } from 'react'
import styled from 'styled-components/macro'
import Modal from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'
import { setIsRequireLoginModalOpened, setIsLoginModalOpened } from '@services/modal/action'
import { useDispatch, useSelector } from '@redux'
import useTranslation from '@hooks/useTranslation'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    margin-bottom: 40px;
`

export default () => {
    const dispatch = useDispatch()
    const t = useTranslation()

    const isOpen = useSelector((state) => state.modal.isRequireLoginModalOpened)
    const brandName = useSelector((state) => state.app.brandInfo.brandName)

    const closeModal = useCallback(() => {
        dispatch(setIsRequireLoginModalOpened(false))
    }, [dispatch])

    const onButtonClick = useCallback(() => {
        closeModal()
        if (process.env.APP_PLATFORM === 'mobile') {
            dispatch(setIsLoginModalOpened(true))
        }
    }, [closeModal, dispatch])

    return (
        <Modal
            id="app-please-login-modal"
            title={t('general.components.modal.kindReminder')}
            isOpen={isOpen}
            closeModal={closeModal}>
            <Description data-qa="txtAlertDesc">{t('general.components.modal.pleaseLogin', { brandName })}</Description>
            <RoundedButton type="button" buttonType="secondary" onClick={onButtonClick} data-qa="btnConfirmAlert">
                {t('general.components.button.confirm')}
            </RoundedButton>
        </Modal>
    )
}
