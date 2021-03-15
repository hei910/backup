import { WarningIcon } from '@sport/components/icons'
import BetItemStake from '@sport/components/mobile/betList/betListItem/common/BetItemStake'
import BetItemStakeIncrement from '@sport/components/mobile/betList/betListItem/common/BetItemStakeIncrement'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'
import { nCr, totalCombination } from '@sport/util/betCalculate'
import Accordion from './common/Accordion'

interface ParlayProps {
    parlayOdds: number[]
}

interface ParlayItemProps {
    n: number
    r: number
    odds: number
}

const SInvalidMessageContainer = styled.div`
    display: flex;
    padding: 10px 10px;
    align-items: center;
    background-color: #e64648;
`
const SInvalidMessageIcon = styled(WarningIcon)`
    fill: #fff;
    margin-right: 5px;
`

const SInvalidMessageText = styled.div`
    color: #fff;
`

const SParlayItemContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const SParlayItemWrapper = styled.div`
    margin-top: 1px;
    padding: 10px;
    background-color: #4b4b4b;
`

const SParlayItemTitle = styled.div`
    padding: 5px 0;
    color: #b4b4b4;
`

const SParlayItemOdds = styled.span`
    color: #ff9200;
`

const ParlayItem: React.FC<ParlayItemProps> = ({ n, r, odds }) => {
    const tC = totalCombination(n)

    return (
        <SParlayItemWrapper style={r === 0 ? { order: 10 } : {}}>
            <SParlayItemTitle>
                {`${r === 0 ? n : r}串${r === 0 ? tC : 1} @ `}
                <SParlayItemOdds>{odds.toFixed(2)}</SParlayItemOdds>
            </SParlayItemTitle>
            <BetItemStake combinationId={r.toString()} parlayOdds={odds} suffix={`✕ ${r === 0 ? tC : nCr(n, r)}`} />
            <BetItemStakeIncrement combinationId={r.toString()} parlayOdds={odds} />
        </SParlayItemWrapper>
    )
}

const ParlayItemMemo = React.memo(ParlayItem)

const Parlay: React.FC<ParlayProps> = ({ parlayOdds }) => {
    const canParlay = useSelector(
        (store) => [...store.sportBet.sameMatchList, ...store.sportBet.orSameSeasonList].length === 0,
    )
    const { t } = useTranslation()

    const n = parlayOdds.length - 1

    const items = parlayOdds.map((odds, r) => {
        if (n === 2 && r === 0) {
            return null
        }

        return <ParlayItemMemo key={`betList-parlay-item-${n}C${r}-${odds}`} n={n} r={r} odds={odds} />
    })

    const errorMessage = () => {
        const messages: JSX.Element[] = []

        if (!canParlay) {
            messages.push(
                <SInvalidMessageContainer key="betlist-error-message-samematch">
                    <SInvalidMessageIcon />
                    <SInvalidMessageText>{t('betList.sameMatchMessage')}</SInvalidMessageText>
                </SInvalidMessageContainer>,
            )
        }

        return messages
    }

    return (
        <>
            <Accordion
                title={t('betList.multipleBetTitle')}
                active={true}
                child={!canParlay ? <></> : <SParlayItemContainer>{items}</SParlayItemContainer>}
            />
            {errorMessage()}
        </>
    )
}

export default React.memo(Parlay)
