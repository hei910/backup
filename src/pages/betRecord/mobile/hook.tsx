import { useCallback, useState, useMemo, useEffect } from 'react'
import { ITabs, ILazyLoadInfo, ITotals } from './types'
import { IResponseData } from '../types'
import { IOption } from '@components/mobile/dropdown'
import FilterOff from '@brand/assets/images/betRecord/filter_icons_off.png'
import FilterOn from '@brand/assets/images/betRecord/filter_icons_on.png'
import useTranslation from '@hooks/useTranslation'
import useCommonInit, { useInterval } from '../hook'
import { useDispatch } from '@redux'
import { setLayoutVisibility } from '@services/layout/action'

const showPerPageRecord = 100

export default () => {
    const t = useTranslation()
    const dispatch = useDispatch()
    const { startDate, endDate, setStartDate, setEndDate, intervalSelection } = useInterval()
    const TabIndexs: ITabs[] = useMemo(() => {
        return [
            { label: t('betRecord.tableIndexs.today'), value: intervalSelection.today, isActive: true },
            { label: t('betRecord.tableIndexs.yesterday'), value: intervalSelection.yesterday, isActive: false },
            { label: t('betRecord.tableIndexs.week'), value: intervalSelection.week, isActive: false },
            { label: t('betRecord.tableIndexs.month'), value: intervalSelection.month, isActive: false },
            { label: t('betRecord.tableIndexs.custom'), value: 'custom', isActive: false },
        ]
    }, [intervalSelection.month, intervalSelection.today, intervalSelection.week, intervalSelection.yesterday, t])

    const options: IOption[] = useMemo(() => {
        return [
            { label: t('betRecord.options.all'), value: '' },
            { label: t('betRecord.options.sport'), value: 'sportV2,sportV1' },
            { label: t('betRecord.options.bg'), value: 'bg' },
            { label: t('betRecord.options.ag'), value: 'ag' },
            { label: t('betRecord.options.esport'), value: 'esport' },
            { label: t('betRecord.options.mg'), value: 'mg' },
            { label: t('betRecord.options.dt'), value: 'dt' },
            { label: t('betRecord.options.pt'), value: 'pt' },
            { label: t('betRecord.options.pg'), value: 'pg' },
            { label: t('betRecord.options.cq9'), value: 'cq9' },
            { label: t('betRecord.options.jdb'), value: 'jdb' },
            { label: t('betRecord.options.ky'), value: 'ky' },
            { label: t('betRecord.options.loto'), value: 'loto' },
        ]
    }, [t])
    const [Supplier, setSupplier] = useState(options[0])
    const [tabs, setTabs] = useState(TabIndexs)
    const [lazyLoadInfo, setLazyLoadInfo] = useState<ILazyLoadInfo>({
        recordItems: [],
        hasMore: false,
        nextPage: 1,
    })
    const [totals, setTotals] = useState<ITotals>({ sumProfit: 0, sumValidBetAmount: 0, totalRecord: 0 })
    const { getResult, convertData } = useCommonInit()

    const FilterIcon = useMemo(() => {
        return Supplier.value === '' ? FilterOff : FilterOn
    }, [Supplier])

    const resetDate = useCallback(
        (value) => {
            if (value === 'custom') {
                setStartDate(new Date())
                setEndDate(new Date())
            } else {
                setStartDate(value.start)
                setEndDate(value.end)
            }
        },
        [setEndDate, setStartDate],
    )

    const getBetRecord = useCallback(() => {
        getResult({
            startDate: startDate,
            endDate: endDate,
            suppliers: Supplier.value === 'esport' ? '' : Supplier.value,
            gameType: Supplier.value === 'esport' ? 'esport' : '',
            page: 0,
            size: showPerPageRecord,
        }).then((res: IResponseData) => {
            const result = convertData(res?.result)
            setLazyLoadInfo({
                recordItems: result,
                hasMore: res?.hasNextPage,
                nextPage: 1,
            })
            setTotals({
                sumProfit: res?.sumProfit,
                sumValidBetAmount: res?.sumValidBetAmount,
                totalRecord: res?.total,
            })
        })
    }, [Supplier.value, convertData, endDate, getResult, startDate])

    const loadMore = useCallback(() => {
        getResult({
            startDate: startDate,
            endDate: endDate,
            suppliers: Supplier.value === 'esport' ? '' : Supplier.value,
            gameType: Supplier.value === 'esport' ? 'esport' : '',
            page: lazyLoadInfo.nextPage,
            size: showPerPageRecord,
        }).then((res: IResponseData) => {
            const result = convertData(res.result)
            setLazyLoadInfo({
                recordItems: [...lazyLoadInfo.recordItems, ...result],
                hasMore: res.hasNextPage,
                nextPage: lazyLoadInfo.nextPage + 1,
            })
        })
    }, [getResult, startDate, endDate, Supplier.value, convertData, lazyLoadInfo.recordItems, lazyLoadInfo.nextPage])

    const onSelectGameType = useCallback((Selectedvalue) => {
        setSupplier(Selectedvalue)
    }, [])

    const getFinalTabIndexs = useCallback(
        (tabLabel) => {
            const finalTabIndexs = tabs.slice()
            finalTabIndexs.forEach((tab) => {
                if (tab.label === tabLabel) {
                    tab.isActive = true
                } else {
                    tab.isActive = false
                }
            })
            return finalTabIndexs
        },
        [tabs],
    )

    const onTabClick = useCallback(
        (item) => {
            setTabs(getFinalTabIndexs(item.label))
            resetDate(item.value)
        },
        [getFinalTabIndexs, resetDate],
    )

    useEffect(() => {
        if (!tabs[tabs.length - 1].isActive) {
            getBetRecord()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabs, Supplier.value])

    useEffect(() => {
        if (tabs[tabs.length - 1].isActive) {
            getBetRecord()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Supplier.value])

    useEffect(() => {
        if (lazyLoadInfo.hasMore) {
            dispatch(
                setLayoutVisibility({
                    footer: false,
                }),
            )
        } else {
            dispatch(
                setLayoutVisibility({
                    footer: true,
                }),
            )
        }
    }, [lazyLoadInfo.hasMore, dispatch])

    return {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        Supplier,
        tabs,
        onTabClick,
        options,
        onSelectGameType,
        FilterIcon,
        cardData: lazyLoadInfo.recordItems,
        hasMore: lazyLoadInfo.hasMore,
        loadMore,
        getBetRecord,
        totalWinAmount: totals.sumProfit,
        totalValidBetAmount: totals.sumValidBetAmount,
        totalRecord: totals.totalRecord,
    }
}
