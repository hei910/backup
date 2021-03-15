import { useCallback, useContext } from 'react'
import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'
import { directToDeposit } from '@utils/v1Functions'

import useTranslation from '@hooks/useTranslation'
import { GameContext } from '@app/gameProvider'

const ContentRow = styled.div`
    display: flex;
    align-items: center;
`

const Content = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #1f1f1f;
    flex-grow: 1;
`

const AmountSpan = styled.span`
    font-weight: bold;
`

const Description = styled.div`
    color: #999999;
    ${(props) => props.theme.typography.Body5}
    margin-bottom: 30px;
`

const DepositButton = styled(RoundedButton)`
    flex-shrink: 0;
    width: auto;
    border-radius: 16px;
    padding: 4px 16px;
    ${(props) => props.theme.typography.Body3}
`

const BalanceReminderModal: React.FC<{}> = () => {
    const t = useTranslation()
    const { modalControls, closeBalanceReminder, userBalance, enterGame } = useContext(GameContext)

    const goDeposit = useCallback(() => {
        // TODO: change to v2 deposit
        directToDeposit()
    }, [])

    const onButtonClick = useCallback(() => enterGame(), [enterGame])

    return (
        <Modal
            id="game-balance-reminder-modal"
            icon={ModalIcons.lightbulb}
            title={t('general.components.modal.amountReminder')}
            isOpen={modalControls.isBalanceReminderOpened}
            closeModal={closeBalanceReminder}>
            <div>
                <ContentRow>
                    <Content>
                        {t('general.components.modal.playerBalanceDesc')}
                        <AmountSpan>￥{(+userBalance).toFixed(2)}</AmountSpan>
                    </Content>
                    <DepositButton type="button" buttonType="primary" onClick={goDeposit}>
                        {t('general.components.button.toDeposit')}
                    </DepositButton>
                </ContentRow>
                <Description>{t('general.components.modal.depositReminder')}</Description>
                <RoundedButton type="button" buttonType="secondary" onClick={onButtonClick}>
                    {t('general.components.button.enterGame')}
                </RoundedButton>
            </div>
        </Modal>
    )
}

export default BalanceReminderModal
