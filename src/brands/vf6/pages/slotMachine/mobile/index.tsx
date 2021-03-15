import { useState } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import { GameListItem } from '@services/game/type'
import topBanner from '@brand/assets/images/slotMachine/banner.jpg'
import bannerTitle from '@brand/assets/images/slotMachine/mobile/title@3x.png'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import AppBar from '@components/mobile/appbar'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import GameFilterBar from './gameFilterBar'
import GameItem from './GameItem'
import GameModal from './gameModal'
import GamePopUp from './PopUpItem'
import GameType from './gameType'
import SlotMaintenance from './slotMaintenance'
import SearchBar from './searchBar'
import SMEmptyResult from './sMEmptyResult'
import { useSelector } from '@redux'

const CPageContainer = styled(PageContainer)`
    padding: 0 16px;
`

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    background-color: #f8f8f8;
`

const SSearchBarContainer = styled.div`
    width: 100%;
    height: 61px;
    padding: 10px 8px 18px 8px;
    background-color: #ffffff;
`

const STopBanner = styled.div`
    width: 100%;
    min-height: 142px;
    height: 142px;
    border-radius: 15px;
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
    position: relative;
    background-image: url(${bannerTitle});
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: auto 100%;
`

const SButtonGroup = styled.div`
    width: 100%;
    height: 48px;
    margin: 12px auto 15px auto;
    padding: 0 15px;
    position: relative;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    overflow: auto;
`

const SContent = styled.div`
    width: 100%;
    padding: 0 3%;
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

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    const onGameItemClick = (game: GameListItem) => {
        setGameItem(game)

        if (isLoggedIn) {
            startEnterGameFlow(game.supplier, game.id)
        } else {
            modalHandler()
        }
    }

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
                        <SSearchBarContainer>
                            <SearchBar
                                value={keyword}
                                placeholder={t('slotMachine.searchBar.placeholder')}
                                onChange={setKeyword}
                                onSubmit={onSubmitKeyword}
                            />
                        </SSearchBarContainer>
                        <STopBanner>
                            <STopBannerTitle />
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
                                    : gameList.map((item, index) => (
                                        <GameItem key={item.name + item.id} game={item} onClick={onGameItemClick} index={index} />
                                    ))}
                            </SContent>
                        </SlotMaintenance>
                        {gameItem && (
                            <GameModal isOpen={isOpen} closeButton={modalHandler}>
                                <GamePopUp
                                    game={gameItem}
                                    onClickHandler={onClickHandler}
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
