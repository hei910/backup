import { forwardRef } from 'react'
import BrandLogo from '@brand/assets/images/footer/mobile/logo.svg'
import styled from 'styled-components/macro'

import Logo1 from '@images/footer/mobile/footer-logo-1.png'
import Logo2 from '@images/footer/mobile/footer-logo-2.png'
import Logo3 from '@images/footer/mobile/footer-logo-3.png'
import Logo4 from '@images/footer/mobile/footer-logo-4.png'
import CryptoIcons from '@images/footer/mobile/crypto-icons.png'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'

const StyledFooter = styled.div`
    background-color: ${(props) => props.theme.vars.mobileFooterBgColor};
`

const Headline = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;

    :before,
    :after {
        content: '';
        flex: 1 0 auto;
        height: 1px;
        margin: 0 8px;
        background: #000;
    }
`

const BrandImage = styled.img`
    width: 90px;
`

const LicenseContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 0 16px;
    text-align: center;
`

const LicenseItem = styled.div`
    flex: 1 0 25%;
`

const LicenseLogo = styled.img`
    width: 80px;
    height: 80px;
    margin: 5px auto;
    border-radius: 50%;
    box-shadow: ${(props) => props.theme.vars.boxShadow};
`

const LicenseText = styled.div`
    white-space: nowrap;
    line-height: 1.5;
    color: #cccccc;
    ${(props) => props.theme.typography.Body6}
`

const Bottom = styled.div`
    padding: 25px 16px;
    text-align: center;
    ${(props) => props.theme.typography.Body5}
    line-height: 1.25;
    color: #888888;
`

const SCryptoSection = styled.div`
    padding: 16px 16px 32px 16px;
`

const SCryptoTitle = styled.div`
    ${(props) => props.theme.typography.Body3}
    text-align: center;
    color: #b7b7b7;
    margin-bottom: 12px;
`

const SCryptoIcons = styled.div`
    width: 100%;
    height: 150px;
    background: url(${CryptoIcons})no-repeat center center/contain;
`

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
    const t = useTranslation()
    const { brandName } = useSelector((state) => state.app.brandInfo)

    return (
        <StyledFooter ref={ref}>
            <Headline>
                <BrandImage src={BrandLogo} />
            </Headline>
            <SCryptoSection>
                <SCryptoTitle>{t('general.components.footer.cryptoSectionTitle')}</SCryptoTitle>
                <SCryptoIcons />
            </SCryptoSection>
            <LicenseContainer>
                <LicenseItem>
                    <LicenseLogo src={Logo1} />
                    <LicenseText>{t('general.components.footer.licenses.item1.title')}</LicenseText>
                    <LicenseText>{t('general.components.footer.licenses.item1.content')}</LicenseText>
                </LicenseItem>
                <LicenseItem>
                    <LicenseLogo src={Logo2} />
                    <LicenseText>{t('general.components.footer.licenses.item2.title')}</LicenseText>
                    <LicenseText>{t('general.components.footer.licenses.item2.content')}</LicenseText>
                </LicenseItem>
                <LicenseItem>
                    <LicenseLogo src={Logo3} />
                    <LicenseText>{t('general.components.footer.licenses.item3.title')}</LicenseText>
                    <LicenseText>{t('general.components.footer.licenses.item3.content')}</LicenseText>
                </LicenseItem>
                <LicenseItem>
                    <LicenseLogo src={Logo4} />
                    <LicenseText>{t('general.components.footer.licenses.item4.title')}</LicenseText>
                    <LicenseText>{t('general.components.footer.licenses.item4.content')}</LicenseText>
                </LicenseItem>
            </LicenseContainer>
            <Bottom>{t('general.components.footer.licenses.content', { brandName })}</Bottom>
        </StyledFooter>
    )
})

export default Footer
