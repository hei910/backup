import React, { useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import bg from '@brand/assets/images/slotMachine/mobile/bg.jpg'
import { ValueType } from 'react-select'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import GameType from './gameType'
import Dropdown, { IOption } from './dropdown'
import GameItem from './gameItem'
// import GameModal from './gameModal'
// import GamePopUp from './PopUpItem'
import SMEmptyResult from '@components/common/sMEmptyResult'
import Rating from './rating'
import SearchBar from './searchBar'
import SlotMaintenance from './slotMaintenance'
import bgImg from '@mixins/backgroundImg'

const glutter = 2

const SlotMachine = styled.div`
    background-color: #f7f7f7;
    overflow: hidden;
`

const Header = styled.header`
    padding: 44.23% 0 0;
    ${bgImg(bg, 'cover')}
`

const GameTypeContainer = styled.nav`
    background-color: #ffffff;
`

const SearchSection = styled.nav`
    padding: 10px;
    background-color: #ffffff;
`

const Main = styled.main`
    width: auto;
    margin: 0 10px;
`

const Section = styled.section`
    margin: 10px -${glutter}px;
    display: flex;
    flex-wrap: wrap;
`

export default () => {
    const t = useTranslation()
    const { gameType } = useParams<Record<string, string>>()
    const {
        gameList,
        gameCategories,
        keyword,
        setKeyword,
        searchResult,
        onSubmitKeyword,
        onLoadMore,
        hasMore,
        onClickFilter,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 20,
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
            <GameTypeContainer>
                <GameType />
            </GameTypeContainer>
            <SearchSection>
                <Dropdown value={category} options={gameCategories} onChange={onDropDownChange} />
                <SearchBar
                    value={keyword}
                    placeholder={t('slotMachine.searchBar.placeholder')}
                    onChange={setKeyword}
                    onSubmit={onSubmitKeyword}
                />
            </SearchSection>
            {gameType === 'hot' && <Rating onEnter={startEnterGameFlow} onTrial={startEnterTrialGameFlow} />}
            <Main>
                <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                    <Section>
                        <SlotMaintenance>
                            {!gameList.length
                                ? isGameListReady && <SMEmptyResult searchWord={searchResult} />
                                : gameList.map((item) => (
                                    <GameItem
                                        key={item.name + item.id}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                        </SlotMaintenance>
                    </Section>
                </InfiniteScroll>
            </Main>
        </SlotMachine>
    )
}
