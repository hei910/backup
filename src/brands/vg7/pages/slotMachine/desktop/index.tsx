import React from 'react'
import GameType from './gameType'
import GameItem from './gameItem'
import SearchBar from './searchBar'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import Rating from './rating'
import BackgroundBanner from '@brand/assets/images/slotMachine/desktop/bg_banner.png'
import GameFilterBar from './gameFilterBar'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import Pagination from '@components/desktop/pagination'
import SlotMaintenance from './slotMaintenance'
import SMEmptyResult from '@components/common/sMEmptyResult'

const SSlotMachineContainer = styled.div`
    ${bgImg(BackgroundBanner)}
    background-position-x: center;
    background-position-y: top;
    background-size: initial;
    width: 100%;
    /* height: 100%; */
    min-width: 100%;
`
const SGameTypeRow = styled.div`
    width: 100%;
    max-width: 1360px;
    height: 273px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 0 auto;
`
const SGameTypeWrapper = styled.div`
    width: 500px;
    height: 100%;
`
const SFilterSearchBarRow = styled.div`
    height: 59px;
    box-shadow: 0px 1px 0 0 ${(props) => props.theme.colors.page.common.slotMachine.gamePage.searchBar.boxShadow};
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.searchBar.bgColor};
    display: flex;
    align-items: center;
    justify-content: center;
`
const SFilterWrapper = styled.div`
    width: 900px;
    height: 100%;
    margin-right: 92px;
`
const SSearchBarWrapper = styled.div`
    width: 350px;
`
const SGamePanel = styled.div`
    width: 1300px;
    margin: 28px auto 0 auto;
    height: 100%;
`

const SLine = styled.div`
    width: 1300px;
    height: 1px;
    margin: 30px 1px 30px 0;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.lineColor};
`
const SGameList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
`

const SPaginationRow = styled.div`
    width: 100%;
    max-width: 1300px;
    height: 38px;
    margin: 16px auto 32px;
    text-align: center;
`

const SlotMachine: React.FC<{}> = () => {
    const t = useTranslation()
    const {
        supplier,
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

    return (
        <SSlotMachineContainer>
            <SGameTypeRow>
                <SGameTypeWrapper>
                    <GameType />
                </SGameTypeWrapper>
            </SGameTypeRow>
            <SlotMaintenance>
                <SFilterSearchBarRow>
                    <SFilterWrapper>
                        <GameFilterBar
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
                </SFilterSearchBarRow>
                <SGamePanel>
                    {supplier === 'hot' && <Rating onTrial={startEnterTrialGameFlow} onEnter={startEnterGameFlow} />}
                    <SLine />
                    <SGameList>
                        {gameList.length > 0
                            ? gameList.map((item, index) => (
                                <GameItem
                                    key={`GameItem-${item.id}-${index}`}
                                    game={item}
                                    onTrial={startEnterTrialGameFlow}
                                    onEnter={startEnterGameFlow}
                                />
                            ))
                            : isGameListReady && <SMEmptyResult searchWord={searchResult} />}
                    </SGameList>
                </SGamePanel>
                <SPaginationRow>
                    <Pagination currentPage={gamePage} totalPage={totalPage} onChange={onChangePage} withInput />
                </SPaginationRow>
            </SlotMaintenance>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
