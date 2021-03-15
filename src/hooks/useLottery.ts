import { useEffect, useState, useCallback, useMemo } from 'react'
import { getLotoGameList } from '@services/game/api'
import { LotoGameListItem } from '@services/game/type'
import GameSuppliers from '@constants/gameSuppliers'
import useThirdPartyGame from './useThirdPartyGame'
import LotoRecordImg from '@images/lottery/lotto-record.png'
import usePaginationInit from './usePagination'

const mobilePageSize = 12

const withoutLoading = true

const gameRecord: LotoGameListItem = {
    iconUrl: LotoRecordImg,
    name: '开奖纪录',
    description: '每10分钟赢千元',
    code: 99,
}

const trialGameCode = 51

interface ILottery {
    pageSize?: number
}

export default ({ pageSize }: ILottery) => {
    const [gameList, setGameList] = useState<LotoGameListItem[]>([])
    const { startEnterGameFlow, startEnterTrialGameFlow } = useThirdPartyGame(GameSuppliers.loto)
    const { page, hasMore, totalPage, setPageHasMore, onLoadMore } = usePaginationInit({
        pageSize: mobilePageSize,
        list: gameList,
        setGameList,
        getApiList: getLotoGameList,
        withoutLoading,
    })

    const editedGameList = useMemo(() => {
        return page >= totalPage && process.env.APP_PLATFORM === 'mobile' ? gameList.concat(gameRecord) : gameList
    }, [gameList, page, totalPage])

    const getGameList = useCallback(
        async (newPage?, newPageSize?) => {
            try {
                const { gameList: newGameList, totalPage: newTotalPage } = await getLotoGameList(
                    newPage,
                    newPageSize,
                    withoutLoading,
                )
                setGameList(newGameList)
                setPageHasMore(newTotalPage)
            } catch (error) {
                setGameList([])
                setPageHasMore(1)
            }
        },
        [setPageHasMore],
    )

    const onBtnTryClick = useCallback(
        (gameId: number = trialGameCode) => {
            startEnterTrialGameFlow && startEnterTrialGameFlow(GameSuppliers.loto, gameId.toString())
        },
        [startEnterTrialGameFlow],
    )

    useEffect(() => {
        if (process.env.APP_PLATFORM === 'mobile') {
            getGameList(page, mobilePageSize)
        } else {
            getGameList(0, pageSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return {
        gameList: editedGameList,
        hasMore,
        getGameList,
        onLoadMore,
        startEnterGameFlow,
        onBtnTryClick,
    }
}
