/* eslint-disable indent */
import React from 'react'
import styled from 'styled-components/macro'
import topBanner from '@brand/assets/images/slotMachine/banner.jpg'
import bannerTitle from '@brand/assets/images/slotMachine/title-detail@3x.png'
import SSlotMachineContainer from '@components/desktop/slotMachine/container'
import useTranslation from '@hooks/useTranslation'
import GameItem from './GameItem'
import GameType from './gameType'
import SlotMaintenance from './slotMaintenance'
import SearchBar from '../common/searchBar'
import SMEmptyResult from './sMEmptyResult'
import GameFilterBar from './gameFilterBar'
import Pagination from '@components/desktop/pagination'
import useSlotMachine from '@hooks/useSlotMachine'

const STopBanner = styled.div`
    min-width: 1280px;
    width: 100%;
    min-height: 333px;
    height: 333px;
    position: relative;
    background-image: url(${topBanner});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
`

const STopBannerTitle = styled.div`
    width: 100%;
    max-width: 1280px;
    height: 100%;
    margin: auto;
    position: relative;
    background-image: url(${bannerTitle});
    background-position: 0% 50%;
    background-repeat: no-repeat;
    background-size: auto 333px;
`

const SContent = styled.div`
    width: 100%;
    min-height: 980px;
    height: auto;
    position: relative;
    background-color: #f8f8f8;
`

const SContentInner = styled.div`
    width: 100%;
    max-width: 1026px;
    height: 100%;
    min-height: 980px;
    margin: auto;
    padding: 45px 0;
    position: relative;
    background-color: #f8f8f8;
`
const SButtonGroup = styled.div`
    width: 100%;
    height: 32px;
    margin: 0 auto 17px 0;
    position: relative;
    background-color: #f8f8f8;
`

const SFilterRow = styled.div`
    margin: 0 auto 46px auto;
    display: flex;
`

const SFilterGroup = styled.div`
    height: 100%;
    flex: 0.7;
`

const SSearchBar = styled.div`
    height: 100%;
    flex: 0.3;
`

const SGamePanel = styled.div`
    /* width: 100%; */
    min-height: 727px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 -12px;
`

const PaginationContainer = styled.div`
    width: 100%;
    margin: 32px 0 0 0;
`

const GameDetail = () => {
    const t = useTranslation()
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
    } = useSlotMachine({ pageSize: 15, isSameCategories: true })

    return (
        <SSlotMachineContainer>
            <STopBanner>
                <STopBannerTitle />
            </STopBanner>
            <SContent>
                <SContentInner>
                    <SButtonGroup>
                        <GameType />
                    </SButtonGroup>
                    <SFilterRow>
                        <SFilterGroup>
                            <GameFilterBar
                                initialValue={gameCategories[0]}
                                categories={gameCategories}
                                onChange={(category) => {
                                    onClickFilter(category.value)
                                }}
                            />
                        </SFilterGroup>
                        <SSearchBar>
                            <SearchBar
                                value={keyword}
                                placeholder={t('slotMachine.searchBar.placeholder')}
                                onChange={setKeyword}
                                onSubmit={onSubmitKeyword}
                            />
                        </SSearchBar>
                    </SFilterRow>
                    <SlotMaintenance>
                        <SGamePanel>
                            {!gameList.length
                                ? isGameListReady && <SMEmptyResult searchWord={searchResult} />
                                : gameList.map((item, index) => {
                                      return (
                                          <GameItem
                                              key={`GameItem_${item.id}`}
                                              index={index}
                                              game={item}
                                              onTrial={startEnterTrialGameFlow}
                                              onEnter={startEnterGameFlow}
                                          />
                                      )
                                  })}
                        </SGamePanel>
                        <PaginationContainer>
                            <Pagination currentPage={gamePage} totalPage={totalPage} onChange={onChangePage} />
                        </PaginationContainer>
                    </SlotMaintenance>
                </SContentInner>
            </SContent>
        </SSlotMachineContainer>
    )
}

export default GameDetail
