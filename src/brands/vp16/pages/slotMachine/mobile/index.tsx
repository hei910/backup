/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import GameType from './gameType'
import Dropdown, { IOption } from './dropdown'
import { ValueType } from 'react-select'
import SearchBar from './searchBar'
import GameItem from './gameItem'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import GameModal from './gameModal'
import useSlotMachine from '@hooks/useSlotMachine'
import SMEmptyResult from '@components/common/sMEmptyResult'
import { GameListItem } from '@services/game/type'

import BackgroundImage from '@brand/assets/images/slotMachine/common/background_image.jpg'
import MagIcon from '@brand/assets/images/slotMachine/mobile/magnifier_icon.svg'
import BtnCloseIcon from '@brand/assets/images/slotMachine/mobile/cross_icon.svg'
import useTranslation from '@hooks/useTranslation'
import SlotMaintenance from './slotMaintenance'
const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    background-color: #171717;
`
const SGamePanel = styled.div`
    ${bgImg(BackgroundImage, 'cover')};
    width: 100%;
    min-height: 462px;
    height: auto;
    padding: 17px 0 14px;
`
const SFilterRow = styled.div`
    display: flex;
    width: 100%;
`
const SSearchBarRow = styled(SFilterRow)``

const SMagWrapper = styled.div`
    ${bgImg(MagIcon, 'cover')};
    flex: 2;
    height: 42px;
    background: ${(props) =>
        `linear-gradient(to bottom, ${props.theme.colors.page.common.slotMachine.gamePage.gradientBg1}, ${props.theme.colors.page.common.slotMachine.gamePage.gradientBg2} 93%)`};
`
const SCloseWrapper = styled.div`
    flex: 2;
    height: 42px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.color};
    background: ${(props) =>
        `linear-gradient(to bottom, ${props.theme.colors.page.common.slotMachine.gamePage.gradientBg1}, ${props.theme.colors.page.common.slotMachine.gamePage.gradientBg2} 93%)`};
    display: flex;
    align-items: center;
    justify-content: center;
`
const SCloseIcon = styled.div`
    height: 14px;
    width: 14px;
    ${bgImg(BtnCloseIcon, 'cover')};
    margin-right: 4px;
`
const SMagImg = styled.div`
    ${bgImg(MagIcon, 'contain')};
    width: 21px;
    height: 20.8px;
    filter: invert(100%);
    margin: 12px auto;
`
const SDropDownWrapper = styled.div`
    flex: 8;
`
const SSearchBarWrapper = styled(SDropDownWrapper)``
const NoResultContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 200px;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.noGameText};
`

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
    } = useSlotMachine({
        pageSize: 15,
    })
    const [category, setCategory] = useState<ValueType<IOption>>(gameCategories[0])
    const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClickSearchBarHandler = () => {
        setShowSearchBar(!showSearchBar)
    }
    const onClickHandler = (game: GameListItem | null) => {
        setGameItem(game)
    }
    const modalHandler = () => {
        setIsOpen(!isOpen)
    }

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
        <SSlotMachineContainer>
            <GameType />
            {showSearchBar && (
                <SSearchBarRow>
                    <SCloseWrapper onClick={onClickSearchBarHandler}>
                        <SCloseIcon />
                        <span>关闭</span>
                    </SCloseWrapper>
                    <SSearchBarWrapper>
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                        />
                    </SSearchBarWrapper>
                </SSearchBarRow>
            )}
            {!showSearchBar && (
                <SFilterRow>
                    <SMagWrapper onClick={onClickSearchBarHandler}>
                        <SMagImg />
                    </SMagWrapper>
                    <SDropDownWrapper>
                        <Dropdown value={category} options={gameCategories} onChange={onDropDownChange} />
                    </SDropDownWrapper>
                </SFilterRow>
            )}
            <SlotMaintenance>
                <SGamePanel>
                    <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        {!gameList.length
                            ? isGameListReady && (
                                <NoResultContainer>
                                    <SMEmptyResult searchWord={searchResult} />
                                </NoResultContainer>
                            )
                            : gameList.map((item, index) => (
                                <GameItem
                                    key={`Gameitem_${item.id}-${index}`}
                                    game={item}
                                    current={gameItem}
                                    onClickHandler={onClickHandler}
                                    onImageClick={modalHandler}
                                    onTrial={startEnterTrialGameFlow}
                                    onEnter={startEnterGameFlow}
                                />
                            ))}
                    </InfiniteScroll>
                </SGamePanel>
            </SlotMaintenance>
            {gameItem && <GameModal isOpen={isOpen} game={gameItem} closeButton={modalHandler} />}
        </SSlotMachineContainer>
    )
}

export default SlotMachine
