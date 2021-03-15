import { ApiSportType, Seasons } from '@services/sportData/types'
import Converter from './converter'

const converterSwitcher = (sport: ApiSportType, marketGroup: string, fixtureId: string, data: Seasons): any => {
    const isDetailPage = fixtureId && fixtureId?.length > 0

    if (isDetailPage) return new Converter(data, sport).getData()

    switch (marketGroup) {
        // case 'am':
        // case 'all':
        // case 'had':
        // case 'htft':
        // case 'oe':
        // case 'or':
        // case 'tg':
        default:
            return new Converter(data, sport).getData()
    }
}

export default converterSwitcher
