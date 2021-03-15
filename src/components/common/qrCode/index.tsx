import { useMemo } from 'react'
import styled from 'styled-components/macro'
import CoreQrCode from 'qrcode.react'
import brandLogo from '@brand/assets/images/app-logo.png'

const QrCodeContainer = styled.div`
    ${(props: { size: number; includeMargin: boolean }) => `
        width: ${props.size}px;
        height: ${props.size}px;
        padding: ${props.includeMargin ? props.size / 20 : 0}px;
    `}

    background-color: #ffffff;
`

interface IProps {
    url: string
    size: number
    includeMargin?: boolean
    fgColor?: string
}

const QrCode: React.FC<IProps> = ({ url, size, includeMargin = true, fgColor = '#000000' }) => {
    const imageSettings = useMemo(
        () => ({
            src: brandLogo,
            height: size / 4,
            width: size / 4,
            excavate: true,
        }),
        [size],
    )

    return (
        <QrCodeContainer size={size} includeMargin={includeMargin} data-qa="imgQrCode">
            <CoreQrCode
                value={url}
                level="H"
                renderAs="svg"
                size={size * (includeMargin ? 0.9 : 1)}
                includeMargin={false}
                imageSettings={imageSettings}
                fgColor={fgColor}
            />
        </QrCodeContainer>
    )
}

export default QrCode
