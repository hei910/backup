import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import SBannerCover from '@brand/assets/images/slotMachine/desktop/title@3x.png'
import MaintainIcon from '@brand/assets/images/slotMachine/desktop/maintenance-icon-grey.svg'
import SlotSelect from '@components/common/slotSelect'
import slotProviders from '@constants/gameSuppliers'
import useSlotMachine from '@hooks/useSlotMachine'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'
import bgImg from '@mixins/backgroundImg'
import GameItem from './GameItem'
import useTranslation from '@hooks/useTranslation'

const SBannerLayout = styled.div`
    height: 340px;
    width: 100vw;
    background: #f8f8f8;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
`

const SBanner = styled.div`
    width: 100%;
    height: 100%;
    ${bgImg(SBannerCover, 'auto 100%')};
`

const SSelectLayout = styled.div`
    display: flex;
    justify-content: space-between;
    margin: auto;
    margin-top: -32px;
    z-index: 2;
    width: 100%;
    max-width: 1366px;
    padding: 0 10px;
    position: relative;
`

const SLayout = styled.div`
    width: 100%;
    position: relative;
`

const SSelectColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

const CSlotSelect = styled(SlotSelect)`
    color: #a5a5a5;
    max-width: 188px;
`

const SAllButton = styled.div`
    ${(props) => props.theme.typography.Body3};
    width: 120px;
    height: 32px;
    border-radius: 20px;
    box-shadow: 0 0 6px 0 #f8f8f8;
    border: solid 1px rgba(61, 126, 235, 0.43);
    color: #3d7eeb;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    margin-top: 12px;
    margin-bottom: 20px;
    cursor: pointer;
`

const SMaintenanceButton = styled.div`
    ${(props) => props.theme.typography.Body5};
    width: 90px;
    height: 30px;
    border-radius: 15px;
    box-shadow: 0 0 6px 0 #f8f8f8;
    border: solid 1px rgba(0, 0, 0, 0.1);
    color: #a5a5a5;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
    margin-top: 12px;
    margin-bottom: 20px;
    cursor: pointer;

    :before {
        content: '';
        width: 14.7px;
        height: 14.7px;
        margin: 0 4.2px 0 0;
        ${bgImg(MaintainIcon)};
    }
`

const GameItemsContainer = styled.div`
    padding: 16px 28px;
    border-radius: 15px;
    background-color: #f8f8f8;
`

const typeList = [
    slotProviders.mg,
    slotProviders.dt,
    slotProviders.pt,
    slotProviders.pg,
    slotProviders.cq9,
    slotProviders.jdb,
]

const GamePreview = () => {
    const history = useHistory()
    const { previewGameList } = useSlotMachine({})
    const supplierMaintenance = useSupplierMaintenance()

    const navigatePage = (type: string) => {
        history.push(`/slotMachine/${type}`)
    }
    const t = useTranslation()

    return (
        <SLayout>
            <SBannerLayout>
                <SBanner />
            </SBannerLayout>

            <SSelectLayout>
                {typeList.map((item) => {
                    const isMaintenance = supplierMaintenance[item]?.isMaintenance

                    return (
                        <SSelectColumn key={item}>
                            <CSlotSelect type={item} isBadge={false} isMaintenance={isMaintenance} />
                            {!isMaintenance && (
                                <SAllButton onClick={() => navigatePage(item)} data-qa={`btn${item}All`}>
                                    {t('slotMachine.gamePreview.all')}
                                </SAllButton>
                            )}
                            {isMaintenance && (
                                <SMaintenanceButton onClick={() => navigatePage(item)}>
                                    {t('slotMachine.gamePreview.maintenance')}
                                </SMaintenanceButton>
                            )}
                            <GameItemsContainer>
                                {previewGameList
                                    .filter((game) => game.supplier === item)
                                    .map((game, index) => (
                                        <GameItem key={`game-item-${item}-${game.id}`} game={game} isPreview={true} index={index} />
                                    ))}
                            </GameItemsContainer>
                        </SSelectColumn>
                    )
                })}
            </SSelectLayout>
        </SLayout>
    )
}

export default GamePreview
