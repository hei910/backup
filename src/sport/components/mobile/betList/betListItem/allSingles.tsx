import BetItemStake from '@sport/components/mobile/betList/betListItem/common/BetItemStake'
import BetItemStakeIncrement from '@sport/components/mobile/betList/betListItem/common/BetItemStakeIncrement'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'

const SWrapper = styled.div`
    margin: 2px 0;
    padding: 10px;
    background-color: #4b4b4b;
`

const STitle = styled.div`
    margin: 8px 0 2px 0;
    color: #b4b4b4;
`

const AllSingles: React.FC = () => {
    const count = useSelector((store) => store.sportBet.list.length)
    const { t } = useTranslation()

    return (
        <SWrapper>
            <STitle>{t('betList.every')}</STitle>
            <BetItemStake serializedCombinedID={'all'} suffix={`X ${count}`} />
            <BetItemStakeIncrement serializedCombinedID={'all'} />
        </SWrapper>
    )
}

export default React.memo(AllSingles)
