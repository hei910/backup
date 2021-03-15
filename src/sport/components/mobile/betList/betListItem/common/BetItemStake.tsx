import useAllSingleStake from '@sport/hooks/useAllSingleStake'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from '@sport/stores'
import { useSelector } from '@redux'
import { changeAllSingleStake, changeParlayStake, changeSingleStake, setBetForceId } from '@services/sportBet/actions'
import styled from 'styled-components/macro'

interface BetItemStakeProps {
    serializedCombinedID?: string
    combinationId?: string
    parlayOdds?: number
    suffix?: string
}

interface WrapperProps {
    onClick: () => void
}

const Wrapper = styled.div<WrapperProps>`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    cursor: pointer;
    user-select: none;
`

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`

const InputBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${(props) => props.theme.sport.colors.active};
    width: 150px;
    height: 50px;
    padding: 2px 10px;
    border-radius: 3px;
    border: 2px solid ${(props) => props.theme.sport.colors.accent};
`

const SSuffix = styled.div`
    color: #fff;
    margin: 0 3px;
`

const Stake = styled.div``

const Clear = styled.div`
    color: ${(props) => props.theme.sport.colors.text.primary};
    cursor: pointer;
`

const ToWin = styled.div`
    font-size: 13px;
    color: ${(props) => props.theme.sport.colors.active};
`

const BetItemStake: React.FC<BetItemStakeProps> = ({ serializedCombinedID, combinationId, parlayOdds, suffix }) => {
    const bet = useSelector((store) => {
        if (serializedCombinedID) {
            return store.sportBet.stake.single?.[serializedCombinedID]?.bet
        } else {
            return store.sportBet.stake.parlay?.[combinationId!]?.bet
        }
    })

    const toWin = useSelector((store) => {
        if (serializedCombinedID) {
            return store.sportBet.stake.single?.[serializedCombinedID]?.toWin
        } else {
            return store.sportBet.stake.parlay?.[combinationId!]?.toWin
        }
    })
    const [sameStake, sameStakeToWin] = useAllSingleStake()

    const dispatch = useDispatch()

    let clearAction = () => {}

    if (serializedCombinedID) {
        if (serializedCombinedID === 'all') {
            clearAction = () => dispatch(changeAllSingleStake(0))
        } else {
            clearAction = () => dispatch(changeSingleStake(serializedCombinedID!, 0))
        }
    } else {
        clearAction = () => dispatch(changeParlayStake(combinationId!, 0, parlayOdds!))
    }

    const { t } = useTranslation()

    let betDisplay = bet
    let toWinDisplay = toWin

    if (serializedCombinedID === 'all') {
        betDisplay = sameStake
        toWinDisplay = sameStakeToWin
    }

    return (
        <Wrapper onClick={() => dispatch(setBetForceId((serializedCombinedID || combinationId)!))}>
            <InputWrapper>
                <InputBox>
                    <Stake>{betDisplay ? betDisplay : t('betList.stake')}</Stake>
                    <Clear onClick={clearAction}>✕</Clear>
                </InputBox>
                {suffix && <SSuffix>{suffix}</SSuffix>}
            </InputWrapper>
            <ToWin>{toWinDisplay ? toWinDisplay.toFixed(2) : t('betList.toWin')}</ToWin>
        </Wrapper>
    )
}

export default React.memo(BetItemStake)
