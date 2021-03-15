import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import GameType from './gameType'
import GameItem from './gameItem'
import GameFilterBar from './gameFilterBar'
import SearchBar from './searchBar'
import topBanner from '@brand/assets/images/slotMachine/desktop/banner.jpg'
import topBannerTitle from '@brand/assets/images/slotMachine/desktop/title@3x.png'
import topBannerIcon from '@brand/assets/images/slotMachine/desktop/icon.png'
import Pagination from '@components/desktop/pagination'
import SMEmptyResult from '@components/common/sMEmptyResult'
import useTranslation from '@hooks/useTranslation'
import useSlotMachine from '@hooks/useSlotMachine'
import SlotMaintenance from './slotMaintenance'

const SSlotMachineContainer = styled.div`
    min-width: 100%;
    min-height: 1350px;
    ${bgImg(topBanner, 'cover', 'no-repeat', 'center')}
    background-position-y: top;
    background-attachment: fixed;
`

const STopBannerTitle = styled.div`
    width: 100%;
    height: 145px;
    margin: 10px auto 0 auto;
    position: relative;
    ${bgImg(topBannerTitle, 'auto 100%', 'no-repeat', '7% 50%')}
`

const STopBannerIcon = styled.div`
    width: 100%;
    height: 145px;
    margin: 10px auto 0 auto;
    position: absolute;
    top: 0;
    ${bgImg(topBannerIcon, '60%', 'no-repeat', '100% 50%')};
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
    background-color: transparent;
    position: relative;
    overflow: hidden;
`

const SContentBG = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.7;
    border-radius: 13px;
    box-shadow: 0 3px 6px 0 rgba(97, 97, 97, 0.43);
    background-color: #000000;
    position: absolute;
    top: 155px;
    z-index: 0;
    pointer-events: none;
`

const SContentHeader = styled.div`
    width: 98%;
    min-height: 114px;
    height: 114px;
    margin: 0 auto;
    background-color: transparent;
    position: relative;
`

const SContentHeaderRow = styled.div`
    width: 97%;
    height: 77px;
    margin: 0 auto 0 0;
    position: relative;
    display: flex;
`

const SGameTypeContainer = styled.div`
    width: 65%;
    height: 100%;
    padding: 0.5% 0 0 0;
    margin: 0 auto 0 0;
    position: relative;
`

const SSearchBarContainer = styled.div`
    width: 33%;
    height: auto;
    margin: 0 0 0 auto;
    position: relative;
    display: flex;
    align-items: center;
`

const SFilterContainer = styled.div`
    width: 100%;
    height: 37px;
    margin: 0 auto;
    background-image: linear-gradient(to bottom, #444444, #000000);
    position: relative;
`

const GameContainer = styled.div`
    padding: 25px 25px 0 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    min-height: 700px;
`

const NoResultContainer = styled.div`
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.colors.page.common.slotMachine.noGameText};
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
    } = useSlotMachine({ pageSize: 16 })

    return (
        <SSlotMachineContainer>
            <SSlotMachineInner>
                <STopBannerTitle />
                <STopBannerIcon />
                <SContentBG />
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
                                ? isGameListReady && (
                                    <NoResultContainer>
                                        <SMEmptyResult searchWord={searchResult} />
                                    </NoResultContainer>
                                )
                                : gameList.map((item, index) => (
                                    <GameItem
                                        key={`GameItem_${item.id}_${index}`}
                                        game={item}
                                        onTrial={startEnterTrialGameFlow}
                                        onEnter={startEnterGameFlow}
                                    />
                                ))}
                        </GameContainer>
                        <Pagination
                            currentPage={gamePage}
                            totalPage={totalPage}
                            onChange={onChangePage}
                            // withInput
                        />
                    </SlotMaintenance>
                </SContent>
            </SSlotMachineInner>
        </SSlotMachineContainer>
    )
}

export default SlotMachine
