import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

const SItem = styled.div<IGameFilterBarItem>`
    padding: 12px 12px;
    font-size: 16px;
    color: ${(props) => (props.isActive ? '#232323' : '#bebebe')};
    background-color: ${(props) => (props.isActive ? '#f0910a' : 'transparent')};
    cursor: pointer;

    &:hover {
        color: #232323;
        background-color: #f0910a;
    }
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const { selected, onCategoryClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })
    return (
        <CGameFilterBar>
            {categories.map((category) => (
                <SItem
                    key={`gamefilteritem_${category.value}`}
                    onClick={() => onCategoryClick(category)}
                    isActive={category === selected}>
                    {category.label}
                </SItem>
            ))}
        </CGameFilterBar>
    )
}

export default CustomGameFilterBar
