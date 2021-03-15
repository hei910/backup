import React from 'react'
import styled from 'styled-components/macro'
import CGameFilterBar, { ICustomGameFilterBar } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'

const SItem = styled(CGameFilterBar.Item)`
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
                    isActive={category === selected}
                    data-qa={category.dataQa}>
                    {category.label}
                </SItem>
            ))}
        </CGameFilterBar>
    )
}

export default CustomGameFilterBar
