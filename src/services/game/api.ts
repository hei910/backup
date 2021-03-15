import call from '@utils/api'
import {
    DepositReminderRes,
    GameBalanceRes,
    GameListResponse,
    PreviewGameListResponse,
    LotoGameListResponse,
} from './type'
import SlotFilters from '@constants/slotFilters'
import GameSuppliers from '@constants/gameSuppliers'
import GameTypes from '@constants/gameTypes'
import { getImgSrc } from '@utils/img'

export const getGameMinBalance = (gameType: string, supplier: string = '') => {
    return call<DepositReminderRes>('GET', `player/game/getDepositReminder`, {
        gameType,
        supplier,
    }).then((res) => res.depositReminder)
}

export const getGameBalance = (supplier: GameSuppliers, gameType?: GameTypes) => {
    return call<GameBalanceRes>(
        'GET',
        `player/game/getBalance`,
        {
            supplier,
            gameType,
        },
        undefined,
        true,
    ).then((res) => res.balance)
}

export const getGameList = (
    suppliers: string = '',
    page?: number,
    pageSize?: number,
    keyword: string = '',
    filter: SlotFilters = SlotFilters.all,
    withoutLoading?: boolean,
) => {
    return call(
        'GET',
        '/info/game/getGameList',
        {
            suppliers,
            page: page ? page - 1 : page,
            pageSize,
            keyword,
            filter,
            platform: process.env.APP_PLATFORM,
        },
        undefined,
        process.env.APP_PLATFORM === 'desktop' ? false : withoutLoading,
    ).then((res: GameListResponse) => {
        res.gameList = res.gameList.map((item) => {
            item.imgUrl = getImgSrc(item.imgUrl)
            return item
        })

        return res
    })
}

export const getPreviewGameList = (page: number = 1) => {
    return call('GET', '/info/game/getPreviewList', {
        page: page - 1,
        platform: process.env.APP_PLATFORM,
    }).then((res: PreviewGameListResponse) => {
        res.previewList = res.previewList.map((list) => {
            list.gameList = list.gameList.map((item) => {
                item.imgUrl = getImgSrc(item.imgUrl)
                return item
            })
            return list
        })

        return res.previewList
    })
}

export const getLotoGameList = (page?: number, pageSize?: number, withoutLoading?: boolean) => {
    return call(
        'GET',
        '/info/game/getGameList',
        {
            suppliers: 'loto',
            page: page,
            pageSize,
            platform: process.env.APP_PLATFORM,
        },
        undefined,
        process.env.APP_PLATFORM === 'desktop' ? false : withoutLoading,
    ).then((res: LotoGameListResponse) => {
        res.gameList = res.gameList
            .map((item) => {
                item.iconUrl = getImgSrc(item.iconUrl)
                return item
            })
            .filter((item) => item?.isShow)

        return res
    })
}

export const getLotoDrawResult = (gameId: string) => {
    return call(
        'GET',
        '/info/game/loto/getLotteryDrawResult',
        {
            gameId,
        },
        undefined,
    ).then((res) => {
        return res
    })
}
