import React from 'react'
import styled from 'styled-components/macro'
import Select, { ValueType } from 'react-select'
import icon_search from '@brand/assets/images/slotMachine/mobile/icon-search.png'

interface IDropdown {
    value: ValueType<IOption>
    options: IOption[]
    onChange: (value: ValueType<IOption>) => void
    onSearchBarOpen: () => void
}

export interface IOption {
    value: string
    label: string
}

const SDropdown = styled.div`
    position: relative;
    margin-left: 38px;
`

const SIcon = styled.div`
    width: 38px;
    height: 38px;
    background: center center / cover no-repeat url(${icon_search});
    position: absolute;
    top: 0;
    right: 100%;
`

const Dropdown: React.FC<IDropdown> = ({ value, options, onChange, onSearchBarOpen }) => {
    return (
        <SDropdown>
            <SIcon onClick={onSearchBarOpen} />
            <Select
                isSearchable={false}
                value={value}
                options={options}
                onChange={onChange}
                components={{
                    IndicatorSeparator: () => null,
                }}
                styles={{
                    control: (styles) => ({
                        ...styles,
                        // backgroundColor: '#ffffff40',
                        backgroundColor: '#778E9E',
                        borderRadius: 0,
                        border: 0,
                        boxShadow: 'none',
                        padding: 0,
                    }),
                    menu: (styles) => ({ ...styles, margin: 0 }),
                    menuList: (styles) => ({ ...styles, padding: 0, border: 0, margin: 0 }),
                    option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                        ...styles,
                        backgroundColor: isSelected ? '#ffd452' : '#fff',
                        color: isSelected ? '#000' : '#878787',
                        fontSize: 15,
                        padding: '16px 10px',
                        borderBottom: '1px solid #d2d2d2',
                        '&:active': {
                            color: '#fff',
                            backgroundColor: '#ade1f5',
                        },
                    }),
                    valueContainer: (styles) => ({
                        ...styles,
                    }),
                    singleValue: (styles) => ({
                        ...styles,
                        display: 'flex',
                        color: '#fff',
                        fontSize: 15,
                    }),
                    dropdownIndicator: (styles) => ({ ...styles, color: 'rgba(255, 255, 255, 0.5)' }),
                }}
            />
        </SDropdown>
    )
}

export default Dropdown
