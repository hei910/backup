import React from 'react'
import styled from 'styled-components/macro'
import SSlotMachineContainer from '@components/desktop/slotMachine/container'
import topBanner from '@brand/assets/images/slotMachine/banner.jpg'
import CoverImage from '@brand/assets/images/slotMachine/desktop/title@3x.png'
import SlotSelect from '@components/common/slotSelect'
import GameSuppliers from '@constants/gameSuppliers'
import { GameListItem } from '@services/game/type'
import useSlotMachine from '@hooks/useSlotMachine'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'
import GameItem from './GameItem'

const STopBanner = styled.div`
    min-width: 1280px;
    width: 100%;
    height: 100vh;
    position: relative;
    background-image: url(${topBanner});
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    overflow: hidden;
`

const SSlotLayout = styled.div`
    display: flex;
    height: 100vh;
    position: relative;
`

const SSlotCover = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SSlotSelectLayout = styled.div`
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 55%;
    right: 0;
    padding-left: 10px;
    background: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const STriangle = styled.div`
    position: absolute;
    top: 0;
    right: 44.9%;
    border-style: solid;
    border-width: 0 0 100vh 200px;
    border-color: transparent transparent #fff transparent;
`

const SSlotCoverImage = styled.img`
    width: 70%;
`

const STypeSelectLayout = styled.div`
    width: 100%;
    max-width: 615px;
    margin: 20px auto 20px 3%;
`

const STypeSelectRow = styled.div<{ marginLeft: number }>`
    width: 100%;
    min-height: 107px;
    height: 50%;
    max-height: 114px;
    display: flex;
    margin-top: 20px;
    margin-left: ${(props) => `${props.marginLeft}px`};
`

const STypeSelectItemLayout = styled.div`
    width: 30.75%;
    height: 100%;
    margin-right: 10px;
    cursor: pointer;
`

const SGamesPreviewLayout = styled.div`
    display: flex;
    margin: 20px 0 0 -80px;
    overflow: scroll;
`

const SGamesColumn = styled.div<{ marginTop: number }>`
    margin-top: ${(props) => `${props.marginTop}px`};
    padding: 0 4px;
`

const typeList = [
    [GameSuppliers.mg, GameSuppliers.dt, GameSuppliers.pt],
    [GameSuppliers.pg, GameSuppliers.cq9, GameSuppliers.jdb],
]

interface IGameColumn {
    marginTop: number
    type: string
    list: GameListItem[]
    number: number
}

const GameColumn: React.FC<IGameColumn> = ({ marginTop, type, list, number }) => {
    return (
        <SGamesColumn key={`game_column_${type}`} marginTop={marginTop}>
            {list
                .filter((game) => game.supplier === type)
                .map((game, index) => {
                    return (
                        index < number && (
                            <GameItem key={`game-item-${game.id}`} index={index} game={game} isPreview={true} />
                        )
                    )
                })}
        </SGamesColumn>
    )
}

const GamePreview = () => {
    const { previewGameList } = useSlotMachine({})
    const supplierMaintenance = useSupplierMaintenance()

    return (
        <SSlotMachineContainer>
            <SSlotLayout>
                <STopBanner>
                    <SSlotCover>
                        <SSlotCoverImage src={CoverImage} />
                    </SSlotCover>
                    <STriangle />
                    <SSlotSelectLayout>
                        <STypeSelectLayout>
                            {typeList.map((row, rowIndex) => {
                                return (
                                    <STypeSelectRow key={rowIndex} marginLeft={rowIndex === 0 ? 0 : -20}>
                                        {row.map((item, index) => {
                                            const isMaintenance = supplierMaintenance[item].isMaintenance
                                            return (
                                                <STypeSelectItemLayout key={index} data-qa={`btn${item}`}>
                                                    <SlotSelect
                                                        type={item}
                                                        isBadge={true}
                                                        isMaintenance={isMaintenance}
                                                    />
                                                </STypeSelectItemLayout>
                                            )
                                        })}
                                    </STypeSelectRow>
                                )
                            })}
                        </STypeSelectLayout>

                        <SGamesPreviewLayout>
                            <GameColumn marginTop={94.3} type={'mg'} list={previewGameList} number={4} />
                            <GameColumn marginTop={40.6} type={'dt'} list={previewGameList} number={4} />
                            <GameColumn marginTop={117.5} type={'pt'} list={previewGameList} number={4} />
                            <GameColumn marginTop={76.2} type={'pg'} list={previewGameList} number={4} />
                            <GameColumn marginTop={0} type={'cq9'} list={previewGameList} number={5} />
                            <GameColumn marginTop={61.9} type={'jdb'} list={previewGameList} number={4} />
                        </SGamesPreviewLayout>
                    </SSlotSelectLayout>
                </STopBanner>
            </SSlotLayout>
        </SSlotMachineContainer>
    )
}

export default GamePreview
