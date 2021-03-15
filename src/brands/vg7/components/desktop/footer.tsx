import styled from 'styled-components/macro'
import brandLogo from '@brand/assets/images/footer/desktop/logo.png'
import facebookIcon from '@brand/assets/images/footer/desktop/clogo_btn_01.png'
import twitterIcon from '@brand/assets/images/footer/desktop/clogo_btn_02.png'
import googleIcon from '@brand/assets/images/footer/desktop/clogo_btn_03.png'
import dribbleIcon from '@brand/assets/images/footer/desktop/clogo_btn_04.png'
import youtubeIcon from '@brand/assets/images/footer/desktop/clogo_btn_05.png'
import useCopyRight from '@hooks/useCopyRight'
import useFooterLinks from '@components/desktop/footer/hook'
import { useSelector } from '@redux'

const SMainContainer = styled.div`
    width: 100%;
    background: #252525;
    color: #999999;
`
const SInnerContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SLogo = styled.img`
    width: 178px;
    margin: 24px;
`

const SAbout = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    min-width: 790px;
`
const SLink = styled.div`
    ${(props) => props.theme.common.footerLinkStyle}
    ${(props) => props.theme.typography.Body2}
`
const SPipe = styled.span`
    margin: 0 5px;
`
const SCopyRight = styled.div`
    ${(props) => props.theme.common.footerTextStyle}
    ${(props) => props.theme.typography.Body2}
`
const SIcons = styled.img`
    width: 35px;
    height: 35px;
    margin-left: 40px;
`
const SRightWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    width: 375px;
`
const socialConstants = [facebookIcon, twitterIcon, googleIcon, dribbleIcon, youtubeIcon]

const Footer: React.FC = () => {
    const links = useFooterLinks()
    const copyRight = useCopyRight()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)

    return (
        <SMainContainer>
            <SInnerContainer>
                <SLogo src={brandLogo} alt={brandName} />
                <div>
                    <SAbout>
                        <SLink onClick={links.aboutUs.onClick}>{links.aboutUs.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.tnc.onClick}>{links.tnc.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.privacy.onClick}>{links.privacy.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.qna.onClick}>{links.qna.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.depositHelp.onClick}>{links.depositHelp.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.withdrawHelp.onClick}>{links.withdrawHelp.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.sitemap.onClick}>{links.sitemap.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.contactUs.onClick}>{links.contactUs.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.betResponsibility.onClick}>{links.betResponsibility.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.liveChat.onClick}>{links.liveChat.title}</SLink>
                        <SPipe>|</SPipe>
                        <SLink onClick={links.agentJoin.onClick}>{links.agentJoin.title}</SLink>
                    </SAbout>
                    <SCopyRight>{copyRight}</SCopyRight>
                </div>
                <SRightWrapper>
                    {socialConstants.map((icon, index) => (
                        <SIcons key={`footer-social-icon-${index}`} src={icon} alt={''} />
                    ))}
                </SRightWrapper>
            </SInnerContainer>
        </SMainContainer>
    )
}

export default Footer
