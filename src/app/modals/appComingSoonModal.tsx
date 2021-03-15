import styled from 'styled-components/macro'
import GeneralModal from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'

import useTranslation from '@hooks/useTranslation'
import { useDispatch, useSelector } from '@redux'
import { useCallback } from 'react'
import { setDisplayAppComingSoonModal } from '@services/modal/action'

const SDescription = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: left;
    margin-bottom: 16px;
`

const AppComingSoonModal: React.FC<{}> = () => {
    const dispatch = useDispatch()
    const t = useTranslation()

    const isOpen = useSelector((state) => state.modal.isAppComingSoonModalOpened)

    const closeModal = useCallback(() => {
        dispatch(setDisplayAppComingSoonModal(false))
    }, [dispatch])

    return (
        <GeneralModal
            id="app-coming-soon-modal"
            isOpen={isOpen}
            closeModal={closeModal}
            title={t('general.components.modal.kindReminder')}>
            <SDescription>{t('general.components.modal.commingSoon')}</SDescription>
            <RoundedButton type="button" buttonType="secondary" onClick={closeModal}>
                {t('general.components.button.confirm')}
            </RoundedButton>
        </GeneralModal>
    )
}

export default AppComingSoonModal
