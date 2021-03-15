import React, { forwardRef, useMemo } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import brandLogo from '@brand/assets/images/footer/mobile/logo.svg'
import useTransition from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import LinkIcons from '@brand/assets/images/footer/mobile/footer-icons.svg'
import CryptoIcons from '@brand/assets/images/footer/mobile/9393-crypto-icons.png'
import { directToAboutUs, directToAgentJoin, directToContactCs, directToGameRules } from '@utils/v1Functions'
import bgImg from '@mixins/backgroundImg'
import imageSprite from '@mixins/imageSprite'

const SFooter = styled.div`
    position: relative;
    padding: 24px 16px 20px;
    background-image: linear-gradient(to bottom, #0c186c, #001084);
    z-index: ${(props) => props.theme.vars.mobileFooterZIndex};
`

const RegularText = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #ffffff;
`

const BrandLogo = styled.div`
    ${bgImg(brandLogo, 'contain')}
    height: 22px;
    margin: 28px 0;
`

const Content = styled(RegularText)`
    display: inline-block;
`

const ContentWrapper = styled.div`
    display: flex;
    margin-top: 30px;
    justify-content: center;
`

const CopyRight = styled.div`
    ${(props) => props.theme.typography.Body6}
    text-align: center;
    color: #ffffff;
    margin-top: 28px;
`

const LinkSection = styled.div`
    display: flex;
    margin: 4px auto 12px;
    flex-wrap: wrap;
`

const SFooterNavItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.333%;
    height: 48px;
`

const NavIcon = styled.div<{ index: number }>`
    width: 24px;
    height: 24px;
    ${(props) =>
        imageSprite({
            url: LinkIcons,
            width: 24,
            height: 24,
            itemIndex: props.index,
        })}
`

const FooterNavText = styled.div`
    ${(props) => props.theme.typography.Body3}
    color: #ffffff;
    text-align: center;
    margin-left: 8px;
`

const SCryptoSection = styled.div`
    padding: 16px 16px 32px 16px;
`

const SCryptoTitle = styled.div`
    width: 154px;
    ${(props) => props.theme.typography.Body3}
    text-align: center;
    color: #ffffff;
    margin: 0 auto 16px auto;
    border-radius: 12px;
    background-image: linear-gradient(to bottom, #7965ff, #8eb0ff);
`

const SCryptoIcons = styled.div`
    width: 100%;
    height: 150px;
    background: url(${CryptoIcons})no-repeat center center/contain;
`

const FooterNavItem: React.FC<{ index: number; title: string; onClick: () => void }> = ({ index, title, onClick }) => {
    return (
        <SFooterNavItem onClick={onClick}>
            <NavIcon index={index} />
            <FooterNavText>{title}</FooterNavText>
        </SFooterNavItem>
    )
}

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
    const t = useTransition()
    const copyRight = useCopyRight()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)
    const csLink = useSelector((state) => state.app.brandInfo.csLink)

    const navLinks = useMemo(
        () => [
            {
                title: t('general.pages.agentJoin'),
                onClick: directToAgentJoin,
            },
            {
                title: t('general.pages.cs'),
                onClick: () => {
                    const targetWindow = window.parent || window
                    targetWindow.location.href = csLink
                },
            },
            {
                title: t('general.pages.gameRules'),
                onClick: directToGameRules,
            },
            {
                title: t('general.pages.contactUs'),
                onClick: directToContactCs,
            },
            {
                title: t('general.pages.aboutUs'),
                onClick: directToAboutUs,
            },
        ],
        [t, csLink],
    )

    return (
        <SFooter ref={ref}>
            <LinkSection>
                {navLinks.map((navLinkInfo, i) => (
                    <FooterNavItem
                        key={navLinkInfo.title}
                        index={i}
                        title={navLinkInfo.title}
                        onClick={navLinkInfo.onClick}
                    />
                ))}
            </LinkSection>
            <SCryptoSection>
                <SCryptoTitle>{t('general.components.footer.cryptoSectionTitle')}</SCryptoTitle>
                <SCryptoIcons />
            </SCryptoSection>
            <ContentWrapper>
                <Content>{t('general.components.footer.content', { brandName })}</Content>
            </ContentWrapper>
            <CopyRight>{copyRight}</CopyRight>
            <BrandLogo />
        </SFooter>
    )
})

export default Footer
