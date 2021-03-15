import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Select, { ValueType } from 'react-select'
import MenuIcon from '@brand/assets/images/slotMachine/mobile/icon_menu.png'
import useSupplierMaintenance from '@hooks/useSupplierMaintenance'

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
    const params = useParams<Record<string, string>>()
    const supplierMaintenance = useSupplierMaintenance()

    const isMaintenance = useMemo(() => {
        return supplierMaintenance[params.gameType]?.isMaintenance
    }, [params.gameType, supplierMaintenance])

    return (
        <Select
            placeholder=""
            isDisabled={isMaintenance}
            isSearchable={false}
            value={isMaintenance ? null : value}
            options={isMaintenance ? undefined : options}
            onChange={onChange}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
            }}
            styles={{
                control: (styles) => ({
                    ...styles,
                    backgroundImage: 'linear-gradient(to bottom, #292929, #000000 93%)',
                    borderRadius: 0,
                    border: 0,
                    boxShadow: 'none',
                    padding: 10,
                }),
                menu: (styles) => ({ ...styles, margin: 0 }),
                menuList: (styles) => ({ ...styles, padding: 0, border: 0, margin: 0 }),
                option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
                    ...styles,
                    backgroundColor: isSelected ? '#f6e51c' : '#ccc',
                    borderBottom: '1px solid #fff',
                    color: '#373737',
                    fontSize: 25,
                    fontWeight: 700,
                    textAlign: 'center',
                    padding: '20px',
                    '&:active': {
                        backgroundColor: '#f6e51c',
                    },
                }),
                valueContainer: (styles) => ({
                    ...styles,
                    justifyContent: 'center',
                    ':before': {
                        backgroundImage: `url(${MenuIcon})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        content: '" "',
                        display: isMaintenance ? 'none' : 'block',
                        width: 10,
                        height: 22,
                        position: 'absolute',
                        left: 8,
                    },
                }),
                singleValue: (styles) => ({
                    ...styles,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#f6e51d',
                    fontSize: 20,
                    fontWeight: 700,
                }),
            }}
        />
    )
}

export default Dropdown
