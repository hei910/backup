import { useEffect, useState, useCallback, useMemo } from 'react'
import { useSelector } from '@redux'
import dayjs from 'dayjs'
import useCommonInit, { useInterval } from '../hook'
import { useParams } from 'react-router-dom'
import Interval from '@constants/intervals'

const showPerPageRecord = 10

const totalPages = (totalRecord: number) => {
    return Math.ceil(totalRecord / showPerPageRecord)
}

export default () => {
    const { section } = useParams<{ section: string }>()
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        interval,
        setInterval,
        intervalSelection,
        setIntervalDate,
    } = useInterval()
    const [betData, setbetData] = useState([])
    const [page, setPage] = useState(1)
    const [currentSection, setCurrentSection] = useState(section ?? 'summary')
    const [totalAmounts, setTotalAmounts] = useState({
        sumValidBetAmount: 0,
        sumPayoutAmount: 0,
        sumBetAmount: 0,
        sumProfit: 0,
        total: 0,
    })
    const [toggled, setToggled] = useState(true)
    const [pending, setPending] = useState(false)
    const { convertData, getResult } = useCommonInit() //getTotalAmount
    const convertedData = convertData(betData)
    const brandName = useSelector((state) => state?.app?.brandInfo?.brandName)
    const timezone = '-04:00'
    const headerStartDate = dayjs(startDate).startOf('day').format('YYYY年MM月DD日')
    const headerEndDate = dayjs(endDate).format('YYYY年MM月DD日')
    const isSportOrLotto = section?.includes('sport') || section?.includes('lot')
    const splitSupplier = isSportOrLotto ? section.split('-')[1] : ''
    const isSettled = splitSupplier !== undefined ? splitSupplier : ''
    const gameSupplier = useCallback(() => {
        if (section?.includes('sportV') || section?.includes('sports')) {
            return 'sportV1, sportV2'
        } else if (section?.includes('esport') || section === 'all-bet' || section === 'summary') {
            return ''
        } else if (section?.includes('lot')) {
            return 'loto'
        } else {
            return section
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section])

    const haveEarlySettle = useMemo(() => {
        let earlySettle = false
        convertedData.forEach((data) => {
            if (data?.sportsData?.allowEarlySettle === true) {
                earlySettle = true
            }
        })
        return earlySettle
    }, [convertedData])

    const getData = useCallback(
        (startD, endD, pageIndex) => {
            const esportGameType = section?.includes('esport') ? 'esport' : ''
            getResult({
                startDate: startD,
                endDate: endD,
                suppliers: gameSupplier(),
                size: showPerPageRecord,
                page: pageIndex - 1,
                gameType: esportGameType,
                status: isSettled,
            }).then((res) => {
                setbetData(res?.result)
                setPending(false)
                setbetData(res?.result)
                setCurrentSection(section ?? 'summary')
                setTotalAmounts({
                    sumValidBetAmount: res?.sumValidBetAmount,
                    sumPayoutAmount: res?.sumPayoutAmount,
                    sumBetAmount: res?.sumBetAmount,
                    sumProfit: res?.sumProfit,
                    total: res?.total,
                })
            })
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getResult, isSettled],
    )

    const onClickDate = useCallback(
        (interval: Interval) => {
            setIntervalDate(interval)
            setPage(1)
            setPending(true)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [startDate, endDate],
    )

    const onPageChange = useCallback(
        (page) => {
            setPage(page)
            getData(startDate, endDate, page)
        },
        [endDate, getData, startDate],
    )

    const onInitial = useCallback(() => {
        if (interval !== Interval.TODAY) {
            setIntervalDate(Interval.TODAY)
        }
        setPage(1)
        setToggled(true)
        getData(intervalSelection[Interval.TODAY].start, intervalSelection[Interval.TODAY].end, 1)
    }, [getData, interval, intervalSelection, setIntervalDate])

    useEffect(() => {
        onInitial()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section])

    useEffect(() => {
        if (pending) getData(startDate, endDate, 1)
    })
    return {
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        interval,
        setInterval,
        onClickDate,
        currentSection,
        brandName,
        getData,
        convertedData,
        page: page,
        setPage: setPage,
        totalPages: totalPages(totalAmounts.total),
        timezone,
        headerStartDate,
        headerEndDate,
        toggled,
        setToggled,
        onPageChange,
        setbetData,
        haveEarlySettle,

        totalBetAmount: totalAmounts?.sumBetAmount?.toFixed(2),
        totalValidBetAmount: totalAmounts?.sumValidBetAmount?.toFixed(2),
        totalPayoutAmount: totalAmounts?.sumPayoutAmount?.toFixed(2),
        totalNetProfit: totalAmounts?.sumProfit?.toFixed(2),
    }
}
