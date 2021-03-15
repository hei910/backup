import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@redux'
import { mobileDateLookup, MRouteDateType, RouteDateType, RouteSportType, SportItem } from '@services/sportMenu/types'
import useCustomParams from './useCustomParams'

const getAvailableSport = (menuData: SportItem, date: RouteDateType, sports: RouteSportType) => {
    const dateType = mobileDateLookup[date as MRouteDateType]
    const available = Object.entries(menuData).find(([key, menu]) => {
        return menu[dateType] !== 0
    })

    return available ? available[0] : sports
}

const useDefaultSport = () => {
    const { date = 'all', sports = 'football', isHomePage } = useCustomParams()

    const menuData = useSelector((state) => state.sportMenu.data)
    const history = useHistory()

    useEffect(() => {
        if (isHomePage && (date as any) === 'home') {
            history.replace('/sport/home')
        }

        const dateType = date.includes('parlay') ? 'Parlay' : mobileDateLookup[date as MRouteDateType]
        const sportsCount = menuData?.[sports]?.[dateType] ?? 0

        if (!isHomePage && date !== 'all' && sportsCount === 0) {
            const newPath = history.location.pathname.replace(
                /(football|basketball|baseball|tennis)/gm,
                getAvailableSport(menuData, date, sports),
            )
            history.replace(newPath)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [date])
}

export default useDefaultSport
