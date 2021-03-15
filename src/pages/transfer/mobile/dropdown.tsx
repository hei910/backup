import styled from 'styled-components/macro'
import Dropdown, { IDropdownProps, IOption } from '@components/mobile/dropdown'
import { FormInputProps } from '@type/form'

interface WalletDropdownProps extends IDropdownProps, FormInputProps<IOption> {
    title: string
    'data-qa'?: string
}

const DropdownButton = styled.div<{ isValid: boolean }>`
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

const DropdownTitle = styled.div`
    color: #999999;
    ${(props) => props.theme.typography.Body6}
`

const DropdownValueLabel = styled.div`
    color: #4b4b4b;
    ${(props) => props.theme.typography.Subtitle3}
`

const TransferWalletDropdown: React.FC<WalletDropdownProps> = ({ title, isValid, ...dropdownProps }) => (
    <Dropdown {...dropdownProps}>
        <DropdownButton data-qa={dropdownProps['data-qa']} isValid={isValid}>
            <DropdownTitle>{title}</DropdownTitle>
            <DropdownValueLabel>{dropdownProps.value.label}</DropdownValueLabel>
        </DropdownButton>
    </Dropdown>
)

export default TransferWalletDropdown
