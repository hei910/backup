import React from 'react'
import styled from 'styled-components/macro'
import GameType from './gameType'
import bgImg from '@styles/mixins/backgroundImg'
import BackgroundImage from '@brand/assets/images/slotMachine/common/background_image.jpg'
import SSlotMachineContainer from '@components/desktop/slotMachine/container'
import HeaderBackground from '@brand/assets/images/slotMachine/desktop/header_bg.svg'
import FilterBarBackground from '@brand/assets/images/slotMachine/desktop/filter_bar_bg.svg'
import SearchBar from './searchBar'
import GameItem from './gameItem'
import GameFilterBar from './gameFilterBar'
import Pagination from '@components/desktop/pagination'
import useSlotMachine from '@hooks/useSlotMachine'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useTranslation from '@hooks/useTranslation'
import SlotMaintenance from './slotMaintenance'

const SCasino = styled.div`
    ${bgImg(BackgroundImage, 'cover')};
    height: 100%;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const SContent = styled.div`
    box-shadow: 0 5px 15px 0 ${(props) => props.theme.colors.page.common.slotMachine.gamePage.boxShadow};
    min-width: 1260px;
    width: 1260px;
    min-height: 700px;
    padding-bottom: 55px;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.normalBg};
    position: relative;
`
const SHeaderContainer = styled.div`
    ${bgImg(HeaderBackground, 'cover')};
    width: 100%;
    min-width: 1260px;
    min-height: 144px;
    height: 144px;
`
const SGameTypeRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 98px;
    padding: 0 32px;
`
const SGameTypeWrapper = styled.div`
    flex: 7;
    padding: 0 32px;
`
const SSearchBarWrapper = styled.div`
    flex: 3;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`
const SFilterBar = styled.div`
    width: 100%;
    height: 47px;
    ${(props) => bgImg(FilterBarBackground, 'cover')};
    display: flex;
    align-items: center;
    justify-content: center;
`
const SFilterBarInnerWraper = styled.div`
    height: 100%;
    width: 85%;
    display: flex;
    align-items: center;
`
const SGamePanelContainer = styled.div`
    min-height: 455px;
    height: calc(100vh - 230px);
`
const SGamePanel = styled.div`
    padding: 8px 32px;
    height: 100%;
    overflow: auto;
`
const SGameListContainer = styled.div`
    height: auto;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
`

const SPagination = styled.div`
    height: 51px;
    width: 96%;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
`

const EmptyContainer = styled.div`
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.noGameText};
`

const SlotMachine = () => {
    const {
        gameList,
        gameCategories,
        gamePage,
        totalPage,
        keyword,
        setKeyword,
        searchResult,
        onClickFilter,
        onSubmitKeyword,
        onChangePage,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({ pageSize: 15 })
    const t = useTranslation()

    return (
        <SSlotMachineContainer>
            <SCasino>
                <SContent>
                    <SHeaderContainer>
                        <SGameTypeRow>
                            <SGameTypeWrapper>
                                <GameType />
                            </SGameTypeWrapper>
                            <SSearchBarWrapper>
                                <SearchBar
                                    value={keyword}
                                    placeholder={t('slotMachine.searchBar.placeholder')}
                                    onChange={setKeyword}
                                    onSubmit={onSubmitKeyword}
                                />
                            </SSearchBarWrapper>
                        </SGameTypeRow>
                        <SFilterBar>
                            <SFilterBarInnerWraper>
                                <GameFilterBar
                                    initialValue={gameCategories[0]}
                                    categories={gameCategories}
                                    onChange={(category) => {
                                        onClickFilter(category.value)
                                    }}
                                />
                            </SFilterBarInnerWraper>
                        </SFilterBar>
                    </SHeaderContainer>
                    <SGamePanelContainer>
                        <SlotMaintenance>
                            <SGamePanel>
                                <SGameListContainer>
                                    {!gameList.length
                                        ? isGameListReady && (
                                            <EmptyContainer>
                                                <SMEmptyResult searchWord={searchResult} />
                                            </EmptyContainer>
                                        )
                                        : gameList.map((item, index) => (
                                            <GameItem
                                                key={`GameItem_${item.id}_${index}`}
                                                game={item}
                                                onTrial={startEnterTrialGameFlow}
                                                onEnter={startEnterGameFlow}
                                            />
                                        ))}
                                </SGameListContainer>
                                <SPagination>
                                    <Pagination
                                        currentPage={gamePage}
                                        totalPage={totalPage}
                                        onChange={onChangePage}
                                        withInput
                                    />
                                </SPagination>
                            </SGamePanel>
                        </SlotMaintenance>
                    </SGamePanelContainer>
                </SContent>
            </SCasino>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
