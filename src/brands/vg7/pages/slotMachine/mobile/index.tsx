import { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import GameType from './gameType'
import GameItem from './gameItem'
import Dropdown, { IOption } from './dropdown'
import Rating from './rating'
import SearchBar from './searchBar'
import * as S from './styles'
import SlotMaintenance from './slotMaintenance'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useSlotMachine from '@hooks/useSlotMachine'
import useTranslation from '@hooks/useTranslation'
import { ValueType } from 'react-select'

export default () => {
    const {
        supplier,
        gameList,
        gameCategories,
        keyword,
        setKeyword,
        searchResult,
        onClickFilter,
        onSubmitKeyword,
        onLoadMore,
        hasMore,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 12,
    })
    const t = useTranslation()
    const [category, setCategory] = useState<ValueType<IOption>>(gameCategories[0])
    const onDropDownChange = useCallback(
        (item) => {
            setCategory(item)
            onClickFilter(item.value)
        },
        [onClickFilter],
    )

    useEffect(() => {
        setCategory(gameCategories[0])
    }, [gameCategories])

    return (
        <S.SlotMachine>
            <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                <S.Header />
                <S.Nav>
                    <GameType />
                </S.Nav>
                <SlotMaintenance>
                    <S.Nav2>
                        <Dropdown value={category} options={gameCategories} onChange={onDropDownChange} />
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                        />
                    </S.Nav2>
                    {supplier === 'hot' && <Rating onEnter={startEnterGameFlow} onTrial={startEnterTrialGameFlow} />}
                    <S.Main>
                        <S.Section>
                            {!gameList.length
                                ? isGameListReady && <SMEmptyResult searchWord={searchResult} />
                                : gameList.map((item) => {
                                    return (
                                        <GameItem
                                            key={`GameItem_${item.id}`}
                                            game={item}
                                            onTrial={startEnterTrialGameFlow}
                                            onEnter={startEnterGameFlow}
                                        />
                                    )
                                })}
                        </S.Section>
                    </S.Main>
                </SlotMaintenance>
            </InfiniteScroll>
        </S.SlotMachine>
    )
}
