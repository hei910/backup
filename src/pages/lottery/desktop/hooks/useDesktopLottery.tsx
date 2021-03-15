import { useCallback, useEffect, useState } from 'react'
import useLottery from '@hooks/useLottery'
import { LotoGameListItem } from '@services/game/type'
import { getLotoDrawResult } from '@services/game/api'
import { IGameDetail } from '@pages/lottery/desktop/types'
import useInterval from './useInterval'
import GameSuppliers from '@constants/gameSuppliers'

interface IDesktopLottery {
    pageSize?: number
    isCustomDrawResult?: boolean
}

export default ({ pageSize = 20, isCustomDrawResult = false }: IDesktopLottery = {}) => {
    const [currentGame, setCurrentGame] = useState<LotoGameListItem>()
    const [gameDetail, setGameDetail] = useState<IGameDetail>({
        gameCode: currentGame?.code,
        interval: 0,
        issue: '--',
        drawResult: [],
        total: '--',
        time: '--',
    })
    const [gameDetails, setGameDetails] = useState<IGameDetail[]>([])

    const { startEnterGameFlow, onBtnTryClick, gameList } = useLottery({ pageSize })
    const { fullInterval, customizedInterval } = useInterval(gameDetail)

    // draw result
    const getDrawResult = useCallback(async () => {
        if (!currentGame) return
        try {
            const result = await getLotoDrawResult(currentGame?.code.toString()!)
            const existResult = result?.length && result[0]

            setGameDetail({
                gameCode: currentGame?.code,
                interval: existResult?.interval,
                issue: existResult?.current,
                drawResult: existResult?.newest.array,
                total: existResult?.total,
                time: existResult?.newest.time.toString(),
            })
        } catch (err) {
            setGameDetail({
                gameCode: currentGame?.code,
                interval: 0,
                issue: '--',
                drawResult: [],
                total: '--',
                time: '--',
            })
        }
    }, [currentGame])

    const getCustomDrawResult = useCallback(async (newGameCodes: string) => {
        if (!newGameCodes) return

        try {
            const result = await getLotoDrawResult(newGameCodes)
            if (result?.length !== 0) {
                const gameDetailsTemp: IGameDetail[] = []
                result.forEach((gameDetailTemp: any) => {
                    const gameDetail = {
                        gameCode: gameDetailTemp.game_code,
                        interval: gameDetailTemp.interval,
                        issue: gameDetailTemp.current,
                        drawResult: gameDetailTemp.newest.array,
                        total: gameDetailTemp.total,
                        time: gameDetailTemp.newest.time.toString(),
                    }
                    gameDetailsTemp.push(gameDetail)
                })
                setGameDetails(gameDetailsTemp)
            }
        } catch (err) {
            setGameDetails([])
        }
    }, [])

    // Change Section Logic
    const handleGameItemClick = useCallback((game) => {
        setCurrentGame(game)
    }, [])

    const onBtnPlayClick = useCallback(
        (gameId?: number) => {
            startEnterGameFlow(GameSuppliers.loto, gameId?.toString() || currentGame?.code.toString())
        },
        [startEnterGameFlow, currentGame],
    )

    useEffect(() => {
        gameList.length > 1 && setCurrentGame(gameList[0])
    }, [gameList])

    useEffect(() => {
        !isCustomDrawResult && getDrawResult()
    }, [isCustomDrawResult, getDrawResult])

    return {
        onBtnTryClick,
        onBtnPlayClick,
        handleGameItemClick,
        getCustomDrawResult,
        gameList,
        currentGame,
        gameDetail,
        gameDetails,
        fullInterval,
        customizedInterval,
    }
}
