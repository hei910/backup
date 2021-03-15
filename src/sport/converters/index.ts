import { MatchesResponseData, SearchMatchesParams } from '@services/sportData/types'
import { RouteSportType } from '@services/sportMenu/types'
import { apiSportType } from '@sport/util/constant'
import converterSwitcher from './switcher'

const convertData = (sports: RouteSportType, mergedData: MatchesResponseData, lastParams?: SearchMatchesParams) => {
    const marketGroup = lastParams?.marketGroup ?? ''
    const fixtureId = lastParams?.fixtureId ?? ''
    const sportsType = apiSportType[sports]
    const isAmTable = marketGroup === 'am'
    const isDetail = (fixtureId?.length ?? 0) > 0
    const iot = mergedData.iot ? converterSwitcher(sportsType, marketGroup, fixtureId, mergedData.iot) : []
    const not = mergedData.not ? converterSwitcher(sportsType, marketGroup, fixtureId, mergedData.not) : []

    if (isAmTable && !isDetail) {
        return { iot, not }
    } else if (isDetail) {
        return iot.length > 0 ? iot : not
    } else {
        return not
    }
}

const converter = (sports: RouteSportType, lastParams?: SearchMatchesParams, data?: MatchesResponseData) => {
    return !data || !lastParams ? undefined : convertData(sports, data, lastParams)
}

export default converter
