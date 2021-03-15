import React from 'react'
import styled from 'styled-components/macro'

import coverSport from '@brand/assets/images/home/a.png'
import coverLiveCasino from '@brand/assets/images/home/b.png'
import coverCard from '@brand/assets/images/home/c.png'
import coverESport from '@brand/assets/images/home/d.png'
import coverLottery from '@brand/assets/images/home/e.png'
import coverFish from '@brand/assets/images/home/f.png'
import {
    directToBoardGame,
    directToEsport,
    directToFishHunter,
    directToLiveCasino,
    directToLottery,
    directToSport,
} from '@utils/v1Functions'

const SLayout = styled.div``

const SHeader = styled.div`
    display: flex;
    align-items: center;
`

const SHeaderText = styled.div`
    line-height: 36px;
    font-weight: 800;
    font-size: 28px;
`

const SLiveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px rgba(242, 242, 242, 0.6);
    background-image: linear-gradient(to bottom, #d2b497, #f4dfc8);
    margin-left: 20px;
    border-radius: 15px;
    color: #0c186c;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 16px;
`

const SCollectionLayout = styled.div``

const SGameRowLayout = styled.div`
    display: flex;
    justify-content: space-between;
`

const SGameLayout = styled.div`
    display: flex;
    flex-direction: column;
    cursor: pointer;
`

const SGameCover = styled.img`
    width: 275px;
    height: 175.2px;
`

const SGameText = styled.div`
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
`

const TopGame = () => {
    const gameItems1 = [
        {
            image: coverSport,
            action: directToSport,
            text: '体育赛事',
            dataQa: 'btnTopGamesSport',
        },
        {
            image: coverLiveCasino,
            action: directToLiveCasino,
            text: '真人游戏',
            dataQa: 'btnTopGamesLive',
        },
        {
            image: coverCard,
            action: directToBoardGame,
            text: '棋牌游戏',
            dataQa: 'btnTopGamesBoard',
        },
    ]

    const gameItems2 = [
        {
            image: coverESport,
            action: directToEsport,
            text: '电子竞技',
            dataQa: 'btnTopGamesEsport',
        },
        {
            image: coverLottery,
            action: directToLottery,
            text: '彩票游戏',
            dataQa: 'btnTopGamesLottery',
        },
        {
            image: coverFish,
            action: directToFishHunter,
            text: '捕鱼游戏',
            dataQa: 'btnTopGamesFish',
        },
    ]

    const gameCollection = [gameItems1, gameItems2]

    return (
        <SLayout>
            <SHeader>
                <SHeaderText>TOP GAMES</SHeaderText>
                <SLiveButton>热门游戏</SLiveButton>
            </SHeader>

            <SCollectionLayout>
                {gameCollection.map((collection, index) => {
                    return (
                        <SGameRowLayout key={index}>
                            {collection.map((game, gameIndex) => {
                                return (
                                    <SGameLayout key={gameIndex} onClick={game.action} data-qa={game.dataQa}>
                                        <SGameCover src={game.image} />
                                        <SGameText>{game.text}</SGameText>
                                    </SGameLayout>
                                )
                            })}
                        </SGameRowLayout>
                    )
                })}
            </SCollectionLayout>
        </SLayout>
    )
}

export default TopGame
