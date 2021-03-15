import { directToBoardGame } from '@utils/v1Functions'
import useJetso from '@hooks/useJetso'
import bottomBannerImg from '@brand/assets/images/home/mobile/banner.jpg'

const bottomBanner = {
    imgUrl: bottomBannerImg,
    onClick: directToBoardGame,
}

export default () => {
    const { articles, isReady } = useJetso(true)

    return {
        articles,
        isArticlesReady: isReady,
        bottomBanner,
    }
}
