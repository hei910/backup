import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'
import brandLogo from '@brand/assets/images/footer/desktop/logo.png'
import socialIcon1 from '@brand/assets/images/footer/desktop/social_icon_01.png'
import socialIcon1Hover from '@brand/assets/images/footer/desktop/social_icon_01_hover.png'
import socialIcon2 from '@brand/assets/images/footer/desktop/social_icon_02.png'
import socialIcon2Hover from '@brand/assets/images/footer/desktop/social_icon_02_hover.png'
import socialIcon3 from '@brand/assets/images/footer/desktop/social_icon_03.png'
import socialIcon3Hover from '@brand/assets/images/footer/desktop/social_icon_03_hover.png'
import socialIcon4 from '@brand/assets/images/footer/desktop/social_icon_04.png'
import socialIcon4Hover from '@brand/assets/images/footer/desktop/social_icon_04_hover.png'
import socialIcon5 from '@brand/assets/images/footer/desktop/social_icon_05.png'
import socialIcon5Hover from '@brand/assets/images/footer/desktop/social_icon_05_hover.png'
import useCopyRight from '@hooks/useCopyRight'
import useFooterLinks from '@components/desktop/footer/hook'
import { useSelector } from '@redux'

type SocialType = 'facebook' | 'twitter' | 'ball' | 'youtube' | 'googlePlus'

const socialIcons: {
    [type in SocialType]: {
        img: string
        hoverImg: string
    }
} = {
    facebook: {
        img: socialIcon1,
        hoverImg: socialIcon1Hover,
    },
    twitter: {
        img: socialIcon2,
        hoverImg: socialIcon2Hover,
    },
    googlePlus: {
        img: socialIcon3,
        hoverImg: socialIcon3Hover,
    },
    ball: {
        img: socialIcon4,
        hoverImg: socialIcon4Hover,
    },
    youtube: {
        img: socialIcon5,
        hoverImg: socialIcon5Hover,
    },
}

const SFooter = styled.footer`
    width: 100%;
    background-color: #252525;
`

const InnerContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    max-width: ${(props) => props.theme.vars.desktopBreakpointWidth};
    margin: 0 auto;
`

const BrandLogo = styled.img`
    padding: 24px;
`

const Text = styled.span`
    ${(props) => props.theme.typography.Body3}
    color: #999999;
`

// TODO: change to Link
const SLink = styled.span`
    ${(props) => props.theme.common.footerLinkStyle}
`

const Break = styled(Text)`
    padding: 0 5px;
`

const FlexContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div<{ type: SocialType }>`
    ${(props) => bgImg(socialIcons[props.type].img)}
    cursor: pointer;
    margin-left: 40px;
    width: 35px;
    height: 35px;
    transition-duration: 0.3s;

    :hover {
        ${(props) => bgImg(socialIcons[props.type].hoverImg)}
    }
`

const Footer: React.FC<{}> = () => {
    const copyRight = useCopyRight()
    const links = useFooterLinks()
    const brandName = useSelector((state) => state.app.brandInfo.brandName)

    return (
        <SFooter>
            <InnerContainer>
                <BrandLogo src={brandLogo} alt={brandName} />
                <div>
                    <FlexContainer>
                        <SLink onClick={links.aboutUs.onClick}>{links.aboutUs.title}</SLink>
                        <Break>|</Break>
                        <SLink onClick={links.tnc.onClick}>{links.tnc.title}</SLink>
                        <Break>|</Break>
                        <SLink onClick={links.qna.onClick}>{links.qna.title}</SLink>
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
                    </FlexContainer>
                    <Text>{copyRight}</Text>
                </div>
                <FlexContainer>
                    <SocialIcon type="facebook" />
                    <SocialIcon type="twitter" />
                    <SocialIcon type="googlePlus" />
                    <SocialIcon type="ball" />
                    <SocialIcon type="youtube" />
                </FlexContainer>
            </InnerContainer>
        </SFooter>
    )
}

export default Footer
