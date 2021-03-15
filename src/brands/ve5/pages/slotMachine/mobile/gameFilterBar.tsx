import React from 'react'
import { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

import PrevIcon from '@brand/assets/images/slotMachine/mobile/btn_left_on.png'
import NextIcon from '@brand/assets/images/slotMachine/mobile/btn_right_on.png'

import bgImg from '@mixins/backgroundImg'

const SGameFilterBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #ff9200;
    padding: 0 16px;
`

const ItemsWrapper = styled.div`
    display: flex;
    flex-grow: 1;
    overflow-x: auto;
`

const SItem = styled.div<IGameFilterBarItem>`
    padding: 8px 8px 4px 8px;
    color: #fff;
    font-size: 12px;
    font-weight: ${(props) => (props.isActive ? 'bold' : 500)};
    background-color: ${(props) => (props.isActive ? '#d37900' : 'transparent')};
    border-bottom: solid 3.5px ${(props) => (props.isActive ? '#fff' : 'transparent')};
    white-space: nowrap;
    cursor: pointer;
`

const PrevButton = styled.div<IGameFilterBarItem>`
    width: 6px;
    height: 10px;
    margin-right: 8px;
    cursor: pointer;
    ${bgImg(PrevIcon)}
`

const NextButton = styled.div<IGameFilterBarItem>`
    width: 6px;
    height: 10px;
    margin-left: 8px;
    cursor: pointer;
    ${bgImg(NextIcon)}
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const { selected, onCategoryClick, onPrevClick, onNextClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })
    return (
        <SGameFilterBar>
            <PrevButton onClick={onPrevClick} />
            <ItemsWrapper>
                {categories.map((category) => (
                    <SItem
                        key={`gamefilteritem_${category.value}`}
                        onClick={() => onCategoryClick(category)}
                        isActive={category === selected}>
                        {category.label}
                    </SItem>
                ))}
            </ItemsWrapper>
            <NextButton onClick={onNextClick} />
        </SGameFilterBar>
    )
}

export default CustomGameFilterBar
