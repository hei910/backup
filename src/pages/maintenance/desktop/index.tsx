import styled, { css } from 'styled-components/macro'
import mailIcon from '@brand/assets/images/maintenance/mail.png'
import phoneIcon from '@brand/assets/images/maintenance/smartphone.png'
import ContactCsImg from '@brand/assets/images/maintenance/cs-icon.svg'
import useTranslation from '@hooks/useTranslation'
import useCopyRight from '@hooks/useCopyRight'
import useMaintenance from '../hooks'
import ContactItem from './contactItem'

const containerStyle = css`
    width: 1045px;
    margin: 0 auto;
`

const SMaintenancePage = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.colors.page.common.maintenance.bgColor};
`

const ContentContainer = styled.div`
    ${containerStyle}
    padding-top: 48px;
    padding-bottom: 54px;
    margin: 0 auto;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    padding-left: 17px;
    border-left: 7px solid ${(props) => props.theme.colors.component.common.title.leftBorder};
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    ${(props) => props.theme.typography.H4Headline}
`

const BoldText = styled.p`
    ${(props) => props.theme.typography.Subtitle2}
    margin: 0;
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    padding-top: 26px;
`

const RegularText = styled.p`
    ${(props) => props.theme.typography.Body1}
    margin: 0;
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    padding-top: 16px;
`

const SpecialColorBoldText = styled.span`
    ${(props) => props.theme.typography.Subtitle2}
    display: inline;
    color: ${(props) => props.theme.colors.page.common.maintenance.endTime};
    margin: 0;
    padding-bottom: 4px;
    border-bottom: 1px solid;
`

const ContactSection = styled.div`
    width: 100%;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    background-color: ${(props) => props.theme.colors.page.common.maintenance.contactSectionBg};
`

const ContactSectionPadding = styled.div`
    ${containerStyle}
    padding-top: 27px;
    padding-bottom: 27px;
    display: flex;
    align-items: center;
    height: 100%;
`

const Footer = styled.div`
    ${(props) => props.theme.typography.Body3}
    flex-grow: 1;
    width: 100%;
    padding-bottom: 30px;
    text-align: center;
    color: ${(props) => props.theme.colors.page.common.maintenance.footer};
    position: relative;
`

const CopyRight = styled.div`
    position: absolute;
    bottom: 8px;
    left: 0;
    right: 0;
`

const MaintenancePage: React.FC<{ pageKey?: string }> = ({ pageKey }) => {
    const t = useTranslation()
    const { endTime, notice, brandName, csPhone, webEmail, onCsButtonClick, isReady } = useMaintenance(pageKey)
    const copyRight = useCopyRight()

    return isReady ? (
        <SMaintenancePage>
            <ContentContainer>
                <Title data-qa="txtMaintenanceTitle">{t('maintenance.title')}</Title>
                <BoldText>{t('maintenance.dear')}</BoldText>
                <RegularText data-qa="txtMaintenanceNotice">
                    {notice}
                    {notice && <br />}
                    {t('maintenance.content1')}
                </RegularText>
                <BoldText>
                    {t('maintenance.content2.span1', { brandName })}
                    <SpecialColorBoldText data-qa="txtResumeTime">
                        {t('maintenance.content2.endTime', { endTime })}
                    </SpecialColorBoldText>
                    {t('maintenance.content2.span2')}
                </BoldText>
                <RegularText>{t('maintenance.content3')}</RegularText>
            </ContentContainer>
            <ContactSection>
                <ContactSectionPadding>
                    <ContactItem
                        title={t('maintenance.contacts.phone')}
                        content={csPhone}
                        icon={phoneIcon}
                        required
                        data-qa="txtMaintenanceTel"
                    />
                    <ContactItem
                        title={t('maintenance.contacts.email')}
                        content={webEmail}
                        icon={mailIcon}
                        required
                        data-qa="txtMaintenanceEmail"
                    />
                    <ContactItem
                        title={t('maintenance.contactCs')}
                        icon={ContactCsImg}
                        onClick={onCsButtonClick}
                        data-qa="txtMaintenanceCs"
                    />
                </ContactSectionPadding>
            </ContactSection>
            <Footer>
                <CopyRight>{copyRight}</CopyRight>
            </Footer>
        </SMaintenancePage>
    ) : null
}

export default MaintenancePage
