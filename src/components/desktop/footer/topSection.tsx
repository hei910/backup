import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import useFooterLinks from '@components/desktop/footer/hook'

const FooterTop = styled.div`
    background-color: #2d2d2d;
    padding: 30px 0 20px;
    min-height: 150px;
`

const FooterWrapper = styled.div`
    display: flex;
    justify-content: center;
    max-width: 1070px;
    margin: auto;
`

const FooterTopColumn = styled.div`
    width: 200px;
`

const LinkTitle = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #b4b4b4;
    padding-bottom: 5px;
`

const SLink = styled.div`
    ${(props) => props.theme.common.footerLinkStyle}
    color: #6E6E6E;
    padding-left: 2px;
`

const FooterTopSection: React.FC<{}> = () => {
    const links = useFooterLinks()
    const t = useTranslation()

    return (
        <FooterTop>
            <FooterWrapper>
                <FooterTopColumn>
                    <LinkTitle>{t('general.components.footer.linksTitle.others')}</LinkTitle>
                    <SLink onClick={links.aboutUs.onClick}>{links.aboutUs.title}</SLink>
                    <SLink onClick={links.agentJoin.onClick}>{links.agentJoin.title}</SLink>
                </FooterTopColumn>
                <FooterTopColumn>
                    <LinkTitle>{t('general.components.footer.linksTitle.tnc')}</LinkTitle>
                    <SLink onClick={links.betResponsibility.onClick}>{links.betResponsibility.title}</SLink>
                    <SLink onClick={links.tnc.onClick}>{links.tnc.title}</SLink>
                    <SLink onClick={links.privacy.onClick}>{links.privacy.title}</SLink>
                </FooterTopColumn>
                <FooterTopColumn>
                    <LinkTitle>{t('general.components.footer.linksTitle.help')}</LinkTitle>
                    <SLink onClick={links.qna.onClick}>{links.qna.title}</SLink>
                    <SLink onClick={links.contactUs.onClick}>{links.contactUs.title}</SLink>
                    <SLink onClick={links.sitemap.onClick}>{links.sitemap.title}</SLink>
                </FooterTopColumn>
            </FooterWrapper>
        </FooterTop>
    )
}

export default FooterTopSection
