/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { getGameList, getPreviewGameList } from '@services/game/api'
import { GameListItem, PreviewGameList } from '@services/game/type'
import { ICategory } from '@components/common/gameFilterBar'
import useSlotMaintenance from '@components/common/slotMaintenance/hook'
import GameSuppliers from '@constants/gameSuppliers'
import { isIos, isUcBrowser } from '@utils/userAgent'
import useSlotMachineCategories from './useSlotMachineCategories'
import useThirdPartyGame from '@hooks/useThirdPartyGame'
import { useParams } from 'react-router-dom'

const slotMachineSuppliers = [
    GameSuppliers.mg,
    GameSuppliers.dt,
    GameSuppliers.jdb,
    GameSuppliers.cq9,
    GameSuppliers.pt,
    GameSuppliers.pg,
]
const exception = [GameSuppliers.hot]
const newDesignBrands = ['vc3', 'vf6']
const initialGamePage = 1
const initialKeyword = ''
const initialFilter = ''

interface SlotMachineProps {
    pageSize?: number | string
    isSameCategories?: boolean
    hasRating?: boolean
}

const checkHasMore = (gamePage: number, totalPage: number, isMaintenance: boolean) => {
    return gamePage < totalPage && !isMaintenance
}

export default ({ pageSize = 12, isSameCategories = false }: SlotMachineProps) => {
    const { supplier = GameSuppliers.hot } = useParams<{ supplier?: GameSuppliers }>()
    const { categories, mgCategories, dtCategories } = useSlotMachineCategories()
    const { startEnterGameFlow, startEnterTrialGameFlow } = useThirdPartyGame(supplier)
    const { supplierMaintenance, isMaintenance } = useSlotMaintenance()

    const [isGameListReady, setIsGameListReady] = useState(false)
    const [gameCategories, setGameCategories] = useState<ICategory[]>(categories)
    const [hasMore, setHasMore] = useState(false)
    const [gamePage, setGamePage] = useState(initialGamePage)
    const [totalPage, setTotalPage] = useState(initialGamePage)
    const [keyword, setKeyword] = useState(initialKeyword)
    const [searchResult, setSearchResult] = useState(initialKeyword)
    const [filter, setFilter] = useState(initialFilter)
    const [gameList, setGameList] = useState<GameListItem[]>([])
    const [gameItem, setGameItem] = useState<GameListItem | null>(null)
    const [pending, setPending] = useState(false)
    const [previewGameList, setPreviewGameList] = useState<GameListItem[]>([])

    const hotSuppliersQuery = useCallback(
        (supplier: GameSuppliers) => {
            const hotSuppliers = slotMachineSuppliers.filter(
                (supplier) => !supplierMaintenance[supplier].isMaintenance && supplier,
            )

            return exception.includes(supplier) ? hotSuppliers.join(',') : supplier
        },
        [supplierMaintenance],
    )

    const updatePreviewGameList = useCallback(async (page?: number) => {
        try {
            const supplierList = await getPreviewGameList(page)
            let newPreviewGameList: GameListItem[] = []
            supplierList.forEach((list: PreviewGameList) => {
                list.gameList.forEach((game: GameListItem) => {
                    newPreviewGameList.push(game)
                })
            })
            setPreviewGameList(newPreviewGameList)
        } catch (error) {
            setPreviewGameList([])
        }
    }, [])

    const updateGameList = useCallback(
        async (newSupplier, page, pageSize, keyword, filter) => {
            const supplier = hotSuppliersQuery(newSupplier)
            setIsGameListReady(false)
            setGameList([])
            try {
                if (!isMaintenance) {
                    const { gameList: newGameList, totalPage: newTotalPage } = await getGameList(
                        supplier,
                        isIos() && isUcBrowser() ? undefined : page,
                        isIos() && isUcBrowser() ? undefined : pageSize,
                        keyword,
                        filter,
                    )
                    const editedGameList = newGameList.slice()
                    editedGameList.forEach((item) => {
                        if (item.score === undefined || item.score === null) {
                            item.score = 9.8
                        }
                    })
                    setGameItem(null)
                    setGameList(editedGameList)
                    process.env.APP_PLATFORM === 'mobile' && setGamePage(1)
                    setTotalPage(newTotalPage)
                    setHasMore(checkHasMore(gamePage, newTotalPage, isMaintenance))
                }
            } catch (error) {
                setGameItem(null)
                setGameList([])
                setGamePage(0)
                setTotalPage(0)
            } finally {
                setIsGameListReady(true)
            }
        },
        [isMaintenance],
    )

    const loadMoreGameList = useCallback(
        async (oldGameList, newSupplier, page, pageSize, keyword, filter) => {
            const supplier = hotSuppliersQuery(newSupplier)
            try {
                const { gameList: newGameList, totalPage: newTotalPage } = await getGameList(
                    supplier,
                    page + 1,
                    pageSize,
                    keyword,
                    filter,
                    true,
                )
                const editedGameList = newGameList.slice()
                editedGameList.forEach((item) => {
                    if (item.score === undefined || item.score === null) {
                        item.score = 9.8
                    }
                })
                setGameList([...oldGameList, ...editedGameList])
                setGamePage(page + 1)
                setTotalPage(newTotalPage)
                setPending(false)
            } catch (error) {
                setGameList([])
                setGamePage(initialGamePage)
                setTotalPage(0)
                setPending(false)
            }
        },
        [gameList],
    )

    const initGamePage = useCallback(() => {
        setPending(true)
        setKeyword(initialKeyword)
        setFilter(initialFilter)
        setGamePage(initialGamePage)
        if (supplier === GameSuppliers.mg && !isSameCategories) {
            setGameCategories(mgCategories)
        } else if (supplier === GameSuppliers.dt && !isSameCategories) {
            setGameCategories(dtCategories)
        } else {
            setGameCategories(_.cloneDeep(categories))
        }
        updateGameList(supplier, initialGamePage, pageSize, initialKeyword, initialFilter)
    }, [categories, supplier, pageSize, updateGameList])

    const onClickFilter = useCallback(
        (filter) => {
            const newFilter = filter || initialFilter

            setFilter(newFilter)
            setGamePage(initialGamePage)
            updateGameList(supplier, initialGamePage, pageSize, initialKeyword, newFilter)
            setKeyword(initialKeyword)
        },
        [supplier, pageSize, updateGameList],
    )

    const onSubmitKeyword = useCallback(() => {
        const newKeyword = keyword.length ? keyword : initialKeyword
        setSearchResult(newKeyword)
        updateGameList(supplier, initialGamePage, pageSize, newKeyword, filter)
    }, [updateGameList, supplier, pageSize, keyword, filter])

    const onChangePage = useCallback(
        (page) => {
            const newGamePage = page
            setGamePage(newGamePage)
            updateGameList(supplier, newGamePage, pageSize, keyword, filter)
        },
        [updateGameList, supplier, pageSize, keyword, filter],
    )

    const onLoadMore = useCallback(() => {
        loadMoreGameList(gameList, supplier, gamePage, pageSize, keyword, filter)
        setHasMore(checkHasMore(gamePage, totalPage, isMaintenance))
    }, [gameList, supplier, gamePage, pageSize, keyword, filter, totalPage])

    useEffect(() => {
        if (supplier === GameSuppliers.hot && newDesignBrands.includes(process.env.BRAND_CODE)) {
            updatePreviewGameList(initialGamePage)
        } else {
            initGamePage()
        }
    }, [supplier, initGamePage, updatePreviewGameList])

    return {
        previewGameList,
        supplier,
        gameCategories,
        setGameCategories,
        gamePage,
        setGamePage,
        totalPage,
        keyword,
        setKeyword,
        searchResult,
        setFilter,
        gameList,
        updateGameList,
        gameItem,
        setGameItem,
        onClickFilter,
        onSubmitKeyword,
        onChangePage,
        onLoadMore,
        hasMore,
        pending,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    }
}
