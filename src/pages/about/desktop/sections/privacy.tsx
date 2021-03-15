import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { SParagraph, SOlContainer, SOl, SHeader } from '../styles'
import { useSelector } from '@redux'

interface ChildrenProps {
    number: number
    sectionLength: number
    brandName: string
}

interface ContentProps {
    number: number
    paragraphLength: number
    listLength: number
    brandName: string
    sNumber: number
}

const Content: React.FC<ContentProps> = ({ paragraphLength, listLength, number, sNumber, brandName }) => {
    const t = useTranslation()
    return (
        <>
            {[...Array(paragraphLength)].map((paragraph, pIndex) => (
                <SParagraph key={`privacy-paragraph-${number}-${sNumber}-${pIndex}`}>
                    {t(`about.privacy.contents.${number}.sections.${sNumber}.paragraphs.${pIndex}.p`, {
                        brandName,
                    })}
                </SParagraph>
            ))}
            {[...Array(listLength)].map((list, listIndex) => (
                <SOlContainer key={`privacy-list-${number}-${sNumber}-${listIndex}`}>
                    <>{listIndex + 1}.</>
                    <SOl>
                        {t(`about.privacy.contents.${number}.sections.${sNumber}.lists.${listIndex}.li`, {
                            brandName,
                        })}
                    </SOl>
                </SOlContainer>
            ))}
        </>
    )
}

const Children: React.FC<ChildrenProps> = ({ number, sectionLength, brandName }) => {
    const t = useTranslation()
    return (
        <>
            {[...Array(sectionLength)].map((section, sIndex) => {
                const paragraphLength = t(`about.privacy.contents.${number}.sections.${sIndex}.paragraphs`).length
                const listLength = t(`about.privacy.contents.${number}.sections.${sIndex}.lists`).length
                return (
                    <Content
                        paragraphLength={paragraphLength}
                        listLength={listLength}
                        number={number}
                        brandName={brandName}
                        sNumber={sIndex}
                        key={`privacy-${number}-${sIndex}`}
                    />
                )
            })}
        </>
    )
}

const Privacy = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    return (
        <>
            <SHeader>{t(`about.privacy.header`)}</SHeader>
            {[...Array(t('about.privacy.contents').length)].map((item, index) => {
                const sectionLength = t(`about.privacy.contents.${index}.sections`).length
                const title = t(`about.privacy.contents.${index}.title`)
                const children = <Children number={index} sectionLength={sectionLength} brandName={brandName} />
                return <Section title={title} children={children} key={`privacy-${index}`} />
            })}
        </>
    )
}

export default Privacy
