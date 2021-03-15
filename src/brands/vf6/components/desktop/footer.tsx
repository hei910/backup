import styled from 'styled-components/macro'
import { useSelector } from '@redux'

import useTranslation from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import useFooterLinks from '@components/desktop/footer/hook'

import footer_1 from '@brand/assets/images/footer/footer_1.png'
import footer_2 from '@brand/assets/images/footer/footer_2.png'
import footer_3 from '@brand/assets/images/footer/footer_3.png'
import footer_4 from '@brand/assets/images/footer/footer_4.png'
import footer_5 from '@brand/assets/images/footer/footer_5.png'
import bvi from '@brand/assets/images/footer/bvi.png'
import gc from '@brand/assets/images/footer/gc.png'
import mga from '@brand/assets/images/footer/mga.png'
import pagcor from '@brand/assets/images/footer/pagcor.png'

import bgImg from '@mixins/backgroundImg'

const footerIcon = [footer_1, footer_2, footer_3, footer_4, footer_5]
const licensesIcon = [gc, mga, bvi, pagcor]

const Footer = styled.div`
    ${(props) => props.theme.common.footerTextStyle}
    text-align: center;
    width: 100%;
    color: #aaaaaa;
    background-color: white;
`

const LicensesContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
`

const LicenseC = styled.div`
    margin-right: 50px;
`
const EachIcon = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    height: 50px;
    width: 180px;
`

const FooterText = styled.div`
    max-width: 820px;
    margin: 0 auto;
    padding: 25px 0px;
`

const FooterLinks = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;

    > div {
        padding: 0 25px;
        border-left: 1px solid #aaa;
        cursor: pointer;
    }

    > div:hover {
        text-decoration: underline;
    }

    > div:first-of-type {
        border-left: none;
    }
`

const FooterLogo = styled.div`
    display: flex;
    justify-content: center;

    > img {
        height: 51px;
        width: 51px;
        margin: 5px 10px;
    }
`
const Copyright = styled.div`
    padding: 10px;
    text-align: center;
`

export default () => {
    const t = useTranslation()
    const copyRight = useCopyRight()
    const links = useFooterLinks()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)

    return (
        <Footer>
            <FooterText>{t('general.components.footer.licenses.content', { brandName })}</FooterText>
            <LicensesContainer>
                {licensesIcon.map((e, i) => (
                    <LicenseC key={e}>
                        <EachIcon bg={e} />
                        <div>
                            {t(`general.components.footer.licenses.item${i + 1}.title`)}
                            {t(`general.components.footer.licenses.item${i + 1}.content`)}
                        </div>
                    </LicenseC>
                ))}
            </LicensesContainer>

            <FooterLinks>
                <div onClick={links.aboutUs.onClick}>{links.aboutUs.title}</div>
                <div onClick={links.betResponsibility.onClick}>{links.betResponsibility.title}</div>
                <div onClick={links.privacy.onClick}>{links.privacy.title}</div>
                <div onClick={links.tnc.onClick}>{links.tnc.title}</div>
                <div onClick={links.contactUs.onClick}>{links.contactUs.title}</div>
                <div onClick={links.agentJoin.onClick}>{links.agentJoin.title}</div>
            </FooterLinks>
            <FooterLogo>
                {footerIcon.map((e) => (
                    <img key={e} src={e} />
                ))}
            </FooterLogo>
            <Copyright>{copyRight}</Copyright>
        </Footer>
    )
}
