import { useCallback, useMemo } from 'react'
import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import topBanner from '@brand/assets/images/slotMachine/mobile/banner.png'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import GameFilterBar from './gameFilterBar'
import GameItem from './GameItem'
import GameType from './gameType'
import SlotMaintenance from './slotMaintenance'
import SearchBar from './searchBar'
import SMEmptyResult from './sMEmptyResult'

const CPageContainer = styled(PageContainer)`
    padding: 0 16px;
`

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 100%;
    background-color: #f5f5f5;
`

const STopBanner = styled.div`
    width: 100%;
    min-height: 122px;
    height: 122px;
    position: relative;
    background-image: url(${topBanner});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
`

const STopBannerTitle = styled.div`
    position: absolute;
    top: 43px;
    right: calc(50% + 52px);
    white-space: nowrap;
    font-size: 23px;
    font-weight: bold;
    color: #ffffff;
`

const GameNavBar = styled.nav`
    transform: translateY(-8px);
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
        gameList,
        gameCategories,
        keyword,
        setKeyword,
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

    const onFilterChange = useCallback(
        (item) => {
            onClickFilter(item.value)
        },
        [onClickFilter],
    )

    const content = useMemo(() => {
        if (gameList.length > 0) {
            return gameList.map((item, i) => (
                <GameItem
                    key={item.name + item.id}
                    index={i + 1}
                    game={item}
                    onTrial={startEnterTrialGameFlow}
                    onEnter={startEnterGameFlow}
                />
            ))
        } else {
            return isGameListReady ? <SMEmptyResult /> : <></>
        }
    }, [gameList, isGameListReady, startEnterGameFlow, startEnterTrialGameFlow])

    return (
        <CPageContainer>
            <FullWidthContainer>
                <SSlotMachineContainer>
                    <STopBanner>
                        <STopBannerTitle>{t('slotMachine.banner')}</STopBannerTitle>
                    </STopBanner>
                    <GameNavBar>
                        <GameType />
                        <GameFilterBar
                            initialValue={gameCategories[0]}
                            categories={gameCategories}
                            onChange={onFilterChange}
                        />
                    </GameNavBar>
                    <SlotMaintenance>
                        <SearchBar
                            value={keyword}
                            placeholder={t('slotMachine.searchBar.placeholder')}
                            onChange={setKeyword}
                            onSubmit={onSubmitKeyword}
                        />
                        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                            <SContent>{content}</SContent>
                        </InfiniteScroll>
                    </SlotMaintenance>
                </SSlotMachineContainer>
            </FullWidthContainer>
        </CPageContainer>
    )
}
