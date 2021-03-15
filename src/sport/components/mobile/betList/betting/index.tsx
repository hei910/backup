import { CloseIcon } from '@sport/components/icons'
import AllSingles from '@sport/components/mobile/betList//betListItem/allSingles'
import Parlay from '@sport/components/mobile/betList//betListItem/parlay'
import BetListHeader from '@sport/components/mobile/betList//header'
import SingleItems from '@sport/components/mobile/betList/betting/single'
import BetListFooter from '@sport/components/mobile/betList/footer'
import Total from '@sport/components/mobile/betList/total'
import useTotalStakeAndToWin from '@sport/hooks/useTotalStakeAndToWin'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useSelector } from '@sport/stores'
import { toggleBetList } from '@services/sportGlobal/actions'
import styled from 'styled-components/macro'
import { folds } from '@sport/util/betCalculate'

const SCloseIcon = styled(CloseIcon)`
    path {
        fill: #fff;
    }
`

const BetListBetting: React.FC = () => {
    const serializedCombinedIDList = useSelector((store) => store.sportBet.list)
    const balance = useSelector((store) => store.user.balance)
    const data = useSelector((store) => store.sportBet.data)
    const [totalStake, totalToWin, countOfBet] = useTotalStakeAndToWin()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const toggleBetListCallback = useCallback(() => {
        dispatch(toggleBetList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const oddsList = serializedCombinedIDList.map((serializedCombinedID) => {
        return parseFloat(data?.[serializedCombinedID]?.euOdds)
    })

    const parlayOdds = folds(oddsList)

    const balanceNumber = balance ? parseFloat(balance) : 0

    return (
        <>
            <BetListHeader
                title={t('betList.header')}
                balance={balanceNumber}
                balanceColor={'#84b752'}
                balanceSize={13}
                icon={SCloseIcon}
                buttonOnClick={toggleBetListCallback}
            />
            <SingleItems serializedCombinedIDList={serializedCombinedIDList} />
            {serializedCombinedIDList.length >= 2 && (
                <>
                    <AllSingles />
                    <Parlay parlayOdds={parlayOdds} />
                </>
            )}
            <Total count={countOfBet} toWin={totalToWin} stake={totalStake} />
            <BetListFooter totalStake={totalStake} />
        </>
    )
}

export default React.memo(BetListBetting)
