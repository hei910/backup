import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import { getGameMinBalance, getGameBalance, postTransferThirdParty } from '@services/game/api'
import { useCallback, useEffect, useState } from 'react'

export default (gameType: string, supplier: string) => {
    const t = useTranslation()
    const userBalance = useSelector((state) => state.user.balance)
    const [gameBalance, setGameBalance] = useState(0)
    const [minBalance, setMinBalance] = useState(10)
    const [inputValue, setInputValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        Promise.all([getGameMinBalance(gameType, supplier), getGameBalance(gameType, supplier)]).then(
            ([minBalance, gameBalance]) => {
                setMinBalance(minBalance)
                setGameBalance(gameBalance)
            },
        )
    }, [gameType, supplier])

    const validator = useCallback(
        (value: string) => {
            if (value === '' || isNaN(+value)) {
                return t(`slotmachine.errorMessages.empty`, {
                    game: t(`general.suppliers.slotmachine.${supplier.toLowerCase()}`),
                })
            }
            if (!isNaN(+userBalance) && +value > +userBalance) {
                return t(`slotmachine.errorMessages.insufficientBalance`)
            }
            if (+value < minBalance) {
                return t(`slotmachine.errorMessages.notLessThan`, { minBalance })
            }
            if (value.indexOf('.') < value.length - 3) {
                return t(`slotmachine.errorMessages.floating`)
            }
            return ''
        },
        [minBalance, supplier, t, userBalance],
    )

    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
            const errorMessage = validator(e.target.value)
            setErrorMessage(errorMessage)
        },
        [validator],
    )

    const onTransferPressed = useCallback(async () => {
        await postTransferThirdParty(supplier, +inputValue)
        // TODO: should continue
    }, [inputValue, supplier])

    return {
        userBalance,
        gameBalance,
        inputValue,
        errorMessage,
        onInputChange,
        onTransferPressed,
    }
}
