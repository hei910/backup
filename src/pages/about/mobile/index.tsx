import { useSelector } from '@redux'
import PageContainer from '@components/mobile/pageContainer'
import AppBar from '@components/mobile/appbar'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'

import BrandLogo from '@brand/assets/images/app-logo.png'
import Logo1 from '@images/aboutUs/logo1.png'
import Logo2 from '@images/aboutUs/logo2.png'
import Logo3 from '@images/aboutUs/logo3.png'
import Logo4 from '@images/aboutUs/logo4.png'

const Content = styled.div`
    width: 100%;
    max-width: 640px;
    margin: 16px auto;
    font-size: 11px;
    color: #444446;
    background-color: #ffffff;
`

const Logo = styled.img`
    display: block;
    width: 100px;
    height: 100px;
    margin: 40px auto;
    border-radius: 16px;
    box-shadow: ${(props) => props.theme.vars.boxShadow};
`

const Headline = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    margin-bottom: 27px;

    :before,
    :after {
        content: '';
        flex: 1 0 auto;
        height: 1px;
        background: #a8a8a8;
    }

    :before {
        margin-right: 16px;
    }

    :after {
        margin-left: 16px;
    }
`

const License = styled.div`
    width: 100%;
    max-width: 480px;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    text-align: center;
`

const LicenseItem = styled.div`
    flex: 1 0 25%;
`

const LicenseLogo = styled.img`
    width: 70px;
    height: 70px;
    margin: 5px auto;
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.vars.boxShadow};
`

const LicenseText = styled.div`
    white-space: nowrap;
    line-height: 1.36;
`

const Bottom = styled.div`
    margin: 26px auto 0;
    text-align: center;
    line-height: 1.64;
`

const AboutUsPage = () => {
    const t = useTranslation()
    const { brandName } = useSelector((state) => state.app.brandInfo)

    return (
        <PageContainer>
            <AppBar title={t('about.aboutUs.title')} isBackToHome />
            <Content>
                <Logo src={BrandLogo} data-qa={'imgBrandLogo'} />
                <Headline>{t('about.aboutUs.headline')}</Headline>
                <License>
                    <LicenseItem>
                        <LicenseLogo src={Logo1} />
                        <LicenseText>{t('about.aboutUs.item1.title')}</LicenseText>
                        <LicenseText>{t('about.aboutUs.item1.content')}</LicenseText>
                    </LicenseItem>
                    <LicenseItem>
                        <LicenseLogo src={Logo2} />
                        <LicenseText>{t('about.aboutUs.item2.title')}</LicenseText>
                        <LicenseText>{t('about.aboutUs.item2.content')}</LicenseText>
                    </LicenseItem>
                    <LicenseItem>
                        <LicenseLogo src={Logo3} />
                        <LicenseText>{t('about.aboutUs.item3.title')}</LicenseText>
                        <LicenseText>{t('about.aboutUs.item3.content')}</LicenseText>
                    </LicenseItem>
                    <LicenseItem>
                        <LicenseLogo src={Logo4} />
                        <LicenseText>{t('about.aboutUs.item4.title')}</LicenseText>
                        <LicenseText>{t('about.aboutUs.item4.content')}</LicenseText>
                    </LicenseItem>
                </License>
                <Bottom>{t('about.aboutUs.bottom', { brandName })}</Bottom>
            </Content>
        </PageContainer>
    )
}

export default AboutUsPage
