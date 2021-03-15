import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

const SItem = styled(CGameFilterBar.Item)`
    background-color: ${(props) => (props.isActive ? '#3d7eeb' : '#fff')};
    margin-right: 20px;
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
