import styled from 'styled-components/macro'
import brandLogo from '@brand/assets/images/footer/desktop/logo.svg'
import useCopyRight from '@hooks/useCopyRight'
import useFooterLinks from '@components/desktop/footer/hook'

import { useSelector } from '@redux'

const SFooter = styled.footer`
    width: 100%;
    background-color: #252525;
`

const InnerContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    max-width: 1500px;
    margin: 0 auto;
`

const BrandLogo = styled.img`
    padding: 24px;
`

const AboutSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const Text = styled.span`
    ${(props) => props.theme.typography.Body3}
    color: #999999;
    padding: 3px 0px;
`

// TODO: change to Link
const SLink = styled(Text)`
    cursor: pointer;
    transition-duration: 0.3s;

    :hover {
        color: #ffffff;
        text-decoration: underline;
    }
`

const AgentJoinLink = styled(SLink)`
    color: #f9cc1b;

    :hover {
        color: #f9cc1b;
    }
`

const Break = styled(Text)`
    padding: 0 12px;
    color: #707070;
`

const FlexContainer = styled.div`
    display: flex;
`

const Footer: React.FC<{}> = () => {
    const copyRight = useCopyRight()
    const links = useFooterLinks()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)

    return (
        <SFooter>
            <InnerContainer>
                <FlexContainer>
                    <BrandLogo src={brandLogo} alt={brandName} />
                    <AboutSection>
                        <FlexContainer>
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
                            <AgentJoinLink onClick={links.agentJoin.onClick}>{links.agentJoin.title}</AgentJoinLink>
                        </FlexContainer>
                        <Text>{copyRight}</Text>
                    </AboutSection>
                </FlexContainer>
            </InnerContainer>
        </SFooter>
    )
}

export default Footer
