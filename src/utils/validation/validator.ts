import { AppValidator } from '@type/form'

export const OPTIONAL_MESSAGE = 'optional'

const isEmpty = (value: any, acceptZero?: boolean) =>
    value === undefined ||
    value === null ||
    value === '' ||
    value.length === 0 ||
    value.value === '' ||
    (!acceptZero && (value === 0 || value === '0'))

export const optionalValidator = (value: any) => {
    if (isEmpty(value)) {
        return OPTIONAL_MESSAGE
    }

    return ''
}

export const getMandatoryValidator = (error: string, acceptZero?: boolean): AppValidator => (value: any) =>
    isEmpty(value, acceptZero) ? error : ''

export const getNumberValidator = (error: string): AppValidator => (value: any) => (isNaN(value) ? error : '')

export const getDpValidator = (error: string, dp: number): AppValidator => (value: any) => {
    const valueDp = value.toString().split('.')[1]?.length || 0
    return valueDp > dp ? error : ''
}

export const getNumberRangeValidator = (error: string, minAmount: number, maxAmount = Infinity) => (value: any) =>
    +value >= minAmount && +value <= maxAmount ? '' : error
