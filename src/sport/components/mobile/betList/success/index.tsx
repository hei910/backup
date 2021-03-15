import { DoneIcon, PendingIcon } from '@sport/components/icons'
import BetListHeader from '@sport/components/mobile/betList//header'
import Total from '@sport/components/mobile/betList/total'
import useTotalStakeAndToWinFromSubmitBet from '@sport/hooks/useTotalStakeAndToWinFromSubmitBet'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { removeAllBet } from '@services/sportBet/actions'
import styled from 'styled-components/macro'
import BetListSuccessParlay from './parlay'
import BetListSuccessSingle from './single'

const SContainer = styled.div``

const SSuccessMessage = styled.div`
    display: flex;
    color: #033011;
    background-color: #84b752;
    padding: 8px 10px;
`

const SDoneIcon = React.memo(styled(DoneIcon)`
    width: 24px;
    height: 24px;
    fill: #033011;
`)

const SPendingMessage = styled(SSuccessMessage)`
    color: #434410;
    background-color: #ccff51;
`

const SPendingIcon = React.memo(styled(PendingIcon)`
    width: 24px;
    height: 24px;
    fill: #434410;
`)

const SSuccessText = styled.div``

const SConfirmButton = styled.div`
    color: #5a5a5a;
    background-color: #d9d9d9;
    text-align: center;
    margin: 3px;
    padding: 12px;
    border-radius: 4px;
`

const BetListSuccess: React.FC = () => {
    const balance = useSelector((store) => store.user.balance)
    const isConfirmed = useSelector((store) => store.sportBet.submitBetResult?.confirm)
    const [totalStake, totalToWin, betCount] = useTotalStakeAndToWinFromSubmitBet()

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const toggleBetListCallback = useCallback(() => {
        dispatch(removeAllBet())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const balanceNumber = balance ? parseFloat(balance) : 0

    return (
        <SContainer>
            <BetListHeader
                title={t('betList.header') + t('betList.confirm')}
                balance={balanceNumber}
                buttonOnClick={toggleBetListCallback}
            />
            <BetListSuccessSingle />
            <BetListSuccessParlay />
            {isConfirmed && (
                <SSuccessMessage>
                    <SDoneIcon />
                    <SSuccessText>{t('betList.successMessage')}</SSuccessText>
                </SSuccessMessage>
            )}
            {!isConfirmed && (
                <SPendingMessage>
                    <SPendingIcon />
                    <SSuccessText>{t('betList.pending')}</SSuccessText>
                </SPendingMessage>
            )}
            <Total count={betCount} stake={totalStake} toWin={totalToWin} />
            <SConfirmButton onClick={toggleBetListCallback}>{t('betList.confirm')}</SConfirmButton>
        </SContainer>
    )
}

export default BetListSuccess
