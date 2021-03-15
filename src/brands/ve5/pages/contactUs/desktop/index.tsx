import { ReactNode } from 'react'
import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import QrCode from '@components/common/qrCode'
import Footer from '@brand/components/desktop/footer'
import Banner from '@brand/assets/images/contactUs/desktop/banner.png'
import CsIcon from '@brand/assets/images/contactUs/desktop/csIcon.svg'
import EmailIcon from '@brand/assets/images/contactUs/desktop/emailIcon.svg'
import PhoneIcon from '@brand/assets/images/contactUs/desktop/phoneIcon.svg'
import WechatIcon from '@brand/assets/images/contactUs/desktop/wechatIcon.svg'
import useTranslation from '@hooks/useTranslation'

import bgImg from '@mixins/backgroundImg'

const MainContainer = styled.div`
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.bgColor};
    width: 100%;
    height: 100%;
    min-height: 760px;
    position: relative;
`

const BannerContainer = styled.div`
    width: 100%;
    height: 189px;
    padding-top: 55px;
    ${bgImg(Banner, 'cover')}
`

const BannerText = styled.div`
    color: ${(props) => props.theme.colors.page.desktop.contactUs.text};
    text-align: center;
    ${(props) => props.theme.typography.H1Headline}
    font-weight: bold;
`

const ContentContainer = styled.div`
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.bgColor};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 65%;
`

const ContactCardContainer = styled.div`
    position: relative;
    height: 350px;
    width: 250px;
    margin-right: 50px;
`

const IconContainer = styled.div`
    position: relative;
    z-index: 1;
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.cardBg};
    width: 100px;
    height: 100px;
    border-radius: 50px;
    padding: 10px 0;
    margin: 0 auto;
`

const Icon = styled.div<{ src: string }>`
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.card};
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin: 0 auto;
    ${(props) => bgImg(props.src, 'auto')}
`

const CardContent = styled.div`
    position: absolute;
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.cardBg};
    text-align: center;
    width: 100%;
    height: 80%;
    margin-top: 70px;
    top: 0;
    border-radius: 10px;
    padding: 40px 20px 0;
`

const CardName = styled.div`
    color: ${(props) => props.theme.colors.page.desktop.contactUs.card};
    margin-bottom: 20px;
    ${(props) => props.theme.typography.Body1};
    font-weight: bold;
`

const CardDescription = styled.div`
    color: ${(props) => props.theme.colors.page.desktop.contactUs.descriptionText};
    margin-bottom: 20px;
    ${(props) => props.theme.typography.Body3};
`

const Contact = styled.div`
    ${(props) => props.theme.typography.Body2}
`

const CSButton = styled.div`
    width: 141px;
    height: auto;
    padding: 8px 12px;
    border-radius: 5px;
    box-shadow: 0 3px 6px 0 ${(props) => props.theme.colors.page.desktop.contactUs.btnShadow};
    background-color: ${(props) => props.theme.colors.page.desktop.contactUs.card};
    color: ${(props) => props.theme.colors.page.desktop.contactUs.text};
    margin: 0 auto;
    cursor: pointer;
    user-select: none;
    ${(props) => props.theme.typography.Button1}
`

const QRcode = styled.div`
    margin: 0 43px;
`

const SFooter = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
`

interface IContactCard {
    isShow: boolean
    iconSrc: string
    name: string
    description: string
    children: ReactNode
}

const ContactCard = ({ isShow, iconSrc, name, description, children }: IContactCard) => {
    return isShow ? (
        <ContactCardContainer>
            <IconContainer>
                <Icon src={iconSrc} />
            </IconContainer>
            <CardContent>
                <CardName>{name}</CardName>
                <CardDescription>{description}</CardDescription>
                {children}
            </CardContent>
        </ContactCardContainer>
    ) : null
}

export default () => {
    const t = useTranslation()
    const { complaintPhone, csPhone, csLink, webEmail, csWxLink } = useSelector((state) => state.app.brandInfo)

    return (
        <MainContainer>
            <BannerContainer>
                <BannerText>{t('contactUs.header')}</BannerText>
            </BannerContainer>
            <ContentContainer>
                <ContactCard
                    isShow={true}
                    iconSrc={CsIcon}
                    name={t('contactUs.cs.title')}
                    description={t('contactUs.cs.content.span1')}>
                    <CSButton
                        onClick={() => {
                            window.parent.open(csLink, '_blank')
                        }}>
                        {t('contactUs.cs.content.span2')}
                    </CSButton>
                </ContactCard>
                <ContactCard
                    isShow={complaintPhone !== '' || csPhone !== ''}
                    iconSrc={PhoneIcon}
                    name={t('contactUs.phone.title')}
                    description={t('contactUs.phone.content.span1')}>
                    <>
                        {csPhone !== '' && <Contact>{`${t('contactUs.phone.content.span2')}: ${csPhone}`}</Contact>}
                        {complaintPhone !== '' && (
                            <Contact>{`${t('contactUs.phone.content.span3')}: ${complaintPhone}`}</Contact>
                        )}
                    </>
                </ContactCard>
                <ContactCard
                    isShow={webEmail !== ''}
                    iconSrc={EmailIcon}
                    name={t('contactUs.email.title')}
                    description={t('contactUs.email.content.span1')}>
                    <Contact>{`${t('contactUs.email.content.span2')}: ${webEmail}`}</Contact>
                </ContactCard>
                <ContactCard
                    isShow={csWxLink !== ''}
                    iconSrc={WechatIcon}
                    name={t('contactUs.qr.title.wx')}
                    description={t('contactUs.qr.content.wx')}>
                    <QRcode>
                        <QrCode url={csWxLink} size={125} />
                    </QRcode>
                </ContactCard>
            </ContentContainer>
            <SFooter>
                <Footer />
            </SFooter>
        </MainContainer>
    )
}
