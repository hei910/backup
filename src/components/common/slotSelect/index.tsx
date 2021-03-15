import useTranslation from '@hooks/useTranslation'
import React from 'react'
import styled from 'styled-components/macro'

import slotVenders from '@brand/assets/images/slotMachine/desktop/slots_vender.png'
import bgImg from '@mixins/backgroundImg'
import GameSuppliers from '@constants/gameSuppliers'

import MaintainBadge from '@brand/assets/images/slotMachine/desktop/maintainence-desktop@2x.png'
import { useHistory } from 'react-router-dom'

const SLayout = styled.div`
    min-width: 150px;
    width: 100%;
    max-width: 194px;
    min-height: 62.9px;
    height: auto;
    max-height: 82px;
    margin: auto;
    padding: 10px 0;
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 87px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background: #fff;
`

const SCoverImage = styled.div<{ posX: number }>`
    width: 100%;
    height: 70px;
    ${bgImg(slotVenders, 'cover')}
    background-position-x: ${(props) => props.posX}%;
`

const SMaintenanceBadge = styled.img`
    width: 57px;
    height: 21px;
    position: absolute;
    top: 0;
    right: 0;
`

const SText = styled.div`
    ${(props) => props.theme.typography.Body2}
    text-align: center;
    margin-top: 12px;
    color: #a5a5a5;
`

const SlotSelect = ({
    className,
    isBadge,
    isMaintenance,
    type,
}: {
    className?: string
    isBadge?: boolean
    isMaintenance?: boolean
    type: string
}) => {
    const t = useTranslation()
    const history = useHistory()

    const getImageSourcePos = () => {
        if (type === GameSuppliers.mg) {
            if (isMaintenance) {
                return 9
            } else {
                return 0
            }
        } else if (type === GameSuppliers.dt) {
            if (isMaintenance) {
                return 27.5
            } else {
                return 18.25
            }
        } else if (type === GameSuppliers.pt) {
            if (isMaintenance) {
                return 45.5
            } else {
                return 36.25
            }
        } else if (type === GameSuppliers.pg) {
            if (isMaintenance) {
                return 63.5
            } else {
                return 54.5
            }
        } else if (type === GameSuppliers.cq9) {
            if (isMaintenance) {
                return 81.5
            } else {
                return 72.5
            }
        } else if (type === GameSuppliers.jdb) {
            if (isMaintenance) {
                return 99.5
            } else {
                return 90.5
            }
        } else {
            return 0
        }
    }

    const showSlotDetail = () => {
        history.push(`/slotMachine/${type}`)
    }

    return (
        <>
            <SLayout onClick={() => showSlotDetail()} className={className}>
                <SCoverImage posX={getImageSourcePos()} data-qa={`img${type}Icon`} />
                {isMaintenance && isBadge && <SMaintenanceBadge src={MaintainBadge} data-qa="imgMaintenanceIcon" />}
            </SLayout>
            <SText data-qa={`txt${type}Icon`}> {t('slotMachine.slotText', { type: type.toUpperCase() })}</SText>
        </>
    )
}

export default SlotSelect
