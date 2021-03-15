import { SParagraph, SHeader } from '../styles'
import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { useSelector } from '@redux'
import React from 'react'
interface ChildrenProps {
    number: number
    sectionLength: number
    brandName: string
}

const Children: React.FC<ChildrenProps> = ({ number, sectionLength, brandName }) => {
    const t = useTranslation()
    return (
        <>
            {[...Array(sectionLength)].map((section, sIndex) => {
                const paragraphLength = t(`about.sitemap.contents.${number}.sections.${sIndex}.paragraphs`).length
                return (
                    <React.Fragment key={`sitemap-paragraph-${number}-${sIndex}`}>
                        {[...Array(paragraphLength)].map((paragraph, pIndex) => (
                            <SParagraph key={`sitemap-paragraph-${number}-${sIndex}-${pIndex}`}>
                                {t(`about.sitemap.contents.${number}.sections.${sIndex}.paragraphs.${pIndex}.p`, {
                                    brandName,
                                })}
                            </SParagraph>
                        ))}
                    </React.Fragment>
                )
            })}
        </>
    )
}

const Sitemap = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    const contentLength = t(`about.sitemap.contents`).length

    return (
        <>
            <SHeader>{t(`about.sitemap.header`)}</SHeader>
            {[...Array(contentLength)].map((content, index) => {
                const sectionLength = t(`about.sitemap.contents.${index}.sections`).length
                const title = t(`about.sitemap.contents.${index}.title`, { brandName })
                const children = <Children number={index} sectionLength={sectionLength} brandName={brandName} />
                return <Section title={title} children={children} key={`sitemap-${index}`} />
            })}
        </>
    )
}
export default Sitemap
