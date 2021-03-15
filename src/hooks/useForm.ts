import { FormControl } from '@type/form'
import { useEffect, useState } from 'react'
import { useImmer } from 'use-immer'

export default (formControls: FormControl[]) => {
    const getInitialValues = () => {
        const initialValues: Record<string, any> = {}

        formControls.forEach((control) => {
            initialValues[control.name] = control.defaultValue || ''
        })

        return initialValues
    }

    const [values, setValues] = useImmer(getInitialValues)

    const [errors, setErrors] = useState<Record<string, string>>({})

    const [showErrors, setShowErrors] = useState(false)

    const isValid = Object.values(errors).every((error) => !error)

    useEffect(() => {
        const newErrors = {} as Record<string, string>
        Object.keys(values).forEach((inputName) => {
            const validator = formControls.filter((control) => control.name === inputName)[0].validator
            newErrors[inputName] = validator(values[inputName])
        })
        setErrors(newErrors)
    }, [formControls, values])

    const resetForm = () => {
        setShowErrors(false)
        setValues(getInitialValues)
    }

    const showFormErrors = () => {
        setShowErrors(true)
    }

    const hideFormErrors = () => {
        setShowErrors(false)
    }

    const getOnInputChangeHandler = (name: string) => (eventOrValue: any) => {
        const newValue = eventOrValue?.target ? eventOrValue.target.value : eventOrValue
        const targetFormControl = formControls.filter((control) => control.name === name)[0]

        if (targetFormControl.onChange) {
            targetFormControl.onChange(newValue, setValues)
        } else {
            setValue(name, newValue)
        }
    }

    const registerForm = () => ({
        showFormErrors,
        hideFormErrors,
        isValid,
    })

    const registerFormField = (name: string) => ({
        showError: showErrors,
        error: errors[name],
    })

    const registerInput = (name: string) => ({
        value: values[name],
        name,
        onChange: getOnInputChangeHandler(name),
        isValid: !showErrors || (showErrors && !errors[name]),
    })

    const setValue = (name: string, value: unknown) => {
        setValues((draft) => {
            draft[name] = value
        })
    }

    return {
        registerForm,
        registerFormField,
        registerInput,
        isValid,
        errors,
        values,
        resetForm,
        setValue,
        setValues,
    }
}
