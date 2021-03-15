import React from 'react'
import { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'

import PrevIcon from '@brand/assets/images/slotMachine/desktop/btn_left_on.png'
import NextIcon from '@brand/assets/images/slotMachine/desktop/btn_right_on.png'

import bgImg from '@mixins/backgroundImg'

const SGameFilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f86c1d;
    padding: 0 16px;
`

const ItemsWrapper = styled.div`
    display: flex;
    width: 100%;
`

const SItem = styled.div<IGameFilterBarItem>`
    padding: 10px 28px;
    color: #fff;
    font-size: 20px;
    font-weight: ${(props) => (props.isActive ? 'bold' : 500)};
    background-color: ${(props) => (props.isActive ? '#c54906' : 'transparent')};
    border-bottom: solid 3.5px ${(props) => (props.isActive ? '#fff' : 'transparent')};
    cursor: pointer;
`

const PrevButton = styled.div<IGameFilterBarItem>`
    width: 14px;
    height: 20px;
    margin-right: 16px;
    cursor: pointer;
    ${bgImg(PrevIcon)}
`

const NextButton = styled.div<IGameFilterBarItem>`
    width: 14px;
    height: 20px;
    margin-left: 16px;
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
