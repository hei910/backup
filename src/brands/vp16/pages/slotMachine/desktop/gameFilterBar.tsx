import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

import bgImg from '@mixins/backgroundImg'

import TagLeftIcon from '@brand/assets/images/slotMachine/desktop/tag_icon_left.svg'
import TagRightIcon from '@brand/assets/images/slotMachine/desktop/tag_icon_right.svg'

const SCGameFilterBar = styled.div<{ isMaintenance: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    ${(props) =>
        props.isMaintenance &&
        `
        opacity: 0.4;
        pointer-events: none;
    `}
`

const SItem = styled.div<IGameFilterBarItem>`
    flex: 1 1 auto;
    padding: 10px 0;
    font-size: 20px;
    color: ${(props) => (props.isActive ? '#f6e51d' : '#fff')};
    cursor: pointer;
    position: relative;
    text-align: center;
    ${(props) => props.isActive && 'background-color: #000000'};

    &:hover {
        color: #f6e51d;
    }
`

const STagRightIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    width: 20px;
    ${bgImg(TagRightIcon)}
`

const STagLeftIcon = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    width: 20px;
    ${bgImg(TagLeftIcon)}
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const params = useParams<Record<string, string>>()
    const supplierMaintenance = useSupplierMaintenance()
    const { selected, onCategoryClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })
    const isMaintenance = useMemo(() => {
        return supplierMaintenance[params.gameType]?.isMaintenance
    }, [params.gameType, supplierMaintenance])

    return (
        <SCGameFilterBar isMaintenance={isMaintenance}>
            {categories.map((category) => (
                <SItem
                    key={`gamefilteritem_${category.value}`}
                    onClick={() => onCategoryClick(category)}
                    isActive={category === selected}>
                    {category === selected && <STagRightIcon />}
                    {category.label}
                    {category === selected && <STagLeftIcon />}
                </SItem>
            ))}
        </SCGameFilterBar>
    )
}

export default CustomGameFilterBar
