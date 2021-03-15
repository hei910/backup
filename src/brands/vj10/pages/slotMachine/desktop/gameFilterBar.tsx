import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

const SItem = styled.div<IGameFilterBarItem>`
    padding: 10px 32px;
    font-size: 16px;
    color: #fff;
    background-image: ${(props) =>
        props.isActive
            ? 'linear-gradient(to bottom, #fe9900, #c77700)'
            : 'linear-gradient(to bottom, #444444, #000000)'};
    border: none;
    cursor: pointer;

    &:hover {
        background-image: linear-gradient(to bottom, #fe9900, #c77700);
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
