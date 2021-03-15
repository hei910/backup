import { setIsTransferFailModalOpened, setIsTransferSuccessModalOpened } from '@services/modal/action'
import { transferBetweenWallets } from '@services/transfer/api'
import { IOption } from '@components/mobile/dropdown'
import GameSuppliers, { SeparatedWalletSuppliers, SEPARATED_WALLET_SUPPLIER } from '@constants/gameSuppliers'
import useForm from '@hooks/useForm'
import useTranslation from '@hooks/useTranslation'
import { useDispatch } from '@redux'
// import { useSelector } from "@redux"
import { FormControl } from '@type/form'
import { combineValidators } from '@utils/validation'
import {
    getDpValidator,
    getMandatoryValidator,
    getNumberRangeValidator,
    getNumberValidator,
} from '@utils/validation/validator'
import { useCallback, useMemo } from 'react'
import { getDisplayBalance } from '@utils/balance'

const useWalletOptions = () => {
    const t = useTranslation()

    const placeholderOption = useMemo(
        () => ({
            label: t('transfer.dropdown.placeholder'),
            value: '',
        }),
        [t],
    )

    const initialOptions = useMemo(
        () => [
            placeholderOption,
            {
                label: t(`transfer.walletName.sport`),
                value: GameSuppliers.sport,
            },
        ],
        [placeholderOption, t],
    )

    const afterSelectedOptions = useMemo(
        () => [
            placeholderOption,
            ...SEPARATED_WALLET_SUPPLIER.filter((supplier) => supplier !== GameSuppliers.sport).map((supplier) => ({
                label: t(`transfer.walletName.${supplier}`),
                value: supplier,
            })),
        ],
        [placeholderOption, t],
    )

    return {
        placeholderOption,
        initialOptions,
        afterSelectedOptions,
    }
}

export const useTransferForm = (
    balances: Record<SeparatedWalletSuppliers, string>,
    refetchBalances: () => void,
    minAmount: number,
) => {
    const dispatch = useDispatch()

    const t = useTranslation()

    const { placeholderOption, initialOptions, afterSelectedOptions } = useWalletOptions()

    const formControls: FormControl[] = useMemo(
        () => [
            {
                name: 'amount',
                validator: combineValidators(
                    getMandatoryValidator(t('transfer.errors.emptyAmount')),
                    getNumberValidator(t('transfer.errors.emptyAmount')),
                    getDpValidator(t('transfer.errors.emptyAmount'), 2),
                    getNumberRangeValidator(t('transfer.errors.minAmount', { minAmount }), minAmount),
                ),
                onChange: (value: string, setValues) => {
                    const amount = +value

                    if (value !== '' && isNaN(amount)) {
                        return
                    }

                    // allow at most two dp
                    if (value.split('.')[1]?.length > 2) {
                        return
                    }

                    // if player input > balance, auto change it to balance
                    setValues((draft) => {
                        const fromSupplier = draft.fromWallet.value
                        let targetBalance = getDisplayBalance(
                            (fromSupplier ? balances[fromSupplier as SeparatedWalletSuppliers] : balances.sport) || '0',
                        )

                        draft.amount = amount > +targetBalance ? targetBalance : value.trim()
                    })
                },
            },
            {
                name: 'fromWallet',
                validator: combineValidators(getMandatoryValidator(t('transfer.errors.emptyWallet'))),
                defaultValue: initialOptions[1],
                onChange: (value: IOption, setValues) => {
                    setValues((draft) => {
                        // one of the dropdown must show sport wallet
                        if (value.value === '') {
                            draft.toWallet = initialOptions[1]
                        }
                        draft.fromWallet = value
                    })
                },
            },
            {
                name: 'toWallet',
                validator: combineValidators(getMandatoryValidator(t('transfer.errors.emptyWallet'))),
                defaultValue: placeholderOption,
                onChange: (value: IOption, setValues) => {
                    setValues((draft) => {
                        // one of the dropdown must show sport wallet
                        if (value.value === '') {
                            draft.fromWallet = initialOptions[1]
                        }
                        draft.toWallet = value
                    })
                },
            },
        ],
        [balances, initialOptions, minAmount, placeholderOption, t],
    )

    const { values, registerForm, registerFormField, registerInput, resetForm, setValue, isValid } = useForm(
        formControls,
    )

    const getOptions = (myValue: IOption, otherValue: IOption) => {
        if (myValue.value === initialOptions[1].value || otherValue.value === placeholderOption.value) {
            return initialOptions
        }

        return afterSelectedOptions
    }

    // update options when the other's dropdown value changed
    const fromWalletOptions = getOptions(values.fromWallet, values.toWallet)
    const toWalletOptions = getOptions(values.toWallet, values.fromWallet)

    const onMaxBtnClick = useCallback(() => {
        setValue('amount', getDisplayBalance(balances[values.fromWallet.value as SeparatedWalletSuppliers] || '0'))
    }, [balances, setValue, values.fromWallet.value])

    const onSubmit = async () => {
        if (isValid) {
            try {
                await transferBetweenWallets(values.fromWallet.value, values.toWallet.value, values.amount)
                dispatch(setIsTransferSuccessModalOpened(true))
                refetchBalances()
                resetForm()
            } catch {
                dispatch(setIsTransferFailModalOpened(true))
            }
        }
    }

    return {
        registerForm,
        registerFormField,
        registerInput,
        resetForm,
        fromWalletOptions,
        toWalletOptions,
        onMaxBtnClick,
        onSubmit,
    }
}
