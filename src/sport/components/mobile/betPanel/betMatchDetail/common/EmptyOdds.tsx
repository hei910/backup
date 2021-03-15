import React from 'react'
import { randomNumber } from '@sport/util/general'
import DetailOddsButton from '../detailOddsButton'

interface ComponentProps {}

const EmptyOdds: React.FC<ComponentProps> = () => {
    const combinedID = {
        ctId: 0,
        fixtureId: `${randomNumber()}`,
        marketId: `${randomNumber()}`,
        outcomeId: `${randomNumber()}`,
    }
    return (
        <>
            <DetailOddsButton active={0} odds={randomNumber()} oddsInfo={combinedID} handicap={''} outcomeName={''} />
        </>
    )
}

export default EmptyOdds
