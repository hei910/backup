import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

const SItem = styled.div<IGameFilterBarItem>`
    padding: 10px 28px;
    font-size: 18px;
    color: #fff;
    border-radius: 19px;
    background-color: ${(props) => (props.isActive ? '#f6931c' : 'transparent')};
    cursor: pointer;
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
