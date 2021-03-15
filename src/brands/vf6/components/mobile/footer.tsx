import { forwardRef, useMemo } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTransition from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import LicenseIcons from '@brand/assets/images/footer/mobile/license-icons.png'
import LinkIcons from '@brand/assets/images/footer/mobile/footer-icons.png'
import CryptoIconsBg from '@brand/assets/images/footer/mobile/crypto-list.png'
import { directToAboutUs, directToAgentJoin, directToContactCs, directToGameRules } from '@utils/v1Functions'

import bgImg from '@mixins/backgroundImg'
import imageSprite from '@mixins/imageSprite'

const SFooter = styled.div`
    padding: 24px 16px 20px;
    box-shadow: 0 -2px 6px 0 rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
`

const RegularText = styled.div`
    ${(props) => props.theme.typography.Body5}
    color: #999999;
`

const BreakLine = styled.div`
    width: 100%;
    height: 0;
    border-bottom: solid 1px #eeeeee;
    /* margin: 18px 0; */
`

const Title = styled.div`
    ${(props) => props.theme.typography.Body2}
    color: #333333;
    margin-top: 20px;
`

const FlexContainer = styled.div`
    display: flex;
`

const ScrollSection = styled(FlexContainer)`
    overflow-y: hidden;
    overflow-x: auto;
    margin: 20px 0;
`

const License = styled(FlexContainer)`
    flex-direction: column;
    align-items: center;
    margin-right: 30px;

    :last-child {
        margin-right: 0;
    }
`

const LicenseIcon = styled.div<{ index: number }>`
    ${(props) =>
        imageSprite({
            url: LicenseIcons,
            width: 145,
            height: 31,
            itemIndex: props.index,
        })}
    width: 145px;
    height: 31px;
`

const LicenseTitle = styled(RegularText)`
    margin-top: 8px;
    white-space: pre;
`

const CopyRight = styled.div`
    ${(props) => props.theme.typography.Subtitle6}
    text-align: center;
    color: #999999;
    margin-top: 16px;
`

const LinkSection = styled.div`
    margin: 16px 0 24px;
    display: flex;
    justify-content: space-between;
`

const FooterIconContainer = styled.div`
    width: 60px;
    height: 60px;
    background-color: #f2f2f2;
    border-radius: 9px;
    padding: 14px;
    margin-bottom: 8px;
`

const NavIcon = styled.div<{ index: number }>`
    width: 32px;
    height: 32px;
    ${(props) =>
        imageSprite({
            url: LinkIcons,
            width: 32,
            height: 32,
            itemIndex: props.index,
        })}
`

const CryptoIconBgSection = styled.div`
    margin-bottom: 44px;
`

const CryptoIconBg = styled.div`
    ${bgImg(CryptoIconsBg)}
    height: calc(74 / 342 * 100vw);
    width: 100%;
`

const FooterNavText = styled.div`
    color: #999999;
    ${(props) => props.theme.typography.Body5}
    text-align: center;
`

const FooterNavItem: React.FC<{ index: number; title: string; onClick: () => void }> = ({ index, title, onClick }) => {
    return (
        <div onClick={onClick} data-qa={`btnFooterNavItem${index + 1}`}>
            <FooterIconContainer>
                <NavIcon index={index} />
            </FooterIconContainer>
            <FooterNavText>{title}</FooterNavText>
        </div>
    )
}

const Footer = forwardRef<HTMLDivElement>((_, ref) => {
    const t = useTransition()
    const copyRight = useCopyRight()
    const csLink = useSelector((state) => state.app.brandInfo.csLink)

    const licenses = useMemo(
        () => [
            `${t('general.components.footer.licenses.item1.title')}${t(
                'general.components.footer.licenses.item1.content',
            )}`,
            `${t('general.components.footer.licenses.item2.title')}${t(
                'general.components.footer.licenses.item2.content',
            )}`,
            `${t('general.components.footer.licenses.item3.title')}${t(
                'general.components.footer.licenses.item3.content',
            )}`,
            `${t('general.components.footer.licenses.item4.title')}${t(
                'general.components.footer.licenses.item4.content',
            )}`,
        ],
        [t],
    )

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
            <CryptoIconBgSection>
                <CryptoIconBg />
            </CryptoIconBgSection>
            <Title>{t('general.components.footer.about')}</Title>
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
            <BreakLine />
            <Title>{t('general.components.footer.licensesTitle')}</Title>
            <ScrollSection>
                {licenses.map((license, i) => {
                    return (
                        <License key={`footer-license-${license}`}>
                            <LicenseIcon index={i} />
                            <LicenseTitle>{license}</LicenseTitle>
                        </License>
                    )
                })}
            </ScrollSection>
            <BreakLine />
            <CopyRight data-qa="txtFooterCopyRight">{copyRight}</CopyRight>
        </SFooter>
    )
})

export default Footer
