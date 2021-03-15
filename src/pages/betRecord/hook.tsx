import { useState, useCallback } from 'react'
import { IData, IConvertedData, IBetData, IParams, IIntervalSelection, IEarlySettleParams } from './types'
import dayjs from 'dayjs'
import call from '@utils/api'
import { countTimeZone } from '@utils/time'
import { convertSportV1Detail, convertEsportDetail } from '../betRecord/convertor'
import useTranslation from '@hooks/useTranslation'
import Interval from '@constants/intervals'

export default () => {
    const t = useTranslation()
    const [isEarlyBetModalOpen, setIsEarlyBetModalOpen] = useState<boolean>(false)
    const [earlySettleStatus, setEarlySettleStatus] = useState<boolean>(false)
    const [earlySettleOdds, setEarlySettleOdds] = useState<number>(0)
    // const [earlySettleMock, setEarlySettleMock] = useState('')
    const getTotalAmount = (data: IData[] | IConvertedData[], type: string) => {
        let total = 0
        data?.forEach((d: IData | IConvertedData) => {
            if (d.processed !== null && !d.processed && type === 'netProfit') {
                total = total + 0
            } else if (type === 'betAmount' && d.betAmount !== undefined && d.betAmount !== null) {
                total = total + d.betAmount
            } else if (type === 'payoutAmount' && d.payoutAmount !== undefined && d.payoutAmount !== null) {
                total = total + d.payoutAmount
            } else if (
                type === 'validBetAmount' &&
                d.validBetAmount !== undefined &&
                d.validBetAmount !== null &&
                !d.cancelled
            ) {
                total = total + d.validBetAmount
            } else if (type === 'netProfit' && d.netProfit !== undefined && d.netProfit !== null && d.processed) {
                total = total + d.netProfit
            }
        })
        return total
    }

    const convertData = (data: IData[]): IConvertedData[] => {
        if (data === undefined || data.length === 0) {
            return []
        }
        return data.map((game) => {
            const { gameDetail, cancelled, processed, netProfit, ...newGame } = game
            const isV1 = game.gameSupplier === 'sportV1'
            const isV2 = game.gameSupplier === 'sportV2'
            const isEsport = game.gameSupplier === 'avia'
            const needConversion = isV1 || isV2 || isEsport
            const v2GamePlayName =
                game.gamePlayName !== null ? game.gamePlayName.replace('X', `${t('betRecord.parlay')}`) : ''
            const matchCount = (isV1 && game.gameDetail?.matchCount) || 1 // v1
            const numberOfMatchV1 = matchCount > 1 ? matchCount + t('betRecord.match') : '' // v1
            const convertType: any = {
                // to be continue
                sportv1: convertSportsData,
                sportv2: convertSportsData,
                avia: convertEsportDetail,
            }
            const newComboGamePlayName = () => {
                if (game.gameSupplier === 'sportV2') {
                    if (
                        game?.gamePlayName !== null &&
                        game?.gameDetail?.betData !== undefined &&
                        game?.gameDetail?.betData.length > 0
                    ) {
                        return convertV2GamePlayName(game, v2GamePlayName)
                    } else {
                        return ''
                    }
                } else if (game.gameSupplier === 'avia' && game?.gameDetail !== null) {
                    if (game.gameDetail?.gameCombo === '0x1' || game.gameDetail?.gameCombo === '1x1') {
                        return game.gameTypeName
                    } else {
                        return `${game.gameDetail?.gameCombo?.replace(/x/gi, t('general.betRecord.parlay'))}`
                    }
                } else if (game.gameSupplier === 'sportV1') {
                    return `${numberOfMatchV1}${game.gamePlayName}`
                } else {
                    return ''
                }
            }

            return {
                ...newGame,
                sportsData: needConversion ? convertType[game.gameSupplier.toLowerCase()](game) : null,
                comboGamePlayName: newComboGamePlayName(),
                mobileParlayTitle:
                    (isV2 || isV1) && game.gameDetail !== null && game.gamePlayName !== null
                        ? convertParlayTitle(game, v2GamePlayName)
                        : null,
                cancelled: cancelled !== undefined ? cancelled : null,
                processed: processed !== undefined ? processed : null,
                netProfit: netProfit !== undefined ? netProfit : 0,
                betAllowEarlySettle: true,
            }
        })
    }
    const convertV2GamePlayName = (game: IData, v2GamePlayName: string) => {
        const { gameDetail, gamePlayName } = game
        const gameComposition = () => {
            if (gameDetail !== null && gameDetail !== undefined && gameDetail.composition !== undefined) {
                if (gameDetail.composition.length === 1) {
                    return t('betRecord.single')
                } else if (gameDetail.composition.length > 1) {
                    return t('betRecord.combo')
                } else {
                    return ''
                }
            } else {
                return ''
            }
        }
        if (gameDetail?.betData !== undefined && gameDetail?.betData.length > 1) {
            return `${gameDetail.numMatch}${t('betRecord.match')}${gameComposition()}${v2GamePlayName}`
        } else {
            return gamePlayName
        }
    }

    const convertParlayTitle = (game: IData, v2GamePlayName: string) => {
        const { gamePlayName, gameTypeName, betAmount, gameDetail, gameSupplier } = game
        const parlayNumber = gamePlayName !== null ? gamePlayName.split('')[gamePlayName.length - 1] : ''
        const betAmountNumber = betAmount / Number(parlayNumber)
        const v1GamePlayName = gamePlayName?.split(' ')[1] ?? gamePlayName?.split('式')[1] ?? `${gameDetail?.mCount}串1`
        const v1betAmountNumber = gameTypeName !== null && Number(gameTypeName.split('x')[1]).toFixed(0)
        const v1ParlayNumber = gameTypeName !== null && Number(gameTypeName.split('x')[0])
        if (
            (gameDetail?.betData !== undefined && gameDetail?.betData.length === 1) ||
            (gameDetail?.betSportDetailEntities !== undefined && gameDetail?.betSportDetailEntities.length === 1)
        ) {
            return null
        } else {
            if (gameSupplier === 'sportV2') {
                return `${v2GamePlayName} ${parlayNumber}X${betAmountNumber}`
            } else {
                return `${v1GamePlayName} ${v1ParlayNumber}X${v1betAmountNumber}`
            }
        }
    }
    const convertSportsData = (game: IData) => {
        const { gameDetail, gameSupplier } = game
        if (gameDetail === null || gameDetail === undefined) {
            return null
        } else if (gameSupplier === 'sportV2' && gameDetail.betData) {
            return {
                estimatedWinnings: gameDetail?.estimatedWinnings as any,
                sportsDetail: convertSportV2Detail(gameDetail.betData),
            }
        } else if (gameSupplier === 'sportV1' && game) {
            return convertSportV1Detail(game)
        } else {
            return null
        }
    }

    const convertSportV2Detail = (sport: IBetData[]) => {
        return sport.map((detail) => {
            const {
                id,
                fixtureId,
                outcomeId,
                resultOddsNumerator,
                resultOddsDenominator,
                isEnded,
                source,
                metadata,
                voidReason,
                matchResult,
                marketCode,
                outcomeCode,
                description,
                live,
                liveScore,
                ctid,
                ...newDetail
            } = detail
            return {
                ...newDetail,
            }
        })
    }

    const getResult = ({
        startDate,
        endDate,
        suppliers,
        gameType,
        page = 0,
        size = 999999,
        sort = 'betDateTime,desc',
        status,
    }: IParams) => {
        const start = dayjs(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
        const end = dayjs(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
        return call('GET', '/player/betRecord/search', {
            startDt: start,
            endDt: end,
            gameType,
            suppliers,
            page,
            size,
            sort,
            status,
        })
    }

    const postEarlySettleMock = ({ rowId, masterId }: IEarlySettleParams) => {
        return call('POST', `/player/earlySettleMock2?rowId=${rowId}&masterId=${masterId}`)
    }

    const postEarlySettle = ({ rowId, masterId }: IEarlySettleParams) => {
        return call('POST', `/player/earlySettle2?rowId=${rowId}&masterId=${masterId}`)
    }

    const onClickEarlySettleMock = useCallback(({ rowId, masterId }: IEarlySettleParams) => {
        setIsEarlyBetModalOpen(true)
        const earlySettleParams = { rowId, masterId }
        postEarlySettleMock(earlySettleParams).then((res) => {
            setEarlySettleStatus(res?.success)
            if (res?.success) {
                setEarlySettleOdds(res?.earlySettleOdds)
            }
        })
    }, [])

    const onClickEarlySettle = useCallback(
        ({ rowId, masterId }: IEarlySettleParams) => {
            const earlySettleParams = { rowId, masterId }
            setIsEarlyBetModalOpen(false)
            if (earlySettleOdds > 0) {
                postEarlySettle(earlySettleParams).then((res) => {
                    console.log(res)
                })
            }
        },
        [earlySettleOdds],
    )

    const onClickModalHandler = () => {
        setIsEarlyBetModalOpen(!isEarlyBetModalOpen)
    }
    return {
        getTotalAmount,
        convertData,
        getResult,
        onClickEarlySettleMock,
        isEarlyBetModalOpen,
        earlySettleStatus,
        earlySettleOdds,
        onClickEarlySettle,
        // setIsEarlyBetModalOpen,
        onClickModalHandler,
        // earlySettleMock,
    }
}

export const useInterval = () => {
    const countInterval = (days: number) => countTimeZone(new Date(new Date().setDate(new Date().getDate() + days)))
    const now = countTimeZone(new Date())
    const tomorrow = countInterval(1)
    const yesterday = countInterval(-1)
    const week = countInterval(-6) // last 7 days
    const month = countInterval(-29) // last 30 days
    const startTS = new Date(dayjs(now).startOf('day').valueOf())
    const endTS = new Date(dayjs(now).endOf('day').valueOf())
    // eslint-disable-next-line
    const intervalSelection: IIntervalSelection = {
        [Interval.TODAY]: {
            start: startTS,
            end: endTS,
        },
        [Interval.TOMORROW]: {
            start: new Date(dayjs(tomorrow).startOf('day').valueOf()),
            end: new Date(dayjs(tomorrow).endOf('day').valueOf()),
        },
        [Interval.YESTERDAY]: {
            start: new Date(dayjs(yesterday).startOf('day').valueOf()),
            end: new Date(dayjs(yesterday).endOf('day').valueOf()),
        },
        [Interval.WEEK]: {
            start: new Date(dayjs(week).startOf('day').valueOf()),
            end: endTS,
        },
        [Interval.MONTH]: {
            start: new Date(dayjs(month).startOf('day').valueOf()),
            end: endTS,
        },
    }
    const [startDate, setStartDate] = useState(startTS)
    const [endDate, setEndDate] = useState(endTS)
    const [interval, setInterval] = useState(Interval.TODAY)

    const setIntervalDate = useCallback(
        (interval: Interval) => {
            const newStartDate = intervalSelection[interval].start
            const newEndDate = intervalSelection[interval].end
            setStartDate(newStartDate)
            setEndDate(newEndDate)
            setInterval(interval)
        },
        [intervalSelection],
    )

    return { startDate, endDate, setStartDate, setEndDate, interval, setInterval, intervalSelection, setIntervalDate }
}
