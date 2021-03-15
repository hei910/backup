import React, { forwardRef, useMemo } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import footerBgImg from '@brand/assets/images/footer/mobile/footer-bg.png'
import useTransition from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import { directToAboutUs, directToAgentJoin, directToContactCs, directToGameRules } from '@utils/v1Functions'
import bgImg from '@mixins/backgroundImg'

const NUM_OF_NAV_ITEMS_PER_LINE = 3

const SFooter = styled.div`
    position: relative;
    padding: 20px 25px 6px;
    ${bgImg(footerBgImg, 'cover')};
    min-height: ${(props) => props.theme.vars.mobileFooterHeight};
`

const RegularText = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #ffffff;
    text-align: center;
`

const Content = styled(RegularText)`
    display: inline-block;
`

const ContentWrapper = styled.div`
    padding: 20px 0;
    text-align: center;
`

const CopyRight = styled.div`
    ${(props) => props.theme.typography.Body6}
    text-align: center;
    color: #ffffff;
`

const LinkSection = styled.div`
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const SFooterNavItem = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #ffffff;
    text-align: center;
`

const Divider = styled.div`
    height: 12px;
    margin: 0 20px;
    border-left: 1px solid #ffffff;
`

const LineBreak = styled.div`
    height: 0px;
    flex-basis: 100%;
`

const FooterNavItem: React.FC<{ index: number; title: string; onClick: () => void }> = ({ index, title, onClick }) => {
    return (
        <SFooterNavItem onClick={onClick} data-qa={`btnFooterNavItem${index + 1}`}>
            {title}
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

    const footer = useMemo(() => {
        return navLinks.map((navLinkInfo, i) => (
            <React.Fragment key={navLinkInfo.title}>
                <FooterNavItem index={i} title={navLinkInfo.title} onClick={navLinkInfo.onClick} />
                {(i + 1) % NUM_OF_NAV_ITEMS_PER_LINE === 0 || i === navLinks.length - 1 ? <LineBreak /> : <Divider />}
            </React.Fragment>
        ))
    }, [navLinks])

    return (
        <SFooter ref={ref}>
            <LinkSection>{footer}</LinkSection>
            <ContentWrapper>
                <Content data-qa={'txtFooterLicense'}>{t('general.components.footer.content', { brandName })}</Content>
            </ContentWrapper>
            <CopyRight data-qa={'txtFooterCopyRight'}>{copyRight}</CopyRight>
        </SFooter>
    )
})

export default Footer
