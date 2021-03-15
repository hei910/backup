import { useMemo } from 'react'

import AppsImg from '@brand/assets/images/home/mobile/btn_apps.jpg'
import CasinoImg from '@brand/assets/images/home/mobile/btn_casino.jpg'
import ChessImg from '@brand/assets/images/home/mobile/btn_chess.jpg'
import ESportsImg from '@brand/assets/images/home/mobile/btn_esports.png'
import FishHunterImg from '@brand/assets/images/home/mobile/btn_fishhunter.jpg'
import FriendshipsImg from '@brand/assets/images/home/mobile/btn_friendships.jpg'
import LiveImg from '@brand/assets/images/home/mobile/btn_live.jpg'
import LotteryImg from '@brand/assets/images/home/mobile/btn_lottery.jpg'
import SportImg from '@brand/assets/images/home/mobile/btn_sport.jpg'

import BannerImg from '@brand/assets/images/home/mobile/banner.jpg'

import useTranslation from '@hooks/useTranslation'

import {
    directToBoardGame,
    directToCasinoDt,
    directToDownloadApp,
    directToEsport,
    directToFishHunter,
    directToFriendship,
    directToLiveCasino,
    directToLottery,
    directToSport,
} from '@utils/v1Functions'
import useJetso from '@hooks/useJetso'

export default () => {
    const t = useTranslation()
    const { articles, isReady } = useJetso(true)

    const games = useMemo(
        () => [
            {
                image: SportImg,
                text: t('home.sport'),
                onClick: directToSport,
            },
            {
                image: LiveImg,
                text: t('home.liveCasino'),
                onClick: directToLiveCasino,
            },
            {
                image: ESportsImg,
                text: t('home.esport'),
                onClick: directToEsport,
            },
            {
                image: CasinoImg,
                text: t('home.casino'),
                onClick: directToCasinoDt,
            },
            {
                image: ChessImg,
                text: t('home.boardGame'),
                onClick: directToBoardGame,
            },
            {
                image: LotteryImg,
                text: t('home.lottery'),
                onClick: directToLottery,
            },
            {
                image: FishHunterImg,
                text: t('home.fishHunter'),
                onClick: directToFishHunter,
            },
            {
                image: AppsImg,
                text: t('home.appDownload'),
                onClick: directToDownloadApp,
            },
            {
                image: FriendshipsImg,
                text: t('home.friendships'),
                onClick: directToFriendship,
            },
        ],
        [t],
    )

    const onBannerClick = () => {
        directToBoardGame()
    }

    return {
        games,
        isReady,
        articles,
        BannerImg,
        onBannerClick,
    }
}
