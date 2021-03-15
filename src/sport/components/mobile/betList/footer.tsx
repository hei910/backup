import BettingError from '@sport/components/mobile/betList/betting/error'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from '@sport/stores'
import { changeBetListStatus, removeAllBet, submitBet, updateAcceptance } from '@services/sportBet/actions'
import { Acceptance, BetListStatus } from '@services/sportBet/types'
import { toggleBetList } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import { setTimeout } from 'timers'
import checkStakeBetLimits from '@sport/util/checkStakeBetLimits'
import { betErrorCodeMap } from '@sport/util/dictionary'
import { goBackOldVersion } from '@sport/util/general'
import useLoginModal from '@hooks/useLoginModal'

interface BetListFooterProps {
    totalStake: number
}

interface CheckboxProps {
    label: string
    checked: boolean
    fn: () => void
}

const SWrapper = styled.div`
    background-color: #323232;
`

const SRow = styled.div`
    display: flex;
    justify-content: center;
`

const SButton = styled.div`
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    flex-grow: 1;
    margin: 5px;
    padding: 12px;
`

const SBetButton = styled(SButton)<{ isLogin: boolean }>`
    color: #374b23;
    background-color: ${(props) => (props.isLogin ? '#84b752' : '#F79301')};
`

const SDeleteButton = styled(SButton)`
    color: #fff;
    background-color: #dc474a;
`

const SAddMore = styled(SButton)`
    flex-grow: 2;
    color: #5a5a5a;
    background-color: #d9d9d9;
`

const SCheckboxWrapper = styled.div``
const SCheckbox = styled.input``

const SLabel = styled.label`
    color: #b4b4b4;
`

const SLoginText = styled.span`
    color: #6495ed;
`

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, fn }) => {
    return (
        <SCheckboxWrapper>
            <SCheckbox type="checkbox" checked={checked} onChange={fn} />
            <SLabel>{label}</SLabel>
        </SCheckboxWrapper>
    )
}

const CheckboxMemo = React.memo(Checkbox)

const BetListFooter: React.FC<BetListFooterProps> = ({ totalStake }) => {
    const acceptance = useSelector((state) => state.sportBet.acceptance)
    const betListStatus = useSelector((state) => state.sportBet.betListStatus)
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const { showLoginModal } = useLoginModal()

    const [showGeustMessage] = useState(false)

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const isDisabled = totalStake === 0

    const defaultFailMessage = t('error.networkException')
    const [failMessage, setFailMessage] = useState(defaultFailMessage)

    const setErrorMessage = (error: { code: string; message?: string }) => {
        if (error.code === 'BE0012' && error.message) {
            const regex = /\d+/
            const [min, max] = error.message.split('/').map((v) => {
                const match = regex.exec(v)
                return match !== null ? match[0] : 0
            })
            setFailMessage(`${t('error.limtStake')} ${min} - ${max}`)
        } else {
            setFailMessage(t(betErrorCodeMap[error.code] ?? 'error.others'))
        }
    }

    const onSubmit = () => {
        if (isDisabled) {
            setFailMessage(t('error.emptyStake'))
            dispatch(changeBetListStatus(BetListStatus.FAILED))
            return setTimeout(() => {
                dispatch(changeBetListStatus(BetListStatus.BETTING))
            }, 5 * 1000)
        }

        const betLimitsCheck = checkStakeBetLimits()

        if (!betLimitsCheck.valid) {
            if (
                Object.prototype.hasOwnProperty.call(betLimitsCheck, 'min') &&
                Object.prototype.hasOwnProperty.call(betLimitsCheck, 'max') &&
                betListStatus !== BetListStatus.FAILED
            ) {
                setErrorMessage({ code: 'BE0012', message: `${betLimitsCheck.min}/${betLimitsCheck.max}` })
                dispatch(changeBetListStatus(BetListStatus.FAILED))
                setTimeout(() => {
                    dispatch(changeBetListStatus(BetListStatus.BETTING))
                }, 5 * 1000)

                return
            }
        } else {
            dispatch(submitBet('mobile', setErrorMessage))
        }
    }

    const showLogin = () => {
        dispatch(toggleBetList(false))
        setTimeout(() => {
            showLoginModal()
        }, 100)
    }

    return (
        <SWrapper>
            {betListStatus === BetListStatus.FAILED && <BettingError message={failMessage} />}
            {showGeustMessage && (
                <BettingError
                    message={
                        <div>
                            <span>{t('error.loginToBeting1')}</span>
                            <SLoginText onClick={() => goBackOldVersion('?showLogin=1')}>
                                {t('error.loginToBeting2')}
                            </SLoginText>
                            <span>{t('error.loginToBeting3')}</span>
                        </div>
                    }
                />
            )}
            <SRow>
                {isLoggedIn ? (
                    <SBetButton isLogin={isLoggedIn} onClick={onSubmit}>
                        {t('betList.bet')}
                    </SBetButton>
                ) : (
                    <SBetButton isLogin={isLoggedIn} onClick={showLogin}>
                        {t('betList.login')}
                    </SBetButton>
                )}
            </SRow>
            <SRow>
                <SDeleteButton onClick={() => dispatch(removeAllBet())}>{t('betList.deleteAll')}</SDeleteButton>
                <SAddMore onClick={() => dispatch(toggleBetList())}>{t('betList.addMore')}</SAddMore>
            </SRow>
            <SRow>
                <CheckboxMemo
                    label={t('betList.acceptance')}
                    checked={acceptance === Acceptance.ANY}
                    fn={() => dispatch(updateAcceptance())}
                />
            </SRow>
        </SWrapper>
    )
}

export default BetListFooter
