import { BetLockIcon } from '@sport/components/icons'
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
    handicap?: string | JSX.Element | React.FC
    odds: string
    active: number
    className?: string
    style?: any
    handicapFontSize?: number
    oddsFontSize?: number
    rulesActiveKey?: string
}

const SBetLockIcon = styled(BetLockIcon)`
    width: 11px;
    height: 11px;
    display: flex;

    path {
        fill: #dddddd;
    }
`

const StyledButton = styled.div<{ oddsTrend?: string; selected?: boolean; negative?: boolean }>`
    font-weight: 500;
    font-size: 12px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.1);
    color: ${(props) => {
        if (props.oddsTrend === 'increment') {
            return '#80b100'
        } else if (props.oddsTrend === 'decrement') {
            return '#bd4700'
        } else if (props.selected) {
            return '#ffffff'
        } else {
            return '#000000'
        }
    }};
    background: ${(props) => (props.selected ? '#FF9300' : '#ffffff')};
    cursor: pointer;
    user-select: none;
    line-height: 1.3;
`

const StyledHandicap = styled.div<{ fontSize: number }>`
    color: #000;
    font-weight: normal;
    white-space: nowrap;
    user-select: none;
    font-size: ${(props) => props.fontSize}px;
`

const SContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SLine = styled.div`
    width: 6px;
    border-top: 1px solid #808080;
`

const SDisplayOdds = styled.div<{ fontSize: number }>`
    display: flex;
    font-size: ${(props) => props.fontSize}px;
`

const SArrow = styled.div<{ fontSize: number }>`
    font-size: ${(props) => props.fontSize}px;
    margin-right: 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const OddsButtonMobile: React.FC<ComponentProps> = ({
    oddsInfo,
    handicap,
    active,
    odds,
    className,
    handicapFontSize = 11,
    oddsFontSize = 12,
    style = {},
    rulesActiveKey = '',
}) => {
    const [oddsTrend, setOddsTrend] = useState('normal')

    //todo remove exclaimation mark here;
    const [currentOdds, setCurrentOdds] = useState(odds)
    // const currentOdds = odds;
    const prevOdds = usePrevious(currentOdds)

    // const rulesLockDown = useSelector((state) => state.sportRules.active[rulesActiveKey])

    const currentActive = active
    const prevActive = usePrevious(currentActive)

    const { date, sports = 'football' } = useCustomParams()
    const isParlay = date === 'parlay'

    const { outcomeUId = 'OddsButtonMobile-outcomeUid-undefined' } = oddsInfo
    // const serializedCombineID = combinedIDToSerializedID(oddsInfo)
    const selected = useSelector((state) => state.sportBet.list.includes(outcomeUId))

    const oddsType = useSelector((state) => state.sportBet.oddsType)
    const prevOddsType = usePrevious(oddsType)

    const [isOddsTrendDisable, setOddsTrendDisabled] = useState(false)

    const dispatch = useDispatch()

    //prevent showing trend change when odds Type changes.
    useEffect(() => {
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
            } else if (parseInt(prevOdds) > parseInt(currentOdds)) {
                setOddsTrend('decrement')
            } else {
                setOddsTrend('increment')
            }

            timer = setTimeout(() => {
                setOddsTrend('normal')
            }, 10000)
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

    const renderOddsNumber = currentActive ? (
        <SDisplayOdds fontSize={oddsFontSize}>
            {oddsTrend === 'increment' ? (
                <SArrow fontSize={oddsFontSize - 2}>▲</SArrow>
            ) : oddsTrend === 'decrement' ? (
                <SArrow fontSize={oddsFontSize - 2}>▼</SArrow>
            ) : (
                ''
            )}
            {odds}
        </SDisplayOdds>
    ) : (
        <SBetLockIcon />
    )

    const submitBet = () => {
        // disable submit when market has disabled
        if (!currentActive) {
            return
        }

        if (oddsInfo) {
            dispatch(updateBetListCurrentIndex(2))
            dispatch(addOrRemoveFromBetList(oddsInfo, sports, isParlay))
        }
    }

    return (
        <StyledButton
            style={style}
            className={className}
            oddsTrend={oddsTrend}
            onClick={submitBet}
            selected={selected}
            negative={currentOdds?.includes('-')}>
            <SContent>
                {handicap && active === 1 && <StyledHandicap fontSize={handicapFontSize}>{handicap}</StyledHandicap>}
                <span>{renderOddsNumber}</span>
            </SContent>
        </StyledButton>
    )
}

export const OddsEmptyButton: React.FC<Pick<ComponentProps, 'style' | 'className'>> = ({ style, className = '' }) => {
    return (
        <StyledButton style={style} className={className}>
            <SContent>
                <SLine />
            </SContent>
        </StyledButton>
    )
}

export default OddsButtonMobile
