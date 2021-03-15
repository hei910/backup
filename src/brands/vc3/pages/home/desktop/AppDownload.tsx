import styled from 'styled-components/macro'
import coverPhone from '@brand/assets/images/home/iphone.png'
import CoreQrCode from 'qrcode.react'

const SLayout = styled.div``

const SHeader = styled.div`
    display: flex;
    align-items: center;
`

const SHeaderText = styled.div`
    line-height: 36px;
    font-weight: 800;
    font-size: 28px;
    margin-right: 20px;
`

const SContentLayout = styled.div`
    margin-top: 25px;
    display: flex;
`

const SCodeLayout = styled.div`
    margin-left: 60px;
    height: 420px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 180px;
`

const SCode = styled.div`
    width: 180px;
    height: 180px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SLiveButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to bottom, #d2b497, #f4dfc8);
    border-radius: 15px;
    color: #0c186c;
    font-size: 14px;
    font-weight: bold;
    padding: 4px 16px;
`

const SPhoneImage = styled.img`
    width: 700px;
    height: 516px;
`

const SCodeText = styled.div`
    margin-top: 20px;
    font-weight: 900;
    font-size: 20px;
`

const AppDownload = () => {
    return (
        <SLayout>
            <SHeader>
                <SHeaderText>APP DOWNLOAD</SHeaderText>
                <SLiveButton>APP 下载</SLiveButton>
            </SHeader>

            <SContentLayout>
                <SPhoneImage src={coverPhone} />
                <SCodeLayout>
                    <SLiveButton>HG9393 APP</SLiveButton>
                    <SCode>
                        <CoreQrCode
                            value={`${window.location.origin}/mobile/main`}
                            level="H"
                            renderAs="svg"
                            includeMargin={false}
                            size={180}
                            data-qa="imgAppQrCode"
                        />
                    </SCode>
                    <SCodeText>请扫描二维码</SCodeText>
                </SCodeLayout>
            </SContentLayout>
        </SLayout>
    )
}

export default AppDownload
