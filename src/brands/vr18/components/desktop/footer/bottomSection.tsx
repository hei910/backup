import styled from 'styled-components/macro'
import useFooterLinks from '@components/desktop/footer/hook'
import useCopyRight from '@hooks/useCopyRight'
import useTranslation from '@hooks/useTranslation'
const OuterLinkContainer = styled.div`
    height: 88px;
    width: 100%;
    background-color: #252525;
`

const InnerLinkContainer = styled.div`
    font-size: 14px;
    color: #999999;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SLink = styled.span`
    ${(props) => props.theme.common.footerLinkStyle}
`

const Break = styled.span`
    ${(props) => props.theme.typography.Body3}
    color: #999999;
    padding: 0 12px;
`

const CrContent = styled.div`
    padding: 5px 0px;
`

const Qualification = styled.div`
    margin-top: 10px;
`
export default () => {
    const links = useFooterLinks()
    const copyRight = useCopyRight()
    const t = useTranslation()

    return (
        <OuterLinkContainer>
            <InnerLinkContainer>
                <div>
                    <SLink onClick={links.aboutUs.onClick}>{links.aboutUs.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.tnc.onClick}>{links.tnc.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.privacyAlt.onClick}>{links.privacyAlt.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.qna.onClick}>{links.qna.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.depositHelp.onClick}>{links.depositHelp.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.withdrawHelp.onClick}>{links.withdrawHelp.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.sitemap.onClick}>{links.sitemap.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.contactUs.onClick}>{links.contactUs.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.betResponsibility.onClick}>{links.betResponsibility.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.liveChat.onClick}>{links.liveChat.title}</SLink>
                    <Break>|</Break>
                    <SLink onClick={links.agentJoin.onClick}>{links.agentJoin.title}</SLink>
                    <Qualification> {t('general.components.footer.qualification')}</Qualification>
                    <CrContent>{copyRight}</CrContent>
                </div>
            </InnerLinkContainer>
        </OuterLinkContainer>
    )
}
