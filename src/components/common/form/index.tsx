import { AppFormProps } from '@type/form'
import React, { useCallback } from 'react'

const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement> & AppFormProps> = ({
    children,
    onSubmit,
    isValid,
    hideFormErrors,
    showFormErrors,
    ...props
}) => {
    const onFormSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (isValid || isValid === undefined) {
                hideFormErrors && hideFormErrors()
                onSubmit && onSubmit(e)
            } else {
                showFormErrors && showFormErrors()
            }
        },
        [hideFormErrors, isValid, onSubmit, showFormErrors],
    )

    return (
        <form onSubmit={onFormSubmit} {...props}>
            {children}
        </form>
    )
}

export default Form
