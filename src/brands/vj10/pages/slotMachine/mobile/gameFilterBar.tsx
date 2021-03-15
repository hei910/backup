import React from 'react'
import { ICustomGameFilterBar, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'
import { Swiper, SwiperSlide } from 'swiper/react'

import PrevIcon from '@brand/assets/images/slotMachine/mobile/btn_left_on.png'
import NextIcon from '@brand/assets/images/slotMachine/mobile/btn_right_on.png'

import bgImg from '@mixins/backgroundImg'

const SGameFilterBar = styled.div`
    display: flex;
    align-items: center;
    background-color: #ff9200;
    padding: 0 16px;
    height: 42px;

    .swiper-container {
        height: 100%;
    }

    .swiper-slide {
        width: auto;
    }
`

const SItem = styled.div<IGameFilterBarItem>`
    font-size: 16px;
    font-weight: ${(props) => (props.isActive ? 'bold' : 500)};
    line-height: 1;
    color: #fff;
    height: 100%;
    padding: 8px 8px 4px 8px;
    background: ${(props) => props.isActive ? '#d37900' : 'transparent'};
    border-bottom: 5px solid transparent;
    border-color: ${(props) => props.isActive ? 'white' : 'transparent'};
    display: flex;
    justify-content: center;
    align-items: center;
`

const PrevButton = styled.div<IGameFilterBarItem>`
    width: 18px;
    height: 100%;
    margin-right: 8px;
    ${bgImg(PrevIcon)}
    background-size: contain;
`

const NextButton = styled.div<IGameFilterBarItem>`
    width: 18px;
    height: 100%;
    margin-left: 8px;
    ${bgImg(NextIcon)}
    background-size: contain;
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
            <Swiper slidesPerView="auto">
                {categories.map((category, idx) => (
                    <SwiperSlide key={idx}>
                        <SItem
                            key={`gamefilteritem_${category.value}`}
                            onClick={() => onCategoryClick(category)}
                            isActive={category === selected}>
                            {category.label}
                        </SItem>
                    </SwiperSlide>
                ))}
            </Swiper>
            <NextButton onClick={onNextClick} />
        </SGameFilterBar>
    )
}

export default CustomGameFilterBar
