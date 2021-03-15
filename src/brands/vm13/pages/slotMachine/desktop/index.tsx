import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import GameType from './gameType'
import GameItem from './gameItem'
import SearchBar from './searchBar'
import GameFilterBar from './gameFilterBar'
import Pagination from '@components/desktop/pagination'
import useSlotMachine from '@hooks/useSlotMachine'
import Footer from '@brand/components/desktop/footer'
import Banner from '@brand/assets/images/slotMachine/desktop/banner.jpg'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useTranslation from '@hooks/useTranslation'
import SlotMaintenance from './slotMaintenance'

const MainContainer = styled.div`
    position: relative;
    min-width: 1366px;
    width: 100%;
    height: 100%;
`

const BannerContainer = styled.div`
    position: relative;
    width: 100%;
    min-height: 345px;
    height: 20%;
    ${bgImg(Banner, 'cover')}
`

const GameTypeContainer = styled.div`
    position: absolute;
    background-color: #1f1f1f;
    bottom: 0;
    width: 100%;
    left: 50%;
    transform: translate(-50%, 0);
`

const GameTypeWrapper = styled.div`
    width: 1280px;
    margin: 0 auto;
`

const GameFilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gameFilterBg};
`

const GameFilterBarContainer = styled.div``

const ContentContainer = styled.div`
    padding: 28px 0;
    width: 100%;
    min-height: calc(100% - 345px - 42px - 118px);
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.contentContainerBg};
`

const PaginationWrapper = styled.div`
    margin-bottom: 20px;
`

const GameContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 60%;
    height: 100%;
    min-width: 1200px;
    padding: 28px 0;
    margin: 0 auto;
`

const NoGameContainer = styled.div`
    text-align: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.noGameText};
`

const SlotMachine: React.FC<{}> = () => {
    const {
        gamePage,
        totalPage,
        keyword,
        setKeyword,
        searchResult,
        onSubmitKeyword,
        gameCategories,
        onClickFilter,
        gameList,
        onChangePage,
        startEnterGameFlow,
        startEnterTrialGameFlow,
        isGameListReady,
    } = useSlotMachine({
        pageSize: 12,
    })

    const t = useTranslation()

    return (
        <MainContainer>
            <BannerContainer>
                <GameTypeContainer>
                    <GameTypeWrapper>
                        <GameType />
                    </GameTypeWrapper>
                </GameTypeContainer>
            </BannerContainer>
            <GameFilterContainer>
                <SearchBar
                    placeholder={t('slotMachine.searchBar.placeholder')}
                    value={keyword}
                    onChange={setKeyword}
                    onSubmit={onSubmitKeyword}
                />
                <GameFilterBarContainer>
                    <GameFilterBar
                        initialValue={gameCategories[0]}
                        categories={gameCategories}
                        onChange={(category) => {
                            onClickFilter(category.value)
                        }}
                    />
                </GameFilterBarContainer>
            </GameFilterContainer>
            <ContentContainer>
                <SlotMaintenance>
                    {gameList.length > 0 ? (
                        <GameContainer>
                            {gameList.map((item, i) => {
                                return (
                                    <GameItem
                                        key={`casino-game-item-${i}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                )
                            })}
                        </GameContainer>
                    ) : (
                        isGameListReady && (
                            <NoGameContainer>
                                <SMEmptyResult searchWord={searchResult} />
                            </NoGameContainer>
                        )
                    )}
                    <PaginationWrapper>
                        <Pagination currentPage={gamePage} totalPage={totalPage} onChange={onChangePage} withInput />
                    </PaginationWrapper>
                </SlotMaintenance>
            </ContentContainer>
            <Footer />
        </MainContainer>
    )
}

export default SlotMachine
