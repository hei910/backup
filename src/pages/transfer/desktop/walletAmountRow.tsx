import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import CollectButton from './collectButton'
import { useCallback } from 'react'
import GameSuppliers, { SeparatedWalletSuppliers } from '@constants/gameSuppliers'
import { getDisplayBalance } from '@utils/balance'

interface WalletAmountRowProps {
    balance?: string
    title: string
}

interface SeperateWalletGameRowProps {
    supplier: SeparatedWalletSuppliers
    balance: string
    onBtnClick: (supplier: SeparatedWalletSuppliers) => void
}

const AmountRow = styled.div`
    display: flex;
    align-items: center;

    & + & {
        margin-top: 24px;
    }
`

const Title = styled.div`
    color: #000000;
    ${(props) => props.theme.typography.Body3}
    flex: 0 0 102px;
`

const Amount = styled(Title)`
    color: #82b451;
    flex: 1;
    text-align: right;
`

const EmptyBlock = styled.div`
    width: 73px;
    margin-left: 24px;
`

const WalletAmountRow: React.FC<WalletAmountRowProps> = ({ balance, title, children }) => {
    const t = useTranslation()

    return (
        <AmountRow>
            <Title data-qa="txtWalletLabel">{title}</Title>
            <Amount data-qa="txtWalletBal">
                {balance === undefined || balance === null ? t('general.loadingAmount') : getDisplayBalance(balance)}
            </Amount>
            {children || <EmptyBlock />}
        </AmountRow>
    )
}

export const SeparateWalletGameRow: React.FC<SeperateWalletGameRowProps> = ({ supplier, balance, onBtnClick }) => {
    const t = useTranslation()
    const onClick = useCallback(() => {
        onBtnClick(supplier)
    }, [onBtnClick, supplier])

    return (
        <WalletAmountRow title={`${t(`transfer.walletName.${supplier}`)}：`} balance={balance}>
            {supplier !== GameSuppliers.sport && (
                <CollectButton collectType="single" onClick={onClick} data-qa={`btnCollectTo${supplier}Wallet`} />
            )}
        </WalletAmountRow>
    )
}

export default WalletAmountRow
