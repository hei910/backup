import React from 'react'
import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import BackgroundImage from '@brand/assets/images/sportMaintenance/desktop/bg.jpg'
import ContentImage from '@brand/assets/images/sportMaintenance/desktop/maintenance.png'
import useSportMaintenance from '@pages/sportMaintenance/hook'
import QrCode from '@components/common/qrCode'
import useTranslation from '@hooks/useTranslation'

const OuterContainer = styled.div`
    ${bgImg(BackgroundImage)}
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const ContentContainer = styled.div`
    display: flex;
    background-color: #363636;
`
const ContentText = styled.div`
    padding: 32px;
    margin-right: -80px;
`

const QrCodeContainer = styled.div`
    width: 160px;
    height: 186px;
    background-color: white;
    text-align: center;
`

const QrText = styled.div`
    font-size: 14px;
    color: #4d4d4d;
`
const Text1 = styled.div`
    font-size: 16px;
    color: #f59211;
    margin: 5px 0px;
`

const Text2 = styled.div`
    color: #ffffff;
    font-size: 24px;
    margin: 5px 0px;
`

const Text3 = styled(Text2)`
    margin-bottom: 27px;
    font-size: 30px;
`

export default () => {
    const { qrCodeUrl, brandName } = useSportMaintenance()
    const t = useTranslation()
    return (
        <OuterContainer>
            <ContentContainer>
                <ContentText>
                    <Text1>
                        {brandName}
                        {t('sportMaintenance.allBrand.title')}
                    </Text1>
                    <Text2>{t('sportMaintenance.allBrand.current')}</Text2>
                    <Text3>{t('sportMaintenance.allBrand.soon')}</Text3>
                    <Text1>{t('sportMaintenance.allBrand.mobile')}</Text1>
                    <QrCodeContainer>
                        <QrCode url={qrCodeUrl} size={160} />
                        <QrText>{t('sportMaintenance.allBrand.scan')}</QrText>
                    </QrCodeContainer>
                </ContentText>
                <img src={ContentImage} />
            </ContentContainer>
        </OuterContainer>
    )
}
