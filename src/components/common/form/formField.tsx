import React from 'react'
import styled from 'styled-components/macro'
import { FormFieldProps } from '@type/form'

const FormFieldContainer = styled.div`
    width: 100%;
`

const ErrorMessage = styled.div`
    ${(props) => props.theme.typography.Body5};
    color: ${(props) => props.theme.colors.warning};
    margin-top: 5px;
`

const FormField: React.FC<FormFieldProps> = ({ showError, error, children, className }) => {
    return (
        <FormFieldContainer className={className}>
            {children}
            {showError && error && <ErrorMessage data-qa="formFieldErr">{error}</ErrorMessage>}
        </FormFieldContainer>
    )
}

export default FormField
