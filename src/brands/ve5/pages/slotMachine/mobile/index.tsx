import React from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import bgImg from '@mixins/backgroundImg'
import GameType from './gameType'
import SearchBar from './searchBar'
import GameFilterBar from './gameFilterBar'
import GameItem from './gameItem'
import topBanner from '@brand/assets/images/slotMachine/mobile/banner.jpg'
import topBannerTitle from '@brand/assets/images/slotMachine/mobile/title@3x.png'
import SMEmptyResult from '@components/common/sMEmptyResult'
// import { GameListItem } from '@services/game/type'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import SlotMaintenance from './slotMaintenance'

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    ${bgImg(topBanner, '100%', 'repeat', 'center 0%')};
`

const STopBannerTitle = styled.div`
    width: 100%;
    min-height: 30vw;
    height: 100%;
    position: relative;
    ${bgImg(topBannerTitle, 'auto 60%')}
`

const SContent = styled.div`
    width: 98%;
    min-height: 462px;
    height: auto;
    margin: 0 1%;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
`

const SSearchContainer = styled.div`
    padding: 8px;
    background-color: #ffffff;
`

const GameList = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding: 0 8px;
`

const NoResultContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 200px;
`

const SlotMachine: React.FC<{}> = () => {
    const t = useTranslation()
    const {
        gameList,
        gameCategories,
        onClickFilter,
        keyword,
        setKeyword,
        searchResult,
        onSubmitKeyword,
        onLoadMore,
        hasMore,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 12,
    })

    return (
        <SSlotMachineContainer>
            <STopBannerTitle />
            <SContent>
                <GameType />
                <GameFilterBar
                    initialValue={gameCategories[0]}
                    categories={gameCategories}
                    onChange={(category) => {
                        onClickFilter(category.value)
                    }}
                />
                <SlotMaintenance>
                    <SSearchContainer>
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                        />
                    </SSearchContainer>
                    <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        {!gameList.length ? (
                            isGameListReady && (
                                <NoResultContainer>
                                    <SMEmptyResult searchWord={searchResult} />
                                </NoResultContainer>
                            )
                        ) : (
                            <GameList>
                                {gameList.map((item, index) => (
                                    <GameItem
                                        key={`${item.id}-${index}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                            </GameList>
                        )}
                    </InfiniteScroll>
                </SlotMaintenance>
            </SContent>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
