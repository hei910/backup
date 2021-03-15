import { AppValidator } from '@type/form'
import { OPTIONAL_MESSAGE } from './validator'

export const combineValidators = (...validators: AppValidator[]) => (value: any): string =>
    validators.reduce((err, validator) => {
        if (err === OPTIONAL_MESSAGE) {
            return ''
        }

        return err || validator(value)
    }, '')
