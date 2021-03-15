import styled from 'styled-components/macro'
import bgImg from '@mixins/backgroundImg'

interface CardProps {
    title: string
    icon: string
    content?: string
    onClick?: () => void
    required?: boolean
}

const ContactContent = styled.div`
    ${(props) => props.theme.typography.Body1}
    color: ${(props) => props.theme.colors.page.common.maintenance.color};
    word-break: break-all;
`

const ContactCard = styled.div`
    display: flex;
    min-width: 325px;
    height: 96px;
    padding: 0 32px;
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.1);
    border-left: 4px solid ${(props) => props.theme.colors.page.common.maintenance.contact.border};
    background-color: ${(props) => props.theme.colors.page.common.maintenance.contact.bg};
    ${(props) => props.onClick && `cursor: pointer;`}

    &:not(:last-child) {
        margin-right: 35px;
    }
`

const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const ContactIcon = styled.div<{ bg: string }>`
    height: 44px;
    flex: 0 0 42px;
    margin-right: 32px;
    ${(props) => bgImg(props.bg, 'contain')}
`

const ContactTitle = styled.div`
    ${(props) => props.theme.typography.Subtitle2}
    color: ${(props) => props.theme.colors.page.common.maintenance.contact.title};
`

const ContactItem: React.FC<CardProps> = ({ title, icon, content, onClick, required }) =>
    !required || content ? (
        <ContactCard key={title} onClick={onClick}>
            <ContactIcon bg={icon} />
            <ContactInfo>
                <ContactTitle>{title}</ContactTitle>
                <ContactContent>{content}</ContactContent>
            </ContactInfo>
        </ContactCard>
    ) : null

export default ContactItem
