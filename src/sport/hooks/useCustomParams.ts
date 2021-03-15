import { useLocation, useParams } from 'react-router-dom'
import { CustomParamsType, ParamsType, RouteDateType, RouteMarketType, RouteSportType } from '@services/sportMenu/types'

const useCustomParams: () => CustomParamsType = () => {
    const { sports, date, fixtureId, market, page, source, leagueId, matchsStatus } = useParams<ParamsType>()

    const { pathname } = useLocation()
    const isHomePage = pathname.includes('home')
    const isOutrightPage = pathname.includes('outright')
    const isDetailPage = pathname.includes('details')
    const isSelectCompetition = pathname.includes('select-competition') && (leagueId || '').length === 0
    const isBetRecord = pathname.includes('bet-record')
    const isBetMatch = date === 'inplay' || date === 'upcoming' || (leagueId || '').length > 0

    return {
        sports: sports as RouteSportType,
        date: date as RouteDateType,
        fixtureId: fixtureId,
        market: market as RouteMarketType,
        page,
        source,
        leagueId,
        matchsStatus,
        isBetMatch,
        isHomePage,
        isBetRecord,
        isDetailPage,
        isOutrightPage,
        isSelectCompetition,
    }
}

export default useCustomParams
