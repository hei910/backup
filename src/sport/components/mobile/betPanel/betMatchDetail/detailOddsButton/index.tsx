import { MobileLockIcon } from '@sport/components/icons'
import useCustomParams from '@sport/hooks/useCustomParams'
import usePrevious from '@sport/hooks/usePrevious'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from '@redux'
import { addOrRemoveFromBetList } from '@services/sportBet/actions'
import { CombinedID } from '@services/sportBet/types'
import { updateBetListCurrentIndex } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'

interface ComponentProps {
    oddsInfo: CombinedID
    handicap?: string
    odds: string
    active: number
    outcomeName?: string
}
const SButton = styled.div<{ selected?: boolean; justifyCenter: boolean }>`
    box-shadow: 4px 4px 4px 0px rgba(180, 180, 180, 0.1), -1px -4px 4px 0px rgba(180, 180, 180, 0.1);
    padding: 15px 10px;
    width: 100%;
    border-radius: 5px;
    font-size: 14px;
    height: 51px;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.justifyCenter ? `center` : `space-between`)};
    transition: background 0.3s ease;
    background: ${(props) => {
        if (props.selected) {
            return props.theme.sport.colors.accent
        } else {
            return props.theme.sport.colors.active
        }
    }};
`
const SOddsFrame = styled.div`
    padding-right: 2.5px;
    padding-left: 2.5px;
    margin-bottom: 5px;
    width: 100%;
`

const SLeftColumn = styled.div`
    color: #bd4700;
`

const SRightColumn = styled.div<{ oddsTrend: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(props) => {
        if (props.oddsTrend === 'increment') {
            return props.theme.sport.colors.success
        } else if (props.oddsTrend === 'decrement') {
            return props.theme.sport.colors.error
        } else {
            return props.theme.sport.colors.tertiary
        }
    }};
`

const SArrowUp = styled.div`
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid ${(props) => props.theme.sport.colors.success};
    margin-right: 4px;
`

const SArrowDown = styled.div`
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid ${(props) => props.theme.sport.colors.error};
    margin-right: 4px;
`

const SLockContainer = styled(MobileLockIcon)`
    height: 11px;
    width: auto;
    /* padding: 1.5px 0px; */
    display: flex;
    justify-content: center;

    path {
        fill: ${(props) => props.theme.sport.colors.secondary};
    }
`

const DetailOddsButton: React.FC<ComponentProps> = ({ outcomeName, oddsInfo, handicap, active, odds }) => {
    const [oddsTrend, setOddsTrend] = useState('normal')

    //todo remove exclaimation mark here;
    const [currentOdds, setCurrentOdds] = useState(odds)
    // const currentOdds = odds;
    const prevOdds = usePrevious(currentOdds)

    const currentActive = active
    const prevActive = usePrevious(currentActive)

    const { date, sports = 'football' } = useCustomParams()
    const isParlay = date === 'parlay'

    // const serializedCombineID = combinedIDToSerializedID(oddsInfo)
    const { outcomeUId = 'DetailOddsButton-outComeUid-undefined' } = oddsInfo
    const selected = useSelector((state) => state.sportBet.list.includes(outcomeUId))

    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const prevOddsType = usePrevious(oddsType)

    const [isOddsTrendDisable, setOddsTrendDisabled] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        //prevent showing trend change when odds Type changes.
        let oddsTypeTimer: any

        if (oddsType && prevOddsType) {
            if (oddsType !== prevOddsType) {
                setOddsTrendDisabled(true)

                oddsTypeTimer = setTimeout(() => {
                    setOddsTrendDisabled(false)
                }, 5000)
            }
        }

        return () => {
            if (oddsTypeTimer) {
                clearTimeout(oddsTypeTimer)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oddsType])

    useEffect(() => {
        let timer: any

        if (currentOdds && prevOdds && !isOddsTrendDisable) {
            if (prevOdds === currentOdds || active === 0 || currentActive !== prevActive) {
                setOddsTrend('normal')
            } else if (prevOdds > currentOdds) {
                setOddsTrend('decrement')
            } else {
                setOddsTrend('increment')
            }

            timer = setTimeout(() => {
                setOddsTrend('normal')
            }, 5000)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentOdds])

    useEffect(() => {
        setCurrentOdds(odds)
    }, [odds])
    const submitBet = () => {
        // disable submit when market has disabled
        if (!active) {
            return
        }

        if (oddsInfo) {
            dispatch(updateBetListCurrentIndex(2))
            dispatch(addOrRemoveFromBetList(oddsInfo, sports, isParlay))
        }
    }

    const leftColumn = (
        <SLeftColumn>
            {outcomeName && outcomeName}
            {handicap && handicap}
        </SLeftColumn>
    )

    const renderOddsNumber = active ? (
        <>
            {(outcomeName || handicap) && leftColumn}
            <SRightColumn oddsTrend={oddsTrend}>
                {oddsTrend === 'increment' && <SArrowUp />}
                {oddsTrend === 'decrement' && <SArrowDown />}
                {odds}
            </SRightColumn>
        </>
    ) : (
        <>
            <SRightColumn oddsTrend={oddsTrend}>
                <SLockContainer />
            </SRightColumn>
        </>
    )
    return (
        <SOddsFrame>
            <SButton onClick={submitBet} selected={selected} justifyCenter={(!handicap && !outcomeName) || !active}>
                {renderOddsNumber}
            </SButton>
        </SOddsFrame>
    )
}

export default DetailOddsButton
