import React, { useState, useCallback, useContext } from 'react'
import styled from 'styled-components/macro'
import Modal, { ModalIcons } from '@components/common/generalModal'
import { RoundedButton } from '@components/common/button'
import useTranslation from '@hooks/useTranslation'
import { directToDeposit } from '@utils/v1Functions'
import { GameContext } from '@app/gameProvider'

const Description = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: left;
    max-width: 228px;
    display: flex;
    align-items: center;
    color: #1f1f1f;
    /* margin-bottom: 30px; */
`
const SBalanceRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const SButtonRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    > button:first-child {
        margin-right: 10px;
    }
`
const SDepositBtnWrapper = styled.span`
    width: 72px;
`
const SGameType = styled.div`
    max-width: 130px;
    word-break: break-all;
`
const SAmount = styled.div`
    ${(props) => props.theme.typography.Subtitle3}
    /* word-break: break-all; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: pre-wrap;
    max-height: 24px;
`
const SMiddleContainer = styled.div`
    /* width: 100%; */
    margin: 20px 0;
    padding: 16px;
    background-color: #f7f7f7;
    border-radius: 10px;
`
const STransferAmountRow = styled.div`
    border-bottom: 1px solid #999999;
    margin: 8px 0;
    text-align: left;
`
const SInput = styled.input.attrs((props) => ({
    type: 'number',
    pattern: /\d+/gm,
    min: 0,
    inputmode: 'numeric',
    placeholder: props.placeholder,
}))`
    border: none;
    background: transparent;
    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
    }
    /* Firefox */
    &[type='number'] {
        appearance: textfield;
    }
`
const SCurrencySpan = styled.span`
    ${(props) => props.theme.typography.Subtitle2}
`

const SMessage = styled.div`
    ${(props) => props.theme.typography.Body5}
    text-align: left;
`

const SErrorMessage = styled(SMessage)`
    color: #be4700;
`

const SDepositRoundButton = styled(RoundedButton)`
    padding: 8px 0;
    font-size: 14px;
`

const minBalance = 10

const BalanceTransferModal: React.FC<{}> = () => {
    const t = useTranslation()
    const {
        userBalance,
        gameTitle,
        modalControls,
        closeBalanceTransferModal,
        transferToThirdParty,
        enterGame,
        walletBalance,
    } = useContext(GameContext)

    const [isFirstSubmit, setIsFirstSubmit] = useState(true)
    const [inputValue, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const emptyErrorMessage = t('general.components.gameWrapper.emptyDepositTo', {
        game: gameTitle,
    })

    const resetForm = useCallback(() => {
        setIsFirstSubmit(true)
        setInputValue('')
        setErrorMessage('')
    }, [])

    const validator = useCallback(
        (value: string) => {
            const defaultError = ''

            if (!value.length) {
                return defaultError
            }
            if (!isNaN(+userBalance) && +value > +userBalance) {
                return t(`general.components.gameWrapper.errorMessages.insufficientBalance`)
            }
            if (+value < minBalance) {
                return t(`general.components.gameWrapper.errorMessages.notLessThan`, { minBalance })
            }
            if (value.indexOf('.') > -1 && value.indexOf('.') < value.length - 3) {
                return t(`general.components.gameWrapper.errorMessages.floating`)
            }
            return defaultError
        },
        [t, userBalance],
    )

    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            if (!isFirstSubmit) {
                const errorMessage = validator(e.target.value)
                setErrorMessage(errorMessage)
            }
        },
        [isFirstSubmit, validator],
    )

    const onEnterGamePressed = useCallback(() => {
        resetForm()
        enterGame()
    }, [resetForm, enterGame])

    const onTransferPressed = useCallback(async () => {
        const errorMessage = validator(inputValue)
        if (errorMessage === '') {
            if (!isNaN(+userBalance) && +userBalance === 0) {
                onEnterGamePressed()
            } else {
                await transferToThirdParty(+inputValue)
                resetForm()
                closeBalanceTransferModal()
            }
        } else {
            setErrorMessage(errorMessage)
        }
        setIsFirstSubmit(false)
    }, [
        validator,
        inputValue,
        userBalance,
        onEnterGamePressed,
        transferToThirdParty,
        resetForm,
        closeBalanceTransferModal,
    ])

    const onDepositPressed = useCallback(async () => {
        directToDeposit()
        resetForm()
    }, [resetForm])

    return (
        <Modal
            id="app-game-balance-transfer-modal"
            icon={ModalIcons.lightbulb}
            title={t('general.components.modal.amountReminder')}
            isOpen={modalControls.isBalanceTransferOpened}
            closeModal={() => {
                closeBalanceTransferModal()
                resetForm()
            }}>
            <SBalanceRow>
                <Description>
                    {t('general.components.modal.playerBalanceShort')}
                    <SAmount>￥{isNaN(+userBalance) ? userBalance : (+userBalance).toFixed(2)}</SAmount>
                </Description>
                <SDepositBtnWrapper>
                    <SDepositRoundButton type="button" buttonType="primary" onClick={onDepositPressed}>
                        {t('general.components.button.toDeposit')}
                    </SDepositRoundButton>
                </SDepositBtnWrapper>
            </SBalanceRow>
            <SMiddleContainer>
                <Description>
                    <SGameType> {gameTitle}：</SGameType>
                    <SAmount>￥{(+walletBalance).toFixed(2)}</SAmount>
                </Description>
                <STransferAmountRow>
                    <SCurrencySpan>￥</SCurrencySpan>
                    <SInput
                        placeholder={t('general.components.gameWrapper.pleaseEnterAmount')}
                        onChange={onInputChange}
                        value={inputValue}
                    />
                </STransferAmountRow>
                {inputValue === '' || (isFirstSubmit && errorMessage === '') ? (
                    <SMessage>{emptyErrorMessage}</SMessage>
                ) : (
                    <SErrorMessage>{errorMessage}</SErrorMessage>
                )}
            </SMiddleContainer>

            <SButtonRow>
                <RoundedButton type="button" buttonType="secondary" onClick={onEnterGamePressed}>
                    {t('general.components.button.enterGame')}
                </RoundedButton>
                <RoundedButton type="button" buttonType="primary" onClick={onTransferPressed}>
                    {t('general.components.button.confirm')}
                </RoundedButton>
            </SButtonRow>
        </Modal>
    )
}

export default BalanceTransferModal
