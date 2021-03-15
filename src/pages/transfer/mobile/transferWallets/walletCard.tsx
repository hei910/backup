import GameSuppliers, { SeparatedWalletSuppliers } from '@constants/gameSuppliers'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

import agWallet from '@images/transfer/mobile/ag.png'
import kyWallet from '@images/transfer/mobile/ky.png'
import nnWallet from '@images/transfer/mobile/nn.png'
import ptWallet from '@images/transfer/mobile/pt.png'
import sportWallet from '@images/transfer/mobile/sport.png'
import useTranslation from '@hooks/useTranslation'
import { useCallback } from 'react'
import { getDisplayBalance } from '@utils/balance'

const WalletIconMap = {
    ag: agWallet,
    ky: kyWallet,
    nn: nnWallet,
    pt: ptWallet,
    sport: sportWallet,
}

interface WalletCardProps {
    supplier: SeparatedWalletSuppliers
    balance: string
    className?: string
    onClick: (supplier: SeparatedWalletSuppliers) => void
}

const WalletCardContainer = styled.div`
    display: inline-block;
    min-width: 90px;
    margin-bottom: 20px;
    border-radius: 10px;
    padding: 12px 8px 0px;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);

    & + & {
        margin-left: 4px;
    }

    &:last-child {
        margin-right: ${(props) => props.theme.vars.containerPadding};
    }
`

const SupplierWalletIcon = styled.div<{ supplier: SeparatedWalletSuppliers }>`
    ${(props) => bgImg(WalletIconMap[props.supplier])}
    width: 22px;
    height: 22px;
    margin-bottom: 4px;
`

const CardContent = styled.div`
    ${(props) => props.theme.typography.Body6}
    color: #999999;
`

const WalletTitle = styled(CardContent)<{ supplier: SeparatedWalletSuppliers }>`
    ${(props) => props.supplier === GameSuppliers.sport && `color: #4b4b4b;`}
`

const WalletBalance = styled(CardContent)`
    color: #333333;
    margin-bottom: 4px;
`

const ActionButton = styled.div<{ supplier: SeparatedWalletSuppliers }>`
    ${(props) => props.theme.typography.Body6}
    color: ${(props) => (props.supplier === GameSuppliers.sport ? props.theme.colors.brand : '#4b4b4b')};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    margin: 0 -8px;
    padding: 4px 0;
    text-align: center;
`

const WalletCard: React.FC<WalletCardProps> = ({ className, supplier, balance, onClick }) => {
    const t = useTranslation()
    const onCardClick = useCallback(() => {
        onClick(supplier)
    }, [onClick, supplier])

    return (
        <WalletCardContainer className={className} onClick={onCardClick}>
            <SupplierWalletIcon supplier={supplier} />
            <WalletTitle supplier={supplier} data-qa={`txt${supplier}WalletTitle`}>
                {t(`transfer.walletName.${supplier}`)}
            </WalletTitle>
            <WalletBalance data-qa={`txt${supplier}WalletBal`}>
                {balance === undefined || balance === null ? t('general.loadingAmount') : getDisplayBalance(balance)}
            </WalletBalance>
            <ActionButton supplier={supplier} data-qa={`btnCollectTo${supplier}Wallet`}>
                {t(supplier === GameSuppliers.sport ? 'transfer.collectAll' : 'transfer.transferTo')}
            </ActionButton>
        </WalletCardContainer>
    )
}

export default WalletCard
