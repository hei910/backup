import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { useSelector } from '@redux'
import { SParagraph, SUlContainer, SUl, SHeader } from '../styles'

const Tnc = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    return (
        <>
            <SHeader>{t(`about.tnc.header`)}</SHeader>
            {[...Array(t('about.tnc.contents').length)].map((item, index) => {
                const paragraphLength = t(`about.tnc.contents.${index}.paragraphs`).length
                const listLength = t(`about.tnc.contents.${index}.list`).length
                const children = (
                    <>
                        {[...Array(paragraphLength)].map((paragraph, pIndex) => (
                            <SParagraph key={`tnc-paragraph-${index}-${pIndex}`}>
                                {t(`about.tnc.contents.${index}.paragraphs.${pIndex}.p`, { brandName })}
                            </SParagraph>
                        ))}
                        {[...Array(listLength)].map((list, listIndex) => (
                            <SUlContainer key={`tnc-list-${index}-${listIndex}`}>
                                <>-</>
                                <SUl key={`tnc-${t(`about.tnc.contents.${index}.title`)}-${index}-list-${listIndex}`}>
                                    {t(`about.tnc.contents.${index}.list.${listIndex}.content`, {
                                        brandName,
                                    })}
                                </SUl>
                            </SUlContainer>
                        ))}
                    </>
                )
                return (
                    <Section title={t(`about.tnc.contents.${index}.title`)} children={children} key={`tnc-${index}`} />
                )
            })}
        </>
    )
}

export default Tnc
