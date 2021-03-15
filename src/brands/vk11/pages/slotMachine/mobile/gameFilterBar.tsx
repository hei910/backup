import React from 'react'
import { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

const SGameFilterBar = styled.div`
    display: flex;
    align-items: center;
    overflow-x: auto;
    overflow-y: hidden;
    height: 44px;
    box-shadow: 2px 2px 6px 0 rgba(255, 132, 12, 0.16);
    background-color: #ffffff;

    .swiper-container {
        height: 100%;
    }

    .swiper-slide {
        width: auto;
    }
`

const ItemsContainer = styled.div`
    display: flex;
    padding: 0 14px;
    margin: 0 auto;
`

const SItem = styled.div<IGameFilterBarItem>`
    ${(props) => props.theme.typography.Body3}
    color: ${(props) => (props.isActive ? '#fd8524' : '#626d8e')};
    position: relative;
    height: 100%;
    padding: 10px 8px 12px 8px;
    white-space: nowrap;
    margin: 0 1%;

    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        right: 0;
        height: 8px;
        width: 100%;
        background: ${(props) => (props.isActive ? '#fd8524' : 'transparent')};
        border-radius: 4px;
    }
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const { selected, onCategoryClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })
    return (
        <SGameFilterBar>
            <ItemsContainer>
                {categories.map((category, idx) => (
                    <SItem
                        key={`gamefilteritem_${category.value}`}
                        onClick={() => onCategoryClick(category)}
                        isActive={category === selected}
                        data-qa={category.dataQa}>
                        {category.label}
                    </SItem>
                ))}
            </ItemsContainer>
        </SGameFilterBar>
    )
}

export default CustomGameFilterBar
