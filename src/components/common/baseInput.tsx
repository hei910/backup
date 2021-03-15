import styled from 'styled-components/macro'

const BaseInput = styled.input`
    font-size: 14px;
    padding: 6px 8px;
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.component.common.baseInput.borderColor};
    color: ${(props) => props.theme.colors.component.common.baseInput.textColor};

    &::placeholder {
        color: ${(props) => props.theme.colors.component.common.baseInput.placeholderColor};
    }

    &:disabled {
        border-color: ${(props) => props.theme.colors.component.common.baseInput.disabledBorderColor};
        background-color: initial;
    }
`

export default BaseInput
