import { useState, useCallback } from 'react'
import { LotoGameListItem, GameListItem, LotoGameListResponse, GameListResponse } from '@services/game/type'

type TList = (GameListItem | LotoGameListItem)[]
interface IPagination {
    pageSize: number
    list: TList
    setGameList: (arg0: any) => void
    getApiList: (
        page?: number | undefined,
        pageSize?: number | undefined,
        withoutLoading?: boolean | undefined,
        supplier?: string,
        keyword?: string,
        filter?: string,
    ) => Promise<LotoGameListResponse | GameListResponse>
    withoutLoading: boolean
}

interface ILazyLoadInfo {
    page: number
    hasMore: boolean
    totalPage: number
}

const initLazyLoadInfo = { page: 0, hasMore: false, totalPage: 1 }

export default ({ pageSize, list, setGameList, getApiList, withoutLoading }: IPagination) => {
    const [lazyLoadInfo, setLazyLoadInfo] = useState<ILazyLoadInfo>(initLazyLoadInfo)

    const setPageHasMore = useCallback(
        (totalPage) => {
            setLazyLoadInfo({
                page: lazyLoadInfo.page + 1,
                hasMore: lazyLoadInfo.page < totalPage - 1,
                totalPage: totalPage,
            })
        },
        [lazyLoadInfo.page],
    )

    const onLoadMore = useCallback(async () => {
        try {
            if (lazyLoadInfo.hasMore) {
                const { gameList: newGameList, totalPage: newTotalPage } = await getApiList(
                    lazyLoadInfo.page,
                    pageSize,
                    withoutLoading,
                )
                setGameList([...list, ...newGameList])
                setPageHasMore(newTotalPage)
            }
        } catch (error) {
            setGameList([])
            setLazyLoadInfo(initLazyLoadInfo)
        }
    }, [
        getApiList,
        lazyLoadInfo.hasMore,
        lazyLoadInfo.page,
        list,
        pageSize,
        setGameList,
        setPageHasMore,
        withoutLoading,
    ])

    return {
        page: lazyLoadInfo.page,
        hasMore: lazyLoadInfo.hasMore,
        totalPage: lazyLoadInfo.totalPage,
        setPageHasMore,
        onLoadMore,
    }
}
