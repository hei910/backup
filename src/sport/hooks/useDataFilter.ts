import { useEffect, useState } from 'react'
import { useSelector } from '@redux'
import { Matches, MatchesResponseData, Seasons } from '@services/sportData/types'
import { isEmptyObject } from '@sport/util/general'

type SearchField = 'season' | 'team' | 'both'

const useDataFilter = (updateRef: string, searchField: SearchField = 'both', mergedData?: MatchesResponseData) => {
    const searchKeyword = useSelector((state) => state.sportGlobal.searchKeyword)

    const [result, setResult] = useState<MatchesResponseData | undefined>(mergedData)

    const iotData = mergedData?.iot
    const notData = mergedData?.not

    const isMatchKeyword = (value: string) => value.toLowerCase().includes(searchKeyword.toLowerCase())

    const searchData = (seasons: Seasons) =>
        Object.entries(seasons).reduce((filterResult, [seasonkey, season]) => {
            let isMatchSeason = false

            if (searchField === 'season' || searchField === 'both') {
                isMatchSeason = isMatchKeyword(season.info.name)
                if (isMatchSeason) filterResult[seasonkey] = season
            }

            if (!isMatchSeason && (searchField === 'team' || searchField === 'both')) {
                const matchs = Object.entries(season.match).reduce((matchResult, [matchKey, match]) => {
                    const isMatchCompetitors = Object.values(match.events).some((event) => {
                        return (
                            isMatchKeyword(event.competitors?.home?.name ?? '') ||
                            isMatchKeyword(event.competitors?.away?.name ?? '')
                        )
                    })

                    if (isMatchCompetitors) matchResult[matchKey] = match
                    return matchResult
                }, {} as Matches)

                if (!isEmptyObject(matchs)) filterResult[seasonkey] = { ...season, match: matchs }
            }

            return filterResult
        }, {} as Seasons)

    const filterData = () => ({ iot: searchData(iotData ?? {}), not: searchData(notData ?? {}) })

    const setSearchResult = () => setResult(searchKeyword.length > 0 ? filterData() : mergedData)

    useEffect(() => {
        setSearchResult()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKeyword, updateRef, mergedData])

    return result
}

export default useDataFilter
