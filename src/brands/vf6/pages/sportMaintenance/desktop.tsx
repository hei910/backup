import styled from 'styled-components/macro'
import QRCode from '@components/common/qrCode'
import Bg from '@brand/assets/images/sportMaintenance/desktop/BG.jpg'
import Content from '@brand/assets/images/sportMaintenance/desktop/QR.png'
import useSportMaintenance from '@pages/sportMaintenance/hook'
import bgImg from '@mixins/backgroundImg'

const SBg = styled.div`
    ${bgImg(Bg)}
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const ContentContainer = styled.div`
    ${bgImg(Content, 'contain')}
    width: 1190px;
    height: 580px;
    position: relative;
`

const CopyRight = styled.div`
    ${(props) => props.theme.typography.Body3}
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    color: #1b3f78;
`

const QrCodeContainer = styled.div`
    position: absolute;
    right: 27.2%;
    top: 34.5%;
`

// const fgColor = 'linear-gradient(to bottom left, #48519C, #6771E6)'

const SportMaintenance: React.FC<{}> = () => {
    const { qrCodeUrl, copyRight } = useSportMaintenance()

    return (
        <SBg>
            <ContentContainer>
                <QrCodeContainer>
                    <QRCode url={qrCodeUrl} size={180} includeMargin={false} fgColor={'#48519C'} />
                </QrCodeContainer>
            </ContentContainer>
            <CopyRight>{copyRight}</CopyRight>
        </SBg>
    )
}

export default SportMaintenance
