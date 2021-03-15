export type ValidatorOptions = Record<string, any>

export type AppValidator = (value: any) => string

export interface FormControl {
    name: string
    validator: AppValidator
    defaultValue?: any
    onChange?: (value: any, setValues: (f: (draft: any) => void | Record<string, any>) => void) => void
}

export interface AppFormProps {
    isValid?: boolean
    showFormErrors?: () => void
    hideFormErrors?: () => void
}

export interface FormFieldProps {
    showError: boolean
    error: string
    className?: string
}

export interface FormInputProps<T = any> {
    value: T
    onChange: (value: T) => void
    isValid: boolean
    name: string
}
