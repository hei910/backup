import { RoundedButton } from '@components/common/button'
import useTranslation from '@hooks/useTranslation'
import { FormInputProps } from '@type/form'
import styled from 'styled-components/macro'

type AmountInputProps = React.InputHTMLAttributes<HTMLInputElement> &
    FormInputProps & {
        onMaxBtnClick: () => void
    }

const InputContainer = styled.div<{ isValid: boolean }>`
    display: flex;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 8px 12px;
    ${(props) =>
        !props.isValid &&
        `
        border: 2px solid ${props.theme.colors.warning};
    `}
`

const DollarSign = styled.div`
    ${(props) => props.theme.typography.H4Headline}
`

const StyledInput = styled.input`
    border: none;
    margin: 0 16px;
    width: 100%;
`

const MaxButton = styled(RoundedButton)`
    ${(props) => props.theme.typography.Body5}
    padding: 4px 16px;
    width: auto;
    min-width: 68px;
`

const AmountInput: React.FC<AmountInputProps> = ({ isValid, onMaxBtnClick, ...otherProps }) => {
    const t = useTranslation()

    return (
        <InputContainer isValid={isValid}>
            <DollarSign>¥</DollarSign>
            <StyledInput {...otherProps} type="tel" autoComplete="off" data-qa="inputTransferAmount" />
            <MaxButton buttonType="secondaryGhost" type="button" onClick={onMaxBtnClick} data-qa="btnMaxAmount">
                {t('general.components.button.max')}
            </MaxButton>
        </InputContainer>
    )
}

export default AmountInput
