import useTranslation from '@hooks/useTranslation'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

import CollectBg from '@images/transfer/desktop/btn-collect.png'
import CollectAllBg from '@images/transfer/desktop/btn-collect-all.png'

type CollectType = 'single' | 'all'

interface TransferCollectButtonProps {
    collectType: CollectType
    onClick: () => void
    'data-qa': string
}

const CollectButton = styled.button<{ collectType: CollectType }>`
    ${(props) => props.theme.typography.Body4}
    ${(props) => bgImg(props.collectType === 'single' ? CollectBg : CollectAllBg)}
    border: none;
    color: #ffffff;
    width: 73px;
    height: 28px;
    text-align: right;
    margin-left: 24px;
    padding-right: 8px;
`

const TransferCollectButton: React.FC<TransferCollectButtonProps> = ({ collectType, onClick, ...otherProps }) => {
    const t = useTranslation()
    const text = t(`transfer.${collectType === 'single' ? 'collect' : 'collectAll'}`)

    return (
        <CollectButton collectType={collectType} onClick={onClick} data-qa={otherProps['data-qa']}>
            {text}
        </CollectButton>
    )
}

export default TransferCollectButton
