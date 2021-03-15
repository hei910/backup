import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { useSelector } from '@redux'
import { SParagraph, SUlContainer, SUl, SHeader } from '../styles'

const BetResponsibility = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    return (
        <>
            <SHeader>{t(`about.betResponsibility.header`)}</SHeader>
            {[...Array(t('about.betResponsibility.contents').length)].map((item, index) => {
                const paragraphLength = t(`about.betResponsibility.contents.${index}.paragraphs`).length
                const listLength = t(`about.betResponsibility.contents.${index}.lists`).length
                const children = (
                    <>
                        {[...Array(paragraphLength)].map((paragraph, pIndex) => (
                            <SParagraph key={`betResponsibility-paragraph-${index}-${pIndex}`}>
                                {t(`about.betResponsibility.contents.${index}.paragraphs.${pIndex}.p`, { brandName })}
                            </SParagraph>
                        ))}
                        {[...Array(listLength)].map((list, listIndex) => (
                            <SUlContainer key={`betResponsibility-list-${index}-${listIndex}`}>
                                <>-</>
                                <SUl>
                                    {t(`about.betResponsibility.contents.${index}.lists.${listIndex}.li`, {
                                        brandName,
                                    })}
                                </SUl>
                            </SUlContainer>
                        ))}
                    </>
                )
                return (
                    <Section
                        title={t(`about.betResponsibility.contents.${index}.title`)}
                        children={children}
                        key={`betResponsibility-${index}`}
                    />
                )
            })}
        </>
    )
}

export default BetResponsibility
