import styled from 'styled-components/macro'
import InfiniteScroll from '@components/mobile/infiniteScroll'
import backgroundImg from '@styles/mixins/backgroundImg'
import TrialBtn from '@brand/pages/lottery/mobile/trialBtn'
import GameItem from './gameItem'
import BannerImg from '@brand/assets/images/lottery/mobile/banner.jpg'
import useLotteryInit from '@hooks/useLottery' <W54B>W54BW54BW54BW54BW54BW54B0\= B3W</W54B>
import { useSelector } from '@redux'
import AutoWrapContainer from '@components/common/autoWrapContainer'
import AppBar from '@components/mobile/appbar'
import useTranslation from '@hooks/useTranslation'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'

interface IProps {
    showAppBar?: boolean
}

const SGameListContainer = styled.div`
    margin-bottom: 8px;
`

const SBanner = styled.div`
    width: 100%;
    padding: 44.7% 0 0;
    position: relative;
    ${backgroundImg(BannerImg, 'cover')}
`

export default ({ showAppBar } : IProps) => {
    const t = useTranslation();
    const { gameList, hasMore, onLoadMore, startEnterGameFlow, onBtnTryClick } = useLotteryInit({})

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

    return (
        <PageContainer>
            {showAppBar && <AppBar isBackToHome={true} backText={t('lottery.appBarBackText')}/>}
            <FullWidthContainer>
                <SBanner data-qa="imgLotteryBanner">
                    {!isLoggedIn && <TrialBtn onTrial={onBtnTryClick} />}
                </SBanner>
                <InfiniteScroll loadMore={onLoadMore} hasMore={hasMore} threshold={1}>
                    <SGameListContainer>
                        <AutoWrapContainer spaceBetweenItem={0} itemPerRow={3}>
                            {gameList.map((game, index) => {
                                return (
                                    <GameItem
                                        src={game.iconUrl}
                                        gameTitle={game.name}
                                        intervalDesc={game.description}
                                        gameId={game.code.toString()}
                                        qaNum={index + 1}
                                        key={`loto-game-item-${index + 1}`}
                                        onEnter={startEnterGameFlow}
                                    />
                                )
                            })}
                        </AutoWrapContainer>
                    </SGameListContainer>
                </InfiniteScroll>
            </FullWidthContainer>
        </PageContainer>
    )
}
