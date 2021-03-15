import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import GameType from './gameType'
import GameItem from './gameItem'
import SearchBar from './searchBar'
import GameFilterBar from './gameFilterBar'
import topBanner from '@brand/assets/images/slotMachine/desktop/banner.jpg'
import topBannerTitle from '@brand/assets/images/slotMachine/desktop/title@3x.png'
import SMEmptyResult from '@components/common/sMEmptyResult'
import Pagination from '@components/desktop/pagination'
import useSlotMachine from '@hooks/useSlotMachine'
import useTranslation from '@hooks/useTranslation'
// import { GameListItem } from '@services/game/type'
import SlotMaintenance from './slotMaintenance'

const SSlotMachineContainer = styled.div`
    min-width: 1350px;
    width: 100%;
    min-height: 1350px;
    height: 100%;
    ${bgImg(topBanner, 'cover', 'no-repeat', 'center')};
    background-position-y: top;
    background-attachment: fixed;
    position: relative;
`

const STopBannerTitle = styled.div`
    width: 333px;
    height: 66px;
    margin: 10px auto;
    position: relative;
    ${bgImg(topBannerTitle, 'auto 100%')}
`

const SSlotMachineInner = styled.div`
    min-width: 945px;
    width: 98%;
    max-width: 1200px;
    height: auto;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
`

const SContent = styled.div`
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 0 0 24.3px 0;
    border-radius: 13px;
    background-color: #ffffff;
    position: relative;
    overflow: hidden;
`

const SContentHeader = styled.div`
    width: 100%;
    min-height: 166px;
    height: 166px;
    margin: 0 auto;
    position: relative;
`

const SContentHeaderRow = styled.div`
    width: 97%;
    min-height: 115px;
    height: 100%;
    max-height: 122px;
    margin: 0 auto;
    position: relative;
    display: flex;
`

const SGameTypeContainer = styled.div`
    display: flex;
    align-items: flex-end;
    width: 65%;
    height: 100%;
    padding: 0.5% 0 0 0;
    margin: 0 auto 0 0;
    position: relative;
`

const SSearchBarContainer = styled.div`
    width: 33%;
    height: 100%;
    margin: 0 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
`

const SFilterContainer = styled.div`
    width: 100%;
    height: 44px;
    margin: 0 auto;
    position: relative;
`

const GameContainer = styled.div`
    width: 97%;
    margin: 20px auto 0 auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const SlotMachine: React.FC<{}> = () => {
    const t = useTranslation()
    const {
        gameList,
        gameCategories,
        gamePage,
        onChangePage,
        totalPage,
        onClickFilter,
        keyword,
        setKeyword,
        searchResult,
        onSubmitKeyword,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 12,
    })

    return (
        <SSlotMachineContainer>
            {/* <STopBanner /> */}
            <SSlotMachineInner>
                <STopBannerTitle />
                <SContent>
                    <SContentHeader>
                        <SContentHeaderRow>
                            <SGameTypeContainer>
                                <GameType />
                            </SGameTypeContainer>
                            <SSearchBarContainer>
                                <SearchBar
                                    value={keyword}
                                    placeholder={t('slotMachine.searchBar.placeholder')}
                                    onChange={setKeyword}
                                    onSubmit={onSubmitKeyword}
                                />
                            </SSearchBarContainer>
                        </SContentHeaderRow>
                        <SFilterContainer>
                            <GameFilterBar
                                initialValue={gameCategories[0]}
                                categories={gameCategories}
                                onChange={(category) => {
                                    onClickFilter(category.value)
                                }}
                            />
                        </SFilterContainer>
                    </SContentHeader>
                    <SlotMaintenance>
                        <GameContainer>
                            {!gameList.length
                                ? isGameListReady && <SMEmptyResult searchWord={searchResult} />
                                : gameList.map((item, index) => (
                                    <GameItem
                                        key={`${item.id}-${index}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                        </GameContainer>
                        <Pagination currentPage={gamePage} totalPage={totalPage} onChange={onChangePage} withInput />
                    </SlotMaintenance>
                </SContent>
            </SSlotMachineInner>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
