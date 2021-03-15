import React, { useCallback } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import bgImg from '@mixins/backgroundImg'
import GameType from './gameType'
import GameItem from './gameItem'
import SearchBar from './searchBar'
import GameFilterBar from './gameFilterBar'
import useSlotMachine from '@hooks/useSlotMachine'
import Banner from '@brand/assets/images/slotMachine/mobile/banner.jpg'
import useTranslation from '@hooks/useTranslation'
import { GameListItem } from '@services/game/type'
import SMEmptyResult from '@components/common/sMEmptyResult'
import SlotMaintenance from './slotMaintenance'

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    min-width: 320px;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.contentContainerBg};
`

const BannerContainer = styled.div`
    width: 100%;
    height: 150px;
    ${bgImg(Banner)}

    @media only screen and (min-width: 760px) {
        height: 278px;
    }
`

const SearchContainer = styled.div`
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.mobileSearchBarBg};
    padding: 4px;
`

const GameFilterBarContainer = styled.div`
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.mobileFilterBg};
`

const GameContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 8px;
    margin: 0 auto;
`

const NoGameContainer = styled.div`
    padding: 16px;
    text-align: center;
    color: ${(props) => props.theme.colors.page.common.slotMachine.noGameText};
`

const SlotMachine: React.FC<{}> = () => {
    const t = useTranslation()

    const {
        keyword,
        setKeyword,
        searchResult,
        onSubmitKeyword,
        gameCategories,
        onClickFilter,
        gameList,
        gameItem,
        setGameItem,
        onLoadMore,
        hasMore,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 12,
    })

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
        <MainContainer>
            <BannerContainer />
            <GameType />
            <SlotMaintenance>
                <GameFilterBarContainer>
                    <GameFilterBar
                        initialValue={gameCategories[0]}
                        categories={gameCategories}
                        onChange={onFilterChange}
                    />
                </GameFilterBarContainer>
                <SearchContainer>
                    <SearchBar
                        placeholder={t('slotMachine.searchBar.placeholder')}
                        value={keyword}
                        onChange={setKeyword}
                        onSubmit={onSubmitKeyword}
                    />
                </SearchContainer>
                <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                    {gameList.length > 0 ? (
                        <GameContainer>
                            {gameList.map((item, index) => {
                                return (
                                    <GameItem
                                        key={`${item.id}-${index}`}
                                        game={item}
                                        current={gameItem}
                                        onClickHandler={onClickHandler}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                )
                            })}
                        </GameContainer>
                    ) : (
                        isGameListReady && (
                            <NoGameContainer>
                                <SMEmptyResult searchWord={searchResult} />
                            </NoGameContainer>
                        )
                    )}
                </InfiniteScroll>
            </SlotMaintenance>
        </MainContainer>
    )
}

export default SlotMachine
