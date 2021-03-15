import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { useSelector } from '@redux'
import { SParagraph, SHeader } from '../styles'

const AboutUs = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state?.app?.brandInfo?.brandName)
    return (
        <>
            <SHeader>{t('about.aboutUs.header')}</SHeader>
            {[...Array(t('about.aboutUs.contentList').length)].map((item, index) => {
                const paragraphLength = t(`about.aboutUs.contentList.${index}.paragraphs`).length

                const children = (
                    <>
                        {[...Array(paragraphLength)].map((paragrapg, pIndex) => (
                            <SParagraph key={`aboutUs-${index}-paragraph-${pIndex}`}>
                                {t(`about.aboutUs.contentList.${index}.paragraphs.${pIndex}.p`, { brandName })}
                            </SParagraph>
                        ))}
                    </>
                )
                return (
                    <Section
                        title={t(`about.aboutUs.contentList.${index}.title`)}
                        children={children}
                        key={`aboutUs-${index}`}
                    />
                )
            })}
        </>
    )
}

export default AboutUs
