// import BetFilterSkeletonLoader from 'components/mobile/loader/BetFilterSkeletonLoader';
// import BetMatchSkeletonLoader from 'components/mobile/loader/BetMatchSkeletonLoader';
import React from 'react'

export const MOutright = React.lazy(() => import('@sport/components/mobile/betPanel/betMatchList/betTableOutright'))

export const MFootballBetTableMainMarket = React.lazy(
    () => import('@sport/components/mobile/betPanel/betMatchList/betTableMainMarket/football'),
)

export const MBasketballBetTableMainMarket = React.lazy(
    () => import('@sport/components/mobile/betPanel/betMatchList/betTableMainMarket/basketball'),
)

export const MBaseballBetTableMainMarket = React.lazy(
    () => import('@sport/components/mobile/betPanel/betMatchList/betTableMainMarket/baseball'),
)

export const MTennisBetTableMainMarket = React.lazy(
    () => import('@sport/components/mobile/betPanel/betMatchList/betTableMainMarket/tennis'),
)

export const MBetMatchDetail = React.lazy(() => import('@sport/components/mobile/betPanel/betMatchDetail'))

export const MBetMatchFilter = React.lazy(() => import('@sport/components/mobile/betPanel/betMatchFilter'))
