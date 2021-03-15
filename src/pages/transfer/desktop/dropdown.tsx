import { IDropdownProps, IOption } from '@components/mobile/dropdown'
import { FormInputProps } from '@type/form'
import { useCallback } from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import ArrowIcon from '@images/transfer/desktop/down-arrow.svg'

type TransferDropdownProps = IDropdownProps & FormInputProps<IOption>

const DropdownContainer = styled.div`
    position: relative;
`

const StyledDropdown = styled.select<FormInputProps>`
    border-radius: 4px;
    border: ${(props) => (props.isValid ? '1px solid #cbcbcb' : `1.5px solid ${props.theme.colors.warning}`)};
    padding: 4px 12px;
    width: 100%;
    color: #6e6e6e;
    height: 31px;
    ${(props) => props.theme.typography.Body3}
    appearance: none;

    &::-ms-expand {
        display: none;
    }
`

// pointer-event none for propagate event to <select> directly
const DropdownArrow = styled.div`
    position: absolute;
    ${bgImg(ArrowIcon)}
    width: 24px;
    height: 24px;
    top: 4px;
    right: 4px;
    pointer-events: none;
`

const TransferDropdown: React.FC<TransferDropdownProps> = ({ onChange, options, value, ...otherProps }) => {
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newValue = e.target.value
            onChange({
                label: options.filter((option) => option.value === newValue)[0].label,
                value: newValue,
            })
        },
        [onChange, options],
    )

    return (
        <DropdownContainer>
            <StyledDropdown {...otherProps} onChange={onInputChange} value={value.value}>
                {options.map((option) => (
                    <option
                        key={`transfer-option-${option.value}`}
                        value={option.value}
                        data-qa={`selectItem_${option.value}`}>
                        {option.label}
                    </option>
                ))}
            </StyledDropdown>
            <DropdownArrow />
        </DropdownContainer>
    )
}

export default TransferDropdown
