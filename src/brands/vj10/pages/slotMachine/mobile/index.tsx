import React, { useCallback } from 'react'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import GameType from './gameType'
import GameItem from './gameItem'
import SearchBar from './searchBar'
import GameFilterBar from './gameFilterBar'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useSlotMachine from '@hooks/useSlotMachine'
import useTranslation from '@hooks/useTranslation'
import SlotMaintenance from './slotMaintenance'
import * as S from './styles'
import { GameListItem } from '@brand/services/game/type'

const SlotMachine: React.FC<{}> = () => {
    const t = useTranslation()
    const {
        gameList,
        gameItem,
        setGameItem,
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
    } = useSlotMachine({ pageSize: 12 })

    const onClickHandler = (game: GameListItem) => {
        setGameItem(game)
    }

    const onFilterChange = useCallback(
        (item) => {
            onClickFilter(item.value)
        },
        [onClickFilter],
    )

    return (
        <S.SlotMachine>
            <S.Header />
            <S.Container>
                <GameType />
                <SlotMaintenance>
                    <GameFilterBar
                        initialValue={gameCategories[0]}
                        categories={gameCategories}
                        onChange={onFilterChange}
                    />
                    <SearchBar
                        value={keyword}
                        placeholder={t('slotMachine.searchBar.placeholder')}
                        onChange={setKeyword}
                        onSubmit={onSubmitKeyword}
                    />
                    <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        <S.Section>
                            {!gameList.length
                                ? isGameListReady && (
                                    <S.EmptyContainer>
                                        <SMEmptyResult searchWord={searchResult} />
                                    </S.EmptyContainer>
                                )
                                : gameList.map((item, index) => (
                                    <GameItem
                                        key={`GameItem_${item.id}_${index}`}
                                        game={item}
                                        activeGame={gameItem}
                                        onClickHandler={onClickHandler}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                        </S.Section>
                    </InfiniteScroll>
                </SlotMaintenance>
            </S.Container>
        </S.SlotMachine>
    )
}

export default SlotMachine
