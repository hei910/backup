import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

import QRCode from '@components/common/qrCode'
import Bg from '@brand/assets/images/sportMaintenance/desktop/BG.jpg'
import BrandLogo from '@brand/assets/images/sportMaintenance/desktop/logo.svg'
import useSportMaintenance from '@pages/sportMaintenance/hook'
import useTranslation from '@hooks/useTranslation'

const SSportMaintenancePage = styled.div`
    width: 100%;
    height: 100%;
    padding: 0 128px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    ${bgImg(Bg, 'cover')}
`

const SLayout = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SLeftContent = styled.div`
    margin-right: 111px;
`

const SBrand = styled.div`
    width: 310px;
    height: 61px;
    ${bgImg(BrandLogo)}
`

const STitle = styled.div`
    width: 620px;
    margin: 30px 0;
    color: #07115b;
    ${(props) => props.theme.typography.H2Headline}
    font-weight: bold;
`

const SDescription = styled.div`
    color: #000000;
    ${(props) => props.theme.typography.Body1}
`

const SRightContent = styled.div`
    padding: 12px 16px;
    border-radius: 10px;
    box-shadow: 0 7px 6px 0 rgba(29, 51, 153, 0.1);
    background-color: #ffffff;
`

const SQrHint = styled.div`
    margin-top: 12px;
    color: #000000;
    text-align: center;
    white-space: pre;
    ${(props) => props.theme.typography.Body2}
`

const SCopyright = styled.div`
    position: absolute;
    bottom: 8px;
    left: 0;
    right: 0;
    text-align: center;
    color: #999999;
    ${(props) => props.theme.typography.Body3}
`

const SportMaintenancePage: React.FC = () => {
    const t = useTranslation()
    const { qrCodeUrl, copyRight } = useSportMaintenance()

    return (
        <SSportMaintenancePage>
            <SLayout>
                <SLeftContent>
                    <SBrand />
                    <STitle>{t('sportMaintenance.title')}</STitle>
                    <SDescription>{t('sportMaintenance.description')}</SDescription>
                </SLeftContent>
                <SRightContent>
                    <QRCode url={qrCodeUrl} size={245} includeMargin={false} />
                    <SQrHint>{t('sportMaintenance.hint')}</SQrHint>
                </SRightContent>
            </SLayout>
            <SCopyright>{copyRight}</SCopyright>
        </SSportMaintenancePage>
    )
}

export default SportMaintenancePage
