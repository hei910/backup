import React, { useCallback } from 'react'
import { ICustomGameFilterBar, ICategory, IGameFilterBarItem } from '@components/common/gameFilterBar'
import useGameFilterBar from '@components/common/gameFilterBar/hook'
import styled from 'styled-components/macro'
import SlotFilters from '@constants/slotFilters'
import AllIcons from '@brand/assets/images/slotMachine/mobile/all icon.png'
import imageSprite from '@mixins/imageSprite'

const SGameFilterBar = styled.div`
    border-top: 4px solid #f0910a;
    background: #3e3e3e;
    display: flex;
    justify-content: stretch;
    overflow-x: auto;
`

const SItem = styled.div<IGameFilterBarItem>`
    flex-grow: 1;
    flex-basis: 0;
    padding: 8px 4px;
    background-color: ${(props) => (props.isActive ? '#f0910a' : 'transparent')};
    color: ${(props) => (props.isActive ? '#000000' : '#929292')};
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    min-width: 28%;
`

const SItemIcon = styled.div<{ index: number }>`
    margin: 0 auto 8px auto;
    width: 45px;
    height: 45px;
    ${(props) =>
        imageSprite({
            url: AllIcons,
            width: 45,
            height: 45,
            itemIndex: props.index,
            indexMap: {
                active: 0,
                default: 1,
            },
        })}
`

const CustomGameFilterBar: React.FC<ICustomGameFilterBar> = ({ initialValue, categories, onChange }) => {
    const { selected, onCategoryClick } = useGameFilterBar({
        initialValue,
        categories,
        onChange,
    })

    const getIconIndex = useCallback((category: ICategory) => {
        switch (category.value) {
            case SlotFilters.rank:
                return 0
            case SlotFilters.popularity:
                return 1
            case SlotFilters.highChance:
                return 2
            case SlotFilters.highReturn:
                return 3
            case SlotFilters.all:
                return 4
            case SlotFilters.type2:
                return 5
            case SlotFilters.type3:
                return 6
            case SlotFilters.type4:
                return 7
            case SlotFilters.anime:
                return 8
            case SlotFilters.chinese:
                return 9
            case SlotFilters.reality:
                return 10
            default:
                return 0
        }
    }, [])

    return (
        <SGameFilterBar>
            {categories.map((category) => (
                <SItem
                    key={`gamefilteritem_${category.value}`}
                    onClick={() => onCategoryClick(category)}
                    isActive={category === selected}>
                    <SItemIcon className={category === selected ? 'active' : ''} index={getIconIndex(category)} />
                    {category.label}
                </SItem>
            ))}
        </SGameFilterBar>
    )
}

export default CustomGameFilterBar
