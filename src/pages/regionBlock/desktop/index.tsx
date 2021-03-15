import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import topBg from '@brand/assets/images/regionBlock/top-bg.jpg'
import brandLogo from '@brand/assets/images/regionBlock/logo.png'
import titleText from '@brand/assets/images/regionBlock/title-text.png'
import csIcon from '@brand/assets/images/regionBlock/chat-box.png'
import chatIcon from '@brand/assets/images/regionBlock/icon-chat-blk.png'
import mailIcon from '@brand/assets/images/regionBlock/icon-mail-blk.png'
import phoneIcon from '@brand/assets/images/regionBlock/icon-phone-blk.png'
import { IRegionBlockProps } from '@pages/regionBlock/types'
import useTranslation from '@hooks/useTranslation'

import bgImg from '@mixins/backgroundImg'
import { directToHomePage } from '@utils/v1Functions'

const Container = styled.div`
    background-color: #252525;
    width: 100%;
    height: 100%;
`

const InnerContainer = styled.div`
    background-color: #252525;
    padding-bottom: 15px;
`

const TopBg = styled.div`
    ${bgImg(topBg, 'auto')};
    height: 350px;
`

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 100%;
    background: ${(props) => props.theme.colors.page.common.regionBlock.logoBg};
`

const BrandLogo = styled.img`
    max-width: 567px;
`

const BottomContainer = styled.div`
    display: flex;
    padding: 14px 21px 0;
    flex-direction: column;
    align-items: center;
`

const TitleText = styled.img`
    width: 100%;
    max-width: 442px;
`

const Description = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: #ffffff;
    text-align: left;
    padding-top: 14px;

    @media (max-width: 425px) {
        ${(props) => props.theme.typography.Body3}
    }
`

const SpecialColorDescription = styled.span`
    color: #f8ea54;
`

const CSBtn = styled.a`
    cursor: pointer;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 333px;
    height: 50px;
    margin-top: 16px;
    border-radius: 40px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.page.common.regionBlock.csBg};
    font-size: 18px;
    color: #ffffff;
`

const CSImg = styled.img`
    padding-right: 6px;
`

const Contacts = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 14px;
`

const Contact = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999999;
    padding-top: 7px;
`

const ContactIcon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 7px;
`

const RegionBlock: React.FC<IRegionBlockProps> = ({ ip = '192.168.100.100' }) => {
    const t = useTranslation()
    const { complaintPhone, csPhone, csLink, webEmail, brandName } = useSelector((state) => state.app.brandInfo)

    const contacts = [
        {
            icon: chatIcon,
            title: t('regionBlock.contacts.csPhone'),
            content: csPhone,
            "data-qa": "txtIpBlockTel",
        },
        {
            icon: phoneIcon,
            title: t('regionBlock.contacts.complaintPhone'),
            content: complaintPhone,
            "data-qa": "txtIpBlockTelComplaint",
        },
        {
            icon: mailIcon,
            title: t('regionBlock.contacts.email'),
            content: webEmail,
            "data-qa": "txtIpBlockEmail",
        },
    ]

    return (
        <Container>
            <InnerContainer>
                <TopBg />
                <LogoContainer>
                    <BrandLogo src={brandLogo} alt={brandName} onClick={directToHomePage} data-qa="imgBrandLogo" />
                </LogoContainer>
                <BottomContainer>
                    <TitleText src={titleText} alt={t('regionBlock.forbiddenAccess')} data-qa="imgIpBlockTitle" />
                    <Description data-qa="txtIpBlockDesc">
                        {t('regionBlock.dear')}:
                        <br />
                        {t('regionBlock.description.1')}
                        <SpecialColorDescription>{t('regionBlock.description.specialColor')}</SpecialColorDescription>
                        {t('regionBlock.description.2')}
                        <br />
                        {t('regionBlock.description.3')}
                    </Description>
                    <Description>
                        {t('regionBlock.ipText')}：{ip}
                    </Description>
                    <CSBtn href={csLink} data-qa="btnIpBlockCs">
                        <CSImg src={csIcon} alt={t('regionBlock.cs')} />
                        {t('regionBlock.cs')}
                    </CSBtn>
                    <Contacts>
                        {contacts.map((contact) => {
                            return (
                                contact.content && (
                                    <Contact key={contact.title}>
                                        <ContactIcon src={contact.icon} />
                                        {contact.title}：<span data-qa={contact["data-qa"]}>{contact.content}</span>
                                    </Contact>
                                )
                            )
                        })}
                    </Contacts>
                </BottomContainer>
            </InnerContainer>
        </Container>
    )
}

export default RegionBlock
