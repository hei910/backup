import React from 'react'
import CGameFilterBar, { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

import PrevIcon from '@brand/assets/images/slotMachine/desktop/icon_arrow_l.png'
import NextIcon from '@brand/assets/images/slotMachine/desktop/icon_arrow_r.png'
import BottomArrowIcon from '@brand/assets/images/slotMachine/desktop/icon_over_arrow.png'

import bgImg from '@mixins/backgroundImg'

const SItem = styled.div<IGameFilterBarItem>`
    padding: 20px 28px;
    font-size: 16px;
    color: ${(props) => (props.isActive ? '#ff9900' : '#333')};
    background: ${(props) => props.isActive && `bottom 6px center no-repeat url(${BottomArrowIcon}) #333`};
    background-color: ${(props) => (props.isActive ? '#333' : 'transparent')};
    border-right: solid 1px #fff;
    cursor: pointer;

    &:first-child {
        border-left: solid 1px #fff;
    }
`

const PrevButton = styled.div<IGameFilterBarItem>`
    width: 35px;
    height: 35px;
    margin-right: 8px;
    background-color: #fff;
    border: solid 1px #b4b4b4;
    cursor: pointer;
    ${bgImg(PrevIcon, '7px 11px')}
`

const NextButton = styled.div<IGameFilterBarItem>`
    width: 35px;
    height: 35px;
    margin-left: 8px;
    background-color: #fff;
    border: solid 1px #b4b4b4;
    cursor: pointer;
    ${bgImg(NextIcon, '7px 11px')}
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
