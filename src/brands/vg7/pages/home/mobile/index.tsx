import GameGridSection from '@components/mobile/gameGridSection'
import JetsoSection from '@components/mobile/jetsoSection'
import BannerSection from '@components/mobile/bannerSection'

import useHome from './hook'

const HomePage: React.FC = () => {
    const { games, isReady, articles, BannerImg, onBannerClick } = useHome()

    return (
        <div>
            <GameGridSection games={games} />
            <JetsoSection isReady={isReady} articles={articles} />
            <BannerSection src={BannerImg} onClick={onBannerClick} />
        </div>
    )
}

export default HomePage
