import { FullWidthContainer } from '@components/mobile/pageContainer'
import GameSuppliers, { SeparatedWalletSuppliers, SEPARATED_WALLET_SUPPLIER } from '@constants/gameSuppliers'
import useTranslation from '@hooks/useTranslation'
import useTransferWallets from '../../useTransferWallets'
import styled from 'styled-components/macro'
import WalletCard from './walletCard'
import ConfirmTransferModal from '../../confirmTransferModal'
import TransferPartialFailModal from '../../transferPartialFailModal'

interface TransferWalletSectionProps {
    balances: Record<SeparatedWalletSuppliers, string>
    refetchBalances: () => void
}

const WalletSection = styled.div`
    color: #333333;
`

const WalletTitle = styled.div`
    ${(props) => props.theme.typography.Body4}
    color: #333333;
    margin-bottom: 4px;
`

const TransferRemark = styled.div`
    ${(props) => props.theme.typography.Body6}
    color: #999999;
`

const SportWalletSpan = styled.span`
    color: #333333;
`

const WalletCardContainer = styled(FullWidthContainer)`
    white-space: nowrap;
    overflow-x: auto;
    padding-left: ${(props) => props.theme.vars.containerPadding};
    padding-bottom: 4px;
`

const TransferWalletSection: React.FC<TransferWalletSectionProps> = ({ balances, refetchBalances }) => {
    const t = useTranslation()
    const {
        onWalletCardClick,
        onConfirmClick,
        isConfirmTransferOpened,
        selectedSupplier,
        closeConfirmModal,
        closePartialFailModal,
        isPartialFailModalOpened,
        failSuppliers,
    } = useTransferWallets(refetchBalances)

    return (
        <>
            <WalletSection>
                <WalletTitle>{t('transfer.walletTitle')}</WalletTitle>
                <TransferRemark>
                    {t('transfer.transferRemark')} <SportWalletSpan>{t('transfer.walletName.sport')}</SportWalletSpan>
                </TransferRemark>
                <WalletCardContainer>
                    {SEPARATED_WALLET_SUPPLIER.map((supplier) => (
                        <WalletCard
                            key={`wallet-card-${supplier}`}
                            supplier={supplier as SeparatedWalletSuppliers}
                            balance={balances[supplier as SeparatedWalletSuppliers]}
                            onClick={onWalletCardClick}
                        />
                    ))}
                </WalletCardContainer>
            </WalletSection>
            <ConfirmTransferModal
                isOpen={isConfirmTransferOpened}
                onCancel={closeConfirmModal}
                onConfirm={onConfirmClick}
                supplier={selectedSupplier as GameSuppliers}
            />
            <TransferPartialFailModal
                isOpen={isPartialFailModalOpened}
                closeModal={closePartialFailModal}
                failList={failSuppliers}
            />
        </>
    )
}

export default TransferWalletSection
