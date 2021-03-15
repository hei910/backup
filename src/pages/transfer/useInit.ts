import useUserBalance from '@hooks/useUserBalance'
import { useTransferForm } from './useTransferForm'

const minAmount = 10

export default () => {
    const { balances, refetchBalances } = useUserBalance(true)
    const {
        registerFormField,
        registerForm,
        registerInput,
        onMaxBtnClick,
        fromWalletOptions,
        toWalletOptions,
        onSubmit,
    } = useTransferForm(balances, refetchBalances, minAmount)

    return {
        balances,
        refetchBalances,
        registerFormField,
        registerForm,
        registerInput,
        onMaxBtnClick,
        fromWalletOptions,
        toWalletOptions,
        onSubmit,
    }
}
