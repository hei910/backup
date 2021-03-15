import React from 'react'
import GameType from './gameType'
import GameItem from './gameItem'
import FilterBar from './gameFilterBar'
import SearchBar from '../common/searchBar'
import useCopyRight from '@hooks/useCopyRight'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import backgroundImg from '@brand/assets/images/slotMachine/desktop/bg.jpg'
import useSlotMachine from '@hooks/useSlotMachine'
import useTranslation from '@hooks/useTranslation'
import Pagination from '@components/desktop/pagination'
import SMEmptyResult from '@components/common/sMEmptyResult'
import SlotMaintenance from './slotMaintenance'

const SSlotMachineContainer = styled.div`
    ${bgImg(backgroundImg, 'auto')}
    background-repeat: no-repeat;
    background-position: 50% 0%;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.mainBgColor};
    min-width: 1280px;
    width: 100%;
    min-height: 100%;
    padding: 154px 0 50px 0;
    position: relative;
`

const SlotWrapper = styled.div`
    max-width: 1280px;
    width: 100%;
    margin: 0 auto;
`

const SGameTypeContainer = styled.div`
    min-width: 1100px;
    width: 100%;
    margin: 0 auto;
`

const SContent = styled.div`
    min-width: 1100px;
    width: 100%;
    margin: 0 auto;
    border-radius: 6px;
    padding: 0 24px;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.contentBgColor};
`
const SFilterSearchBarWrapper = styled.div`
    height: 68px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
`
const SMenuLine = styled.div`
    width: 100%;
    height: 1px;
    opacity: 0.5;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.lineColor};
    margin: 1px auto 14px;
`
const SSearchBarWrapper = styled.div`
    flex: 2;
    margin: 0 0 0 24px;
`
const SFilterWrapper = styled.div`
    flex: 8;
    height: 68px;
    display: flex;
    align-items: center;
`
const SGamePanel = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    height: auto;
    min-height: 300px;
    margin: 20px auto;
`
const SPagination = styled.div`
    width: 100%;
    height: 45px;
    margin: 0 auto;
`
const SCopyRight = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.copyRightColor};
    margin-bottom: 16px;
    font-size: 12px;
`

const NoResultContainer = styled.div`
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.noGameText};
`

const SlotMachine: React.FC<{}> = () => {
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
    const copyRight = useCopyRight()
    const t = useTranslation()

    return (
        <SSlotMachineContainer>
            <SlotWrapper>
                <SGameTypeContainer>
                    <GameType />
                </SGameTypeContainer>
                <SContent>
                    <SlotMaintenance>
                        <SFilterSearchBarWrapper>
                            <SFilterWrapper>
                                <FilterBar
                                    initialValue={gameCategories[0]}
                                    categories={gameCategories}
                                    onChange={(category) => {
                                        onClickFilter(category.value)
                                    }}
                                />
                            </SFilterWrapper>
                            <SSearchBarWrapper>
                                <SearchBar
                                    value={keyword}
                                    placeholder={t('slotMachine.searchBar.placeholder')}
                                    onChange={setKeyword}
                                    onSubmit={onSubmitKeyword}
                                />
                            </SSearchBarWrapper>
                        </SFilterSearchBarWrapper>
                        <SMenuLine />
                        <SGamePanel>
                            {gameList.length > 0
                                ? gameList.map((item, index) => (
                                    <GameItem
                                        key={`GameItem_${item.id}_${index}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))
                                : isGameListReady && (
                                    <NoResultContainer>
                                        <SMEmptyResult searchWord={searchResult} />
                                    </NoResultContainer>
                                )}
                        </SGamePanel>
                        <SPagination>
                            <Pagination
                                currentPage={gamePage}
                                totalPage={totalPage}
                                onChange={onChangePage}
                                withInput
                            />
                        </SPagination>
                    </SlotMaintenance>
                </SContent>
            </SlotWrapper>
            <SCopyRight>{copyRight}</SCopyRight>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
