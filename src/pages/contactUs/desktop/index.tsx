import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import csBtn from '@brand/assets/images/contactUs/desktop/btn_cs.png'
import csIcon from '@brand/assets/images/contactUs/desktop/icon_cs.png'
import mailIcon from '@brand/assets/images/contactUs/desktop/icon_mail.png'
import phoneIcon from '@brand/assets/images/contactUs/desktop/icon_phone.png'
import qrIcon from '@brand/assets/images/contactUs/desktop/icon_qr.png'
import useTranslation from '@hooks/useTranslation'
import QrCode from '@components/common/qrCode'

import bgImg from '@mixins/backgroundImg'

const SContactUsPage = styled.div`
    width: 100%;
    height: 100%;
    background-color: #292929;
    padding: 35px;
    overflow-y: auto;
`

const Section = styled.div`
    display: flex;

    &:not(:last-child) {
        padding-bottom: 20px;
    }
`

const Icon = styled.div<{ bg: string }>`
    ${(props) => bgImg(props.bg, 'contain')}
    width: 18px;
    height: 18px;
    margin: 2px 8px 0 0;
`

const CsBtn = styled.a`
    ${bgImg(csBtn, 'contain')}
    display: inline-block;
    width: 40px;
    height: 30px;
    margin-left: 9px;
`

const Title = styled.p`
    ${(props) => props.theme.typography.Subtitle3}
    color: #eeeeee;
    margin: 0 0 14px;
`

const ContentRow = styled.div`
    display: flex;
    color: #999999;
    ${(props) => props.theme.typography.Body3}

    &:not(:last-child) {
        margin-bottom: 12px;
    }
`

const ContactSection: React.FC<{ icon: string; title: string; shouldRender: boolean }> = ({
    icon,
    title,
    shouldRender,
    children,
}) =>
    shouldRender ? (
        <Section>
            <Icon bg={icon} />
            <div>
                <Title>{title}</Title>
                {children}
            </div>
        </Section>
    ) : null

const ContactUsPage: React.FC<{}> = () => {
    const t = useTranslation()
    const { csPhone, csLink, webEmail, complaintPhone, csWxLink, csQqLink } = useSelector(
        (state) => state.app.brandInfo,
    )

    const wxOrQQ = csWxLink ? 'wx' : 'qq'

    return (
        <SContactUsPage>
            <ContactSection icon={csIcon} title={t('contactUs.cs.title')} shouldRender={!!csLink}>
                <ContentRow>{t('contactUs.cs.content.span1')}</ContentRow>
                <ContentRow>
                    {t('contactUs.cs.content.span2')}
                    <CsBtn
                        onClick={() => {
                            window.parent.open(csLink, '_blank')
                        }}
                    />
                </ContentRow>
            </ContactSection>
            <ContactSection
                icon={phoneIcon}
                title={t('contactUs.phone.title')}
                shouldRender={!!(csPhone || complaintPhone)}>
                <ContentRow> {t('contactUs.phone.content.span1')}</ContentRow>
                {csPhone && <ContentRow>{`${t('contactUs.phone.content.span2')}: ${csPhone}`}</ContentRow>}
                {complaintPhone && (
                    <ContentRow>{`${t('contactUs.phone.content.span3')}: ${complaintPhone}`}</ContentRow>
                )}
            </ContactSection>
            <ContactSection icon={mailIcon} title={t('contactUs.email.title')} shouldRender={!!webEmail}>
                <ContentRow>{t('contactUs.email.content.span1')}</ContentRow>
                <ContentRow>{webEmail}</ContentRow>
            </ContactSection>
            <ContactSection
                icon={qrIcon}
                title={t(`contactUs.qr.title.${wxOrQQ}`)}
                shouldRender={!!(csWxLink || csQqLink)}>
                <ContentRow>{t(`contactUs.qr.content.${wxOrQQ}`)}</ContentRow>
                <QrCode size={200} url={csWxLink || csQqLink} />
            </ContactSection>
        </SContactUsPage>
    )
}

export default ContactUsPage
