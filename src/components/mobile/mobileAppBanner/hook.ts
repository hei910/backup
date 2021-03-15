import { useState, useEffect } from 'react'
import {
    directToEsport,
    directToBoardGame,
    directToSport,
    directToFishHunter,
    directToFriendship,
    directToLottery,
    directToSlotMachine,
    directToLiveCasino,
    directToAgentJoin,
    directToDownloadApp,
    directToJetso,
    directToJetsoArticle,
    directToHomePage,
} from '@utils/v1Functions'
import { MobileAppBanner } from '@services/app/types'
import { getMobileAppBanner } from '@services/app/api'

const linksMap: {
    [k: string]: () => void
} = {
    LINK_SPORT: directToSport,
    LINK_LIVE_CASINO: directToLiveCasino,
    LINK_LOTTERY: directToLottery,
    LINK_FISH_HUNTER: directToFishHunter,
    LINK_CASINO: directToLiveCasino,
    LINK_CASINO_COMBINE: directToSlotMachine,
    LINK_PROMOTION: directToJetso,
    LINK_AGENT: directToAgentJoin,
    LINK_SHARE_MONEY: directToFriendship,
    LINK_APP_DOWNLOAD: directToDownloadApp,
    LINK_BOARD_GAME: directToBoardGame,
    LINK_AVIA: directToEsport,
    LINK_MOBILE: directToHomePage,
}

interface IBanner {
    imgUrl: string
    onClick: () => void
}

export default () => {
    const [isShown, setIsShown] = useState(false)
    const [banner, setBanner] = useState<IBanner | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                const res = (await getMobileAppBanner()) as MobileAppBanner

                if (Object.entries(res).length === 0 || res.id === null || res.state === 0) {
                    setIsShown(false)
                } else {
                    if (res.articleId === '0') {
                        setBanner({
                            imgUrl: res.bannerUrl,
                            onClick: linksMap[res.link],
                        })
                    } else if (res.link === '0') {
                        setBanner({
                            imgUrl: res.bannerUrl,
                            onClick: () => directToJetsoArticle(parseInt(res.articleId)),
                        })
                    }
                    setIsShown(true)
                }
            } catch (e) {
                setIsShown(false)
            }
        })()
    }, [])

    return {
        banner,
        isShown,
    }
}
