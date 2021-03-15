import GameGridSection from '@components/mobile/gameGridSection'
import JetsoSection from '@components/mobile/jetsoSection'
import BannerSection from '@components/mobile/bannerSection'
import MobileAppBanner from '@components/mobile/mobileAppBanner'

import useHome from './hook'

const HomePage: React.FC = () => {
    const { games, isReady, articles, BannerImg, onBannerClick } = useHome()

    return (
        <div>
            <GameGridSection games={games} />
            <MobileAppBanner withPadding />
            <JetsoSection isReady={isReady} articles={articles} />
            <BannerSection src={BannerImg} onClick={onBannerClick} />
        </div>
    )
}

export default HomePage
