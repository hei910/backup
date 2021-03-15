import styled from 'styled-components/macro'
import mailIcon from '@brand/assets/images/maintenance/mail.png'
import phoneIcon from '@brand/assets/images/maintenance/smartphone.png'
import useTranslation from '@hooks/useTranslation'
import useMaintenance from '../hooks'

import bgImg from '@mixins/backgroundImg'

const SMaintenancePage = styled.div`
    position: relative;
    width: 100%;
    /* height: 100%; */
    background-color: ${(props) => props.theme.colors.page.common.maintenance.bgColor};
`

const ContentContainer = styled.div`
    padding: 28px 25px 8px;
    margin: 0 auto;
`

const Title = styled.div`
    padding-left: 10px;
    border-left: 4px solid ${(props) => props.theme.colors.component.common.title.leftBorder};
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    ${(props) => props.theme.typography.Subtitle3}
`

const BoldText = styled.span`
    ${(props) => props.theme.typography.Subtitle4}
    display: inline-block;
    margin: 0;
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    padding-top: 18px;
`

const RegularText = styled.p`
    ${(props) => props.theme.typography.Body3}
    margin: 0;
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    padding-top: 10px;
`

const SpecialColorBoldText = styled(BoldText)`
    display: inline;
    color: ${(props) => props.theme.colors.page.common.maintenance.endTime};
    padding-bottom: 4px;
    border-bottom: 1px solid;
`

const ContactSection = styled.div`
    display: flex;
    width: 100%;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.page.common.maintenance.contactSectionBg};
    padding: 20px 25px;
    justify-content: center;
    margin-top: 20px;
`

const ContactCard = styled.div`
    display: flex;
    flex-direction: column;
    width: 158px;
    min-height: 58px;
    padding: 6px 15px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    border-left: 4px solid ${(props) => props.theme.colors.page.common.maintenance.contact.border};
    background-color: ${(props) => props.theme.colors.page.common.maintenance.contact.bg};

    &:not(:last-child) {
        margin-right: 10px;
    }
`

const ContactIcon = styled.div<{ bg: string }>`
    width: 18px;
    height: 18px;
    margin-right: 12px;
    ${(props) => bgImg(props.bg, 'contain')}
`

const ContactRow = styled.div`
    display: flex;
    align-items: center;
`

const ContactTitle = styled(BoldText)`
    color: ${(props) => props.theme.colors.page.common.maintenance.contact.title};
    padding: 0;
`

const ContactContent = styled(RegularText)`
    padding: 0;
    word-break: break-all;
`

interface CardProps {
    title: string
    icon: string
    content: string
    type: string
}

const ContactItem: React.FC<CardProps> = ({ title, icon, content, type }) =>
    content ? (
        <ContactCard>
            <ContactRow>
                <ContactIcon bg={icon} />
                <ContactTitle>{title}</ContactTitle>
            </ContactRow>
            <ContactContent data-qa={`txtMaintenance${type}`}>{content}</ContactContent>
        </ContactCard>
    ) : null

const MaintenancePage: React.FC<{ pageKey?: string }> = ({ pageKey }) => {
    const t = useTranslation()
    const { endTime, notice, brandName, csPhone, webEmail, isReady } = useMaintenance(pageKey)

    const noContacts = !csPhone && !webEmail

    return isReady ? (
        <SMaintenancePage>
            <ContentContainer>
                <Title data-qa="txtMaintenanceTitle">{t('maintenance.title')}</Title>
                <BoldText>{t('maintenance.dear')}</BoldText>
                <RegularText data-qa="txtMaintenanceNotice">{notice}</RegularText>
                <RegularText>{t('maintenance.content1')}</RegularText>
                <BoldText>
                    {t('maintenance.content2.span1', { brandName })}
                    <SpecialColorBoldText data-qa="txtResumeTime">
                        {t('maintenance.content2.endTime', { endTime })}
                    </SpecialColorBoldText>
                    {t('maintenance.content2.span2')}
                </BoldText>
                <RegularText>{t('maintenance.content3')}</RegularText>
            </ContentContainer>
            {!noContacts && (
                <ContactSection>
                    <ContactItem
                        title={t('maintenance.contacts.phone')}
                        content={csPhone}
                        icon={phoneIcon}
                        type="Tel"
                        data-qa="txtPhoneNo"
                    />
                    <ContactItem
                        title={t('maintenance.contacts.email')}
                        content={webEmail}
                        icon={mailIcon}
                        type="Email"
                        data-qa="txtEmailAddr"
                    />
                </ContactSection>
            )}
        </SMaintenancePage>
    ) : null
}

export default MaintenancePage
