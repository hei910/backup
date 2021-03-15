import React from 'react'
import Select, { ValueType } from 'react-select'
import MenuIcon from '@brand/assets/images/slotMachine/mobile/icon_menu.png'

interface IDropdown {
    value: ValueType<IOption>
    options: IOption[]
    onChange: (value: ValueType<IOption>) => void
}

export interface IOption {
    value: string
    label: string
}

const Dropdown: React.FC<IDropdown> = ({ value, options, onChange }) => {
    return (
        <Select
            isSearchable={false}
            value={value}
            options={options}
            onChange={onChange}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
            }}
            styles={{
                control: (styles) => ({
                    ...styles,
                    backgroundColor: '#969696',
                    borderRadius: '9px 9px 3px 3px',
                    border: 0,
                    boxShadow: 'inset 0 -2px 0 0 #717171',
                    padding: 10,
                }),
                menu: (styles) => ({ ...styles, margin: 0, zIndex: 2 }),
                menuList: (styles) => ({ ...styles, padding: 0, border: 0, margin: 0 }),
                option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                    ...styles,
                    paddingLeft: 40,
                    backgroundColor: isSelected ? '#ade1f5' : '#fff',
                    color: isSelected ? '#fff' : '#000',
                    fontSize: 16,
                    '&:active': {
                        color: '#fff',
                        backgroundColor: '#ade1f5',
                    },
                }),
                valueContainer: (styles) => ({
                    ...styles,
                    paddingLeft: 28,
                    ':before': {
                        backgroundImage: `url(${MenuIcon})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        content: '" "',
                        display: 'block',
                        width: 10,
                        height: 22,
                        position: 'absolute',
                        left: 8,
                    },
                }),
                singleValue: (styles) => ({
                    ...styles,
                    display: 'flex',
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 600,
                }),
            }}
        />
    )
}

export default Dropdown
