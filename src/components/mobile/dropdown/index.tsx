import { isIos } from '@utils/userAgent'
import { useCallback } from 'react'
import styled from 'styled-components/macro'
import Picker from './picker'

export interface IOption {
    label: string
    value: string
}

export interface IDropdownProps {
    value: IOption
    options: Array<IOption>
    onChange: (value: IOption) => void
}

const SelectContainer = styled.div`
    position: relative;
`

// hide the select input
const Select = styled.select`
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    color: transparent;
    border: none;
    appearance: none;
`

const Option = styled.option`
    color: #000;
`

const Dropdown: React.FC<IDropdownProps> = ({ value, options, onChange, children }) => {
    const onValueChange = useCallback(
        (newValue: string) => {
            const selected = options.find((option) => option.value === newValue)
            onChange(selected!)
        },
        [onChange, options],
    )

    return (
        <>
            {isIos() ? (
                <SelectContainer>
                    {children}
                    <Select value={value.value} onChange={(e) => onValueChange(e.target.value)}>
                        {options.map((option) => (
                            <Option key={`mobile-dropdown-${option.label}-${option.value}`} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </SelectContainer>
            ) : (
                <Picker defaultValue={value?.value || ''} options={options} onChange={onValueChange}>
                    {children}
                </Picker>
            )}
        </>
    )
}

export default Dropdown
