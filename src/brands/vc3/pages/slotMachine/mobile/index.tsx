import { useState } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import { GameListItem } from '@services/game/type'
import topBanner from '@brand/assets/images/slotMachine/mobile/banner.jpg'
import bannerTitle from '@brand/assets/images/slotMachine/mobile/title-detail@3x.png'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import AppBar from '@components/mobile/appbar'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import GameFilterBar from './gameFilterBar'
import GameItem from './GameItem'
import GameModal from './gameModal'
import GameType from './gameType'
import GamePopUp from './PopUpItem'
import SlotMaintenance from './slotMaintenance'
import SearchBar from '../common/searchBar'
import SMEmptyResult from './sMEmptyResult'

const CPageContainer = styled(PageContainer)`
    padding: 0 16px;
`

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    background-color: #f8f8f8;
`

const STopBanner = styled.div`
    width: 100%;
    min-height: 155px;
    height: 155px;
    position: relative;
    background-image: url(${topBanner});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
`

const STopBannerTitle = styled.div`
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    background-image: url(${bannerTitle});
    background-position: 50% 0%;
    background-repeat: no-repeat;
    background-size: auto 120px;
`

const SSearchBarContainer = styled.div`
    width: 90%;
    height: 33px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 10px auto 11px auto;
    background-color: transparent;
    text-align: center;
`

const SButtonGroup = styled.div`
    width: 100%;
    height: 48px;
    margin: 0 auto 15px auto;
    padding: 0 15px;
    position: relative;
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    overflow: auto;
`

const SContent = styled.div`
    width: 100%;
    padding: 0 2%;
    min-height: 462px;
    height: auto;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`

export default () => {
    const t = useTranslation()
    const {
        supplier,
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
        pageSize: 12,
        isSameCategories: true,
    })
    const [isOpen, setIsOpen] = useState(false)

    const onClickHandler = (game: GameListItem) => {
        setGameItem(game)
    }
    const modalHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <CPageContainer>
            <AppBar backText={t(`general.suppliers.slotmachine.${supplier.toLowerCase()}`)} isBackToHome />
            <FullWidthContainer>
                <SSlotMachineContainer>
                    <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                        <GameType />
                        <STopBanner>
                            <STopBannerTitle />
                            <SSearchBarContainer>
                                <SearchBar
                                    value={keyword}
                                    placeholder={t('slotMachine.searchBar.placeholder')}
                                    onChange={setKeyword}
                                    onSubmit={onSubmitKeyword}
                                />
                            </SSearchBarContainer>
                        </STopBanner>
                        <SlotMaintenance>
                            <SButtonGroup>
                                <GameFilterBar
                                    initialValue={gameCategories[0]}
                                    categories={gameCategories}
                                    onChange={(category) => {
                                        onClickFilter(category.value)
                                    }}
                                />
                            </SButtonGroup>
                            <SContent>
                                {!gameList.length
                                    ? isGameListReady && <SMEmptyResult searchWord={searchResult} />
                                    : gameList.map((item) => (
                                        <GameItem
                                            key={item.name + item.id}
                                            game={item}
                                            onClickHandler={onClickHandler}
                                            onTrial={modalHandler}
                                            onEnter={startEnterGameFlow}
                                        />
                                    ))}
                            </SContent>
                        </SlotMaintenance>
                        {gameItem && (
                            <GameModal isOpen={isOpen} closeButton={modalHandler}>
                                <GamePopUp
                                    game={gameItem}
                                    onTrial={startEnterTrialGameFlow}
                                    onEnter={startEnterGameFlow}
                                    closeModal={modalHandler}
                                />
                            </GameModal>
                        )}
                    </InfiniteScroll>
                </SSlotMachineContainer>
            </FullWidthContainer>
        </CPageContainer>
    )
}
