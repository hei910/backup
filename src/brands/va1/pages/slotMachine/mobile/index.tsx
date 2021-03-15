import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import GameType from './gameType'
import GameItem from './gameItem'
import Dropdown, { IOption } from './dropdown'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import topBanner from '@brand/assets/images/slotMachine/mobile/banner.jpg'
import { ValueType } from 'react-select'
import SearchBar from './searchBar'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useSlotMachine from '@hooks/useSlotMachine'
import Rating from './rating'
import SlotMaintenance from './slotMaintenance'
import useTranslation from '@hooks/useTranslation'

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    background-color: #f8f8f8;
`

const STopBanner = styled.div`
    width: 100%;
    min-height: 160px;
    height: 160px;
    position: relative;
    ${bgImg(topBanner, 'auto 100%')}
    background-color: #1155b6;
`

const DropdownContainer = styled.div`
    margin-bottom: 4px;
`

const SSearchContainer = styled.div`
    padding: 8px;
    background-color: #ffffff;
`

const LineContainer = styled.div`
    padding: 8px;
`

const Line = styled.hr`
    background-color: #969696;
    opacity: 0.2;
`

const SContent = styled.div`
    width: 100%;
    min-height: 462px;
    height: auto;
    position: relative;
`

const GameListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 8px;
    margin: 0 auto;
`

const NoResultContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 200px;
`

const SlotMachine: React.FC<{}> = () => {
    const {
        supplier,
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
    const [category, setCategory] = useState<ValueType<IOption>>(gameCategories[0])
    const onDropDownChange = useCallback(
        (item) => {
            setCategory(item)
            onClickFilter(item.value)
        },
        [onClickFilter],
    )
    const t = useTranslation()

    useEffect(() => {
        setCategory(gameCategories[0])
    }, [gameCategories])

    return (
        <SSlotMachineContainer>
            <STopBanner />
            <SContent>
                <GameType />
                <SlotMaintenance>
                    <SSearchContainer>
                        <DropdownContainer>
                            <Dropdown value={category} options={gameCategories} onChange={onDropDownChange} />
                        </DropdownContainer>
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                        />
                    </SSearchContainer>
                    {supplier === 'hot' && <Rating onEnter={startEnterGameFlow} onTrial={startEnterTrialGameFlow} />}
                    <LineContainer>
                        <Line />
                    </LineContainer>
                    <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        {gameList.length > 0 ? (
                            <GameListContainer>
                                {gameList.map((item, index) => (
                                    <GameItem
                                        key={`${item.id}-${index}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                            </GameListContainer>
                        ) : (
                            isGameListReady && (
                                <NoResultContainer>
                                    <SMEmptyResult searchWord={searchResult} />
                                </NoResultContainer>
                            )
                        )}
                    </InfiniteScroll>
                </SlotMaintenance>
            </SContent>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
