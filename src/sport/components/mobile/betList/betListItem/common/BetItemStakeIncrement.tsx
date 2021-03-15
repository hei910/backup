import { BackspaceIcon } from '@sport/components/icons'
import useAllSingleStake from '@sport/hooks/useAllSingleStake'
import React from 'react'
import { useDispatch, useSelector } from '@sport/stores'
import { changeAllSingleStake, changeParlayStake, changeSingleStake } from '@services/sportBet/actions'
import styled from 'styled-components/macro'

interface BetItemStakeIncrementProps {
    serializedCombinedID?: string
    combinationId?: string
    parlayOdds?: number
}

const incrementAmount = {
    mobile: [100, 1000, 10000],
    tablet: [50, 100, 500, 1000, 5000, 10000],
}

const digitAmount = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00']
const mobileDigitPerRow = 6

const SContainer = styled.div`
    background-color: #a0a0a0;
    padding: 5px;
    margin-top: 10px;
`

const SHr = styled.hr`
    width: 98%;
`

const SFlexRowWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    user-select: none;
`

const SDigitButton = styled.div`
    flex-grow: 1;
    background-color: #3b3b3b;
    border-radius: 4px;
    margin: 3px;
    text-align: center;
    padding: 12px 0;
    color: #b4b4b4;
`

const SIncrementButton = styled.div`
    flex-grow: 1;
    color: ${(props) => props.theme.sport.colors.error};
    background-color: ${(props) => props.theme.sport.colors.text.background};
    margin: 3px;
    padding: 10px 0;
    text-align: center;
    border-radius: 4px;
    font-size: 16px;
`

const SMobileDigitButton = styled(SDigitButton)`
    flex-basis: calc(100% / ${mobileDigitPerRow + 1});
`

const SBackspaceButton = styled(SDigitButton)`
    display: flex;
    padding: 0;
    background-color: #d9d9d9;
`

const SMobileBackSpaceButton = styled(SBackspaceButton)`
    display: flex;
    flex-basis: calc(100% / ${mobileDigitPerRow + 1});
`

const SBackspaceIcon = styled(BackspaceIcon)`
    width: 28px;
    height: 28px;
    display: block;
    margin: auto;

    path:not([fill='none']) {
        fill: #646464;
    }
`

const BetItemStakeIncrement: React.FC<BetItemStakeIncrementProps> = ({
    serializedCombinedID,
    combinationId,
    parlayOdds,
}) => {
    const [sameStake] = useAllSingleStake()
    const id = combinationId ?? serializedCombinedID
    const isFocused = useSelector((store) => store.sportBet.betForceId === id)
    const isTabletLayout = useSelector((store) => store.sportGlobal.isTabletLayout)
    const dispatch = useDispatch()
    const type = typeof serializedCombinedID === 'undefined' ? 'parlay' : 'single'
    const stake = useSelector((store) => store.sportBet.stake[type][id!])
    const currentBet = id === 'all' ? sameStake : stake?.bet ?? 0

    if (!isFocused) {
        return null
    }

    const changeStake = (stake: number) => {
        if (type === 'single') {
            if (id === 'all') {
                dispatch(changeAllSingleStake(stake))
            } else {
                dispatch(changeSingleStake(serializedCombinedID!, stake))
            }
        } else {
            dispatch(changeParlayStake(combinationId!, stake, parlayOdds!))
        }
    }

    const increment = (bet: number) => {
        const incrementStake = currentBet + bet
        const newBet = incrementStake
        currentBet !== newBet && changeStake!(newBet)
    }

    const appendDigit = (digit: string) => {
        const newBet = parseInt(currentBet.toString() + digit)

        console.log('140651 BetItemStakeIncrement.tsx newBet', newBet)

        currentBet !== newBet && changeStake!(newBet)
    }

    const removeLastDigit = () => {
        if (currentBet !== 0) {
            const currentBetString = currentBet.toString()
            const newBet = parseInt(currentBetString.substring(0, currentBetString.length - 1))
            currentBet !== newBet && changeStake!(newBet)
        }
    }

    const renderIncrementButtons = () => {
        const list = isTabletLayout ? incrementAmount.tablet : incrementAmount.mobile
        const buttons = list.map((incrementAmount) => (
            <SIncrementButton
                key={`betlist-tablet-stake-increment-${
                    serializedCombinedID ?? combinationId
                }-increment-${incrementAmount}`}
                onClick={() => increment(incrementAmount)}>{`+${incrementAmount}`}</SIncrementButton>
        ))
        return <SFlexRowWrapper>{buttons}</SFlexRowWrapper>
    }

    const renderNumberButtons = () => {
        const buttons = digitAmount.map((digit) => {
            if (isTabletLayout) {
                return (
                    <SDigitButton
                        key={`betlist-tablet-stake-increment-${serializedCombinedID ?? combinationId}-digit-${digit}`}
                        onClick={() => appendDigit(digit)}>
                        {digit}
                    </SDigitButton>
                )
            } else {
                return (
                    <SMobileDigitButton
                        key={`betlist-tablet-stake-increment-${serializedCombinedID ?? combinationId}-digit-${digit}`}
                        onClick={() => appendDigit(digit)}>
                        {digit}
                    </SMobileDigitButton>
                )
            }
        })
        const backspaceButton = isTabletLayout ? (
            <SBackspaceButton onClick={() => removeLastDigit()}>
                <SBackspaceIcon />
            </SBackspaceButton>
        ) : (
            <SMobileBackSpaceButton onClick={() => removeLastDigit()}>
                <SBackspaceIcon />
            </SMobileBackSpaceButton>
        )

        return (
            <SFlexRowWrapper>
                {buttons}
                {backspaceButton}
            </SFlexRowWrapper>
        )
    }

    return (
        <SContainer>
            {renderIncrementButtons()}
            <SHr />
            {renderNumberButtons()}
        </SContainer>
    )
}

export default React.memo(BetItemStakeIncrement)
