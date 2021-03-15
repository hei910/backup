import React, { useCallback, useEffect, useState } from 'react'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import { ValueType } from 'react-select'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import GameType from './gameType'
import Dropdown, { IOption } from './dropdown'
import GameItem from './gameItem'
import SMEmptyResult from '@components/common/sMEmptyResult'
import SearchBar from './searchBar'
import styled from 'styled-components/macro'
import img_bg from '@brand/assets/images/slotMachine/mobile/bg.jpg'
import bgImg from '@mixins/backgroundImg'
import SlotMaintenance from './slotMaintenance'

const glutter = 10

const SlotMachine = styled.div`
    ${bgImg(img_bg, '100% auto', 'no-repeat', 'top center')}
    background-color: #0d3653;
    overflow: hidden;
`

const Header = styled.header`
    padding: 28% 0 0;
`

const Main = styled.div`
    margin: 7px 14px;
    padding: 7px 14px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.25);

    hr {
        border: none;
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        margin: 12px -6px;
    }
`

const Section = styled.section`
    margin: 0 -${glutter}px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

export default () => {
    const [showSearchBar, setShowSearchBar] = useState(false)
    const t = useTranslation()
    const {
        gameList,
        gameCategories,
        keyword,
        setKeyword,
        onSubmitKeyword,
        onLoadMore,
        hasMore,
        onClickFilter,
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

    useEffect(() => {
        setCategory(gameCategories[0])
    }, [gameCategories])

    return (
        <SlotMachine>
            <Header />
            <GameType />
            <SlotMaintenance>
                <Main>
                    {showSearchBar ? (
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                            onClose={() => setShowSearchBar(false)}
                        />
                    ) : (
                        <Dropdown
                            onSearchBarOpen={() => setShowSearchBar(true)}
                            value={category}
                            options={gameCategories}
                            onChange={onDropDownChange}
                        />
                    )}
                    <hr />
                    <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        <Section>
                            {!gameList.length
                                ? isGameListReady && <SMEmptyResult searchWord={keyword} />
                                : gameList.map((item) => (
                                    <GameItem
                                        key={item.name + item.id}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                        </Section>
                    </InfiniteScroll>
                </Main>
            </SlotMaintenance>
        </SlotMachine>
    )
}
