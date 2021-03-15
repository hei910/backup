import React from 'react'
import { useParams } from 'react-router-dom'
import GameType from './gameType'
import GameItem from './gameItem'
import GameFilterBar from './gameFilterBar'
import Pagination from '@components/desktop/pagination'
import SearchBar from './searchBar'
import Rating from './rating'
import useSlotMachine from '@hooks/useSlotMachine'
import styled from 'styled-components/macro'
import bgImg from '@styles/mixins/backgroundImg'
import BannerImage from '@brand/assets/images/slotMachine/desktop/banner_image.jpg'
import TitleImage from '@brand/assets/images/slotMachine/desktop/title_Slotmachine.png'
import useTranslation from '@hooks/useTranslation'
import SMEmptyResult from '@components/common/sMEmptyResult'
import SlotMaintenance from './slotMaintenance'

const SSlotMachineContainer = styled.div`
    width: 100%;
    min-width: 100%;
    min-height: 100%;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.bgColor};
`
const STopBanner = styled.div`
    ${bgImg(BannerImage, 'auto 100%')}
    min-width: 1280px;
    width: 100%;
    min-height: 290px;
    height: 290px;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.bannerBgColor};
`
const STitle = styled.div`
    ${bgImg(TitleImage)}
    width: 449px;
    height: 87px;
    margin: 0 auto;
    position: relative;
    top: 70px;
`

const SSearchBar = styled.div`
    width: 420px;
    margin: 0 auto;
    position: relative;
    top: 85px;
`

const SContent = styled.div`
    margin: 0 auto;
`

const SGameTypeBackground = styled.div`
    width: 100%;
    background: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.gameTypeBgColor};
`
const SGameTypeWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    border-right: 2px solid ${(props) => props.theme.colors.page.common.slotMachine.gamePage.borderColor};
    border-left: 2px solid ${(props) => props.theme.colors.page.common.slotMachine.gamePage.borderColor};
    max-width: 1280px;
`
const SFilter = styled.div`
    background: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.filterBgColor};
    height: 60px;
    width: 100%;
    padding: 10px 0;
`
const SFilterWrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`

const SAltRow = styled.div`
    width: 100%;
    margin: 26px auto 36px;
    max-width: 1280px;
`
const SGameList = styled.div`
    max-width: 1280px;
    margin: 20px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`

const SLine = styled.div`
    width: 100%;
    max-width: 1280px;
    height: 1px;
    margin: 10px auto;
    background-color: ${(props) => props.theme.colors.page.common.slotMachine.gamePage.borderColor};
`

const SPaginationRow = styled.div`
    width: 100%;
    max-width: 1280px;
    height: 42px;
    margin: 0 auto;
`

const SlotMachine: React.FC<{}> = () => {
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
    } = useSlotMachine({ pageSize: 15 })
    const { gameType } = useParams<Record<string, string>>()

    return (
        <SSlotMachineContainer>
            <STopBanner>
                <STitle />
                <SSearchBar>
                    <SearchBar
                        value={keyword}
                        placeholder={t('slotMachine.searchBar.placeholder')}
                        onChange={setKeyword}
                        onSubmit={onSubmitKeyword}
                    />
                </SSearchBar>
            </STopBanner>
            <SContent>
                <SGameTypeBackground>
                    <SGameTypeWrapper>
                        <GameType />
                    </SGameTypeWrapper>
                </SGameTypeBackground>
                <SlotMaintenance>
                    <SFilter>
                        <SFilterWrapper>
                            <GameFilterBar
                                initialValue={gameCategories[0]}
                                categories={gameCategories}
                                onChange={(category) => {
                                    onClickFilter(category.value)
                                }}
                            />
                        </SFilterWrapper>
                    </SFilter>
                    {gameType === 'hot' && (
                        <SAltRow>
                            <Rating onEnter={startEnterGameFlow} onTrial={startEnterTrialGameFlow} />
                        </SAltRow>
                    )}
                    <SLine />
                    <SGameList>
                        {gameList.length > 0
                            ? gameList.map((item, index) => (
                                <GameItem
                                    key={`GameItem_${item.id}_${index}`}
                                    game={item}
                                    onTrial={startEnterTrialGameFlow}
                                    onEnter={startEnterGameFlow}
                                />
                            ))
                            : isGameListReady && <SMEmptyResult searchWord={searchResult} />}
                    </SGameList>
                    <SPaginationRow>
                        <Pagination currentPage={gamePage} totalPage={totalPage} onChange={onChangePage} withInput />
                    </SPaginationRow>
                </SlotMaintenance>
            </SContent>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
