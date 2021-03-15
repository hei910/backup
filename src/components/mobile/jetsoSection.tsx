import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import { directToJetso, directToJetsoArticle } from '@utils/v1Functions'
import { PromotionArticle } from '@brand/services/promotion/types'

interface IJetsoSectionProps {
    articles: PromotionArticle[]
    isReady: boolean
}

const SJetsoSection = styled.div`
    padding-bottom: 12px;
`

const SJetsoHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 12px;
`

const SJetsoHeaderTitle = styled.div`
    color: ${(props) => props.theme.colors.component.mobile.jetsoSection.color};
    font-size: 18px;
    font-weight: bold;
`

const SJetsoHeaderMore = styled.div`
    color: ${(props) => props.theme.colors.component.mobile.jetsoSection.color};
    font-size: 12px;
`

const SJetsoWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 12px;
`

const SJetsoItem = styled.div`
    flex: 0 0 auto;
    width: calc(50vw - 4px);
    padding-right: 8px;
`

const SJetsoImage = styled.div<{ src: string }>`
    width: 100%;
    height: 32vw;
    border-radius: 4px 4px 0 0;
`
const SJetsoText = styled.div`
    padding: 6px 0;
    background-color: ${(props) => props.theme.colors.component.mobile.jetsoSection.bgColor};
    color: ${(props) => props.theme.colors.component.mobile.jetsoSection.color};
    border-radius: 0 0 4px 4px;
    font-size: 12px;
    text-align: center;
`

const JetsoSection: React.FC<IJetsoSectionProps> = ({ articles, isReady }) => {
    const t = useTranslation()

    const onJetsoClick = (rowId: number) => {
        directToJetsoArticle(rowId)
    }

    return (
        <SJetsoSection>
            <SJetsoHeader>
                <SJetsoHeaderTitle>{t('general.components.jetsoSection.title')}</SJetsoHeaderTitle>
                <SJetsoHeaderMore onClick={directToJetso}>{t('general.components.jetsoSection.more')}</SJetsoHeaderMore>
            </SJetsoHeader>
            {isReady && (
                <SJetsoWrapper>
                    {articles.map((article) => (
                        <SJetsoItem key={`jetso-${article.orderId}`} onClick={() => onJetsoClick(article.rowId)}>
                            <SJetsoImage src={`${process.env.CDN_DOMAIN}/${article.mobileHomepageUrl}`} />
                            <SJetsoText>{article.title}</SJetsoText>
                        </SJetsoItem>
                    ))}
                </SJetsoWrapper>
            )}
        </SJetsoSection>
    )
}

export default JetsoSection
