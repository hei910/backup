import styled from 'styled-components/macro'
import PageContainer, { FullWidthContainer } from '@components/mobile/pageContainer'
import BannerImg from '@brand/assets/images/contactUs/banner.jpg'
import CsIcon from '@brand/assets/images/contactUs/ic_cs.png'
import EmailIcon from '@brand/assets/images/contactUs/ic_email.png'
import MobileIcon from '@brand/assets/images/contactUs/ic_mobile.png'
import useTranslation from '@hooks/useTranslation'
import { useSelector } from '@redux'
import AppBar from '@components/mobile/appbar'

const Banner = styled.img`
    width: 100%;
`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;

    &:first-child {
        margin-top: 30px;
    }
`

const Icon = styled.img`
    width: 53px;
    height: 53px;
    margin-right: 24px;
`

const Content = styled.div`
    width: 173px;
`

const Title = styled.div`
    color: ${(props) => props.theme.colors.page.mobile.contactUs.titleColor};
    ${(props) => props.theme.typography.Subtitle4}
`

const Detail = styled.div`
    color: #999999;
    ${(props) => props.theme.typography.Body5};
`

const ContactContainer = styled.div`
    min-height: 43vh;
`

const ContactItem: React.FC<{ icon: string; title: string; shouldRender: boolean }> = ({
    icon,
    title,
    shouldRender,
    children,
}) =>
    shouldRender ? (
        <Item>
            <Icon src={icon} />
            <Content>
                <Title>{title}</Title>
                {children}
            </Content>
        </Item>
    ) : null

const ContactUsPage = () => {
    const t = useTranslation()
    const { webEmail, csPhone, complaintPhone } = useSelector((state) => state.app.brandInfo)

    return (
        <PageContainer>
            <AppBar title={t('contactUs.title')} isBackToHome />
            <FullWidthContainer>
                <Banner src={BannerImg} />
            </FullWidthContainer>
            <ContactContainer>
                <ContactItem icon={EmailIcon} title={t('contactUs.emailTitle')} shouldRender={!!webEmail}>
                    <Detail>{t('contactUs.emailDetail')}</Detail>
                    <Detail data-qa="txtEmail">{webEmail}</Detail>
                </ContactItem>
                <ContactItem
                    icon={MobileIcon}
                    title={t('contactUs.mobileTitle')}
                    shouldRender={!!(csPhone || complaintPhone)}>
                    {csPhone && (
                        <Detail>
                            {t('contactUs.mobileDetail1')} : <span data-qa="txtTelCs">{csPhone}</span>
                        </Detail>
                    )}
                    {complaintPhone && (
                        <Detail>
                            {t('contactUs.mobileDetail2')} : <span data-qa="txtTelComplaint">{complaintPhone}</span>
                        </Detail>
                    )}
                </ContactItem>
                <ContactItem icon={CsIcon} title={t('contactUs.csTitle')} shouldRender>
                    <Detail>{t('contactUs.csDetail1')}</Detail>
                    <Detail data-qa="btnContactCs">{t('contactUs.csDetail2')}</Detail>
                </ContactItem>
            </ContactContainer>
        </PageContainer>
    )
}

export default ContactUsPage
