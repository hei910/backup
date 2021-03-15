import Header from '@sport/components/mobile/betList/betListItem/Header'
import BetItemStake from '@sport/components/mobile/betList/betListItem/common/BetItemStake'
import BetItemStakeIncrement from '@sport/components/mobile/betList/betListItem/common/BetItemStakeIncrement'
import { darken } from 'polished'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useSelector } from '@redux'
import { removeFromBetList } from '@services/sportBet/actions'
import styled from 'styled-components/macro'
import { teamMap } from '@sport/util/dictionary'
import BetItemMessage from './common/BetItemMessage'

interface BetListItemProps {
    serializedCombinedID: string
}

interface SingleItemProps {
    serializedCombinedID: string
}

const DetailWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    padding: 5px 0;
`

const DetailTeam = styled.span`
    font-weight: bold;
    color: ${(props) => props.theme.sport.colors.text.active.secondary};
`

const DetailAt = styled.span`
    color: #b4b4b4;
`

interface DetailOddsProps {
    updating?: boolean
}

const DetailOdds = styled.span<DetailOddsProps>`
    padding: 0 3px;
    font-weight: bold;
    color: ${(props) => (props.updating ? '#fff' : props.theme.sport.colors.text.active.primary)};
    background-color: ${(props) => (props.updating ? '#b15a13' : 'transparent')};
`

const DetailInfo = styled.div`
    display: flex;
    flex-wrap: wrap-reverse;
    font-size: 13px;
    color: ${(props) => darken(0.01, props.theme.sport.colors.text.primary)};
    padding-top: 5px;
    padding-bottom: 10px;
`

const DetailVS = styled.span`
    font-weight: 600;
    padding: 0 3px;
    color: ${(props) => props.theme.sport.colors.text.active.primary};
`

const InfoTeam = styled.span`
    text-align: center;
    font-weight: 500;
    color: #b4b4b4;
`

const TeamWrapper = styled.div`
    display: flex;
    padding-right: 5px;
`

const SItemWrapper = styled.div`
    margin: 2px 0;
    padding: 10px;
    background-color: #323232;
`

const updatingTimeoutMs = 3000

const SingleItem: React.FC<SingleItemProps> = ({ serializedCombinedID }) => {
    const odds = useSelector((store) => store.sportBet.data[serializedCombinedID]?.odds) ?? 0
    const previousOdds = useRef(odds)
    const [oddsUpdating, setOddsUpdating] = useState(false)
    const competitors = useSelector((store) => store.sportBet.data[serializedCombinedID]?.competitors)
    const specifiers = useSelector((store) => store.sportBet.data[serializedCombinedID]?.specifiers) ?? ''
    const teamName = useSelector((store) => store.sportBet.data[serializedCombinedID]?.outcomeName)
    const isEps = useSelector((store) => store.sportBet.data[serializedCombinedID]?.marketCode === 'eps')
    let showTeam = false
    const { t } = useTranslation()

    useEffect(() => {
        let oddsUpdatingTimeout: any

        if (odds !== previousOdds.current) {
            setOddsUpdating(true)
            oddsUpdatingTimeout = setTimeout(() => setOddsUpdating(false), updatingTimeoutMs)
        }

        previousOdds.current = odds
        return () => clearTimeout(oddsUpdatingTimeout)
    }, [odds])

    if (Array.isArray(competitors) && competitors?.[0].name && competitors?.[1].name) {
        showTeam = true
    }

    const renderWarning = () => {
        if (!oddsUpdating) {
            return null
        }

        let message = ''

        if (oddsUpdating) {
            message = t('betList.betChanged')
        }

        if (!message) {
            return null
        }

        return <BetItemMessage type="warning" message={message} />
    }

    return (
        <>
            <DetailWrapper>
                <DetailTeam>{teamName}</DetailTeam>
                <div>
                    <DetailOdds>{`${!isEps ? specifiers : ''}`}</DetailOdds>
                    <DetailAt>@</DetailAt>
                    <DetailOdds updating={oddsUpdating}>{odds}</DetailOdds>
                </div>
            </DetailWrapper>
            <DetailInfo>
                {showTeam && (
                    <TeamWrapper>
                        <InfoTeam>{teamMap('h', competitors)}</InfoTeam>
                        <DetailVS>v</DetailVS>
                        <InfoTeam>{teamMap('a', competitors)}</InfoTeam>
                    </TeamWrapper>
                )}
            </DetailInfo>
            {renderWarning()}
        </>
    )
}

const BetListItem: React.FC<BetListItemProps> = ({ serializedCombinedID }) => {
    const dispatch = useDispatch()
    const removeBet = () => {
        dispatch(removeFromBetList(serializedCombinedID))
    }

    return (
        <>
            <Header serializedCombinedID={serializedCombinedID} removeBet={removeBet} />
            <SingleItem serializedCombinedID={serializedCombinedID} />
        </>
    )
}

const Item: React.FC<{ serializedCombinedID: string }> = ({ serializedCombinedID }) => {
    return (
        <SItemWrapper>
            <BetListItem serializedCombinedID={serializedCombinedID} />
            <BetItemStake serializedCombinedID={serializedCombinedID} />
            <BetItemStakeIncrement serializedCombinedID={serializedCombinedID} />
        </SItemWrapper>
    )
}

export default React.memo(Item)
