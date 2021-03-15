import { FormInputProps } from '@type/form'
import { useCallback } from 'react'
import styled from 'styled-components/macro'

type TransferInputProps = React.InputHTMLAttributes<HTMLInputElement> & FormInputProps

const StyledInput = styled.input<FormInputProps>`
    border-radius: 4px;
    border: ${(props) => (props.isValid ? '1px solid #cbcbcb' : `1.5px solid ${props.theme.colors.warning}`)};
    width: 100%;
    color: #6e6e6e;
    padding: 4px 12px;
    height: 31px;
    ${(props) => props.theme.typography.Body3}
`

const TransferInput: React.FC<TransferInputProps> = ({ onChange, ...otherProps }) => {
    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value)
        },
        [onChange],
    )

    return <StyledInput onChange={onInputChange} {...otherProps} />
}

export default TransferInput
