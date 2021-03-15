import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

import PrevIcon from '@brand/assets/images/slotMachine/desktop/btn_left.png'
import ActivePrevIcon from '@brand/assets/images/slotMachine/desktop/btn_left_on.png'
import NextIcon from '@brand/assets/images/slotMachine/desktop/btn_right.png'
import ActiveNextIcon from '@brand/assets/images/slotMachine/desktop/btn_right_on.png'

import bgImg from '@mixins/backgroundImg'

const SItem = styled.div<IGameFilterBarItem>`
    padding: 20px 28px;
    font-size: 16px;
    color: ${(props) => (props.isActive ? '#232323' : '#bebebe')};
    background-color: ${(props) => (props.isActive ? '#ffd452' : 'transparent')};
    border-right: solid 1px rgba(255, 255, 255, 0.15);
    cursor: pointer;

    &:nth-last-child(2) {
        border-right: 0;
    }

    &:hover {
        color: ${(props) => (props.isActive ? '#232323' : '#ffd452')};
    }
`

const PrevButton = styled.div<IGameFilterBarItem>`
    width: 13px;
    height: 20px;
    margin-right: 8px;
    cursor: pointer;
    ${bgImg(PrevIcon)}

    &:hover {
        ${bgImg(ActivePrevIcon)}
    }
`

const NextButton = styled.div<IGameFilterBarItem>`
    width: 13px;
    height: 20px;
    margin-left: 8px;
    cursor: pointer;
    ${bgImg(NextIcon)}

    &:hover {
        ${bgImg(ActiveNextIcon)}
    }
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const { selected, onCategoryClick, onPrevClick, onNextClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })
    return (
        <CGameFilterBar>
            <PrevButton onClick={onPrevClick} />
            {categories.map((category) => (
                <SItem
                    key={`gamefilteritem_${category.value}`}
                    onClick={() => onCategoryClick(category)}
                    isActive={category === selected}>
                    {category.label}
                </SItem>
            ))}
            <NextButton onClick={onNextClick} />
        </CGameFilterBar>
    )
}

export default CustomGameFilterBar
