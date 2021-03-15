import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'

import { SHeader, SOlContainer, SOl, SParagraph } from '../styles'
import { useDepositHelpInit } from '../hook'

interface ChildrenProps {
    number: number
    sectionLength: number
    brandName: string
    depositMinAmount: number
}

interface ContentProps {
    number: number
    paragraphLength: number
    listLength: number
    brandName: string
    sNumber: number
    depositMinAmount: number
}

const Content: React.FC<ContentProps> = ({
    paragraphLength,
    listLength,
    number,
    sNumber,
    brandName,
    depositMinAmount = 0,
}) => {
    const t = useTranslation()

    return (
        <>
            {[...Array(paragraphLength)].map((paragraph, pIndex) => (
                <SParagraph key={`depositHelp-paragraph-${number}-${sNumber}-${pIndex}`}>
                    {t(`about.depositHelp.contents.${number}.sections.${sNumber}.paragraphs.${pIndex}.p`, {
                        brandName,
                        depositMinAmount,
                    })}
                </SParagraph>
            ))}
            {[...Array(listLength)].map((list, listIndex) => (
                <SOlContainer key={`depositHelp-list-${number}-${sNumber}-${listIndex}`}>
                    <>{listIndex + 1}.</>
                    <SOl>
                        {t(`about.depositHelp.contents.${number}.sections.${sNumber}.lists.${listIndex}.li`, {
                            brandName,
                        })}
                    </SOl>
                </SOlContainer>
            ))}
        </>
    )
}
const Children: React.FC<ChildrenProps> = ({ number, sectionLength, brandName, depositMinAmount }) => {
    const t = useTranslation()
    return (
        <>
            {[...Array(sectionLength)].map((section, sIndex) => {
                const paragraphLength = t(`about.depositHelp.contents.${number}.sections.${sIndex}.paragraphs`).length
                const listLength = t(`about.depositHelp.contents.${number}.sections.${sIndex}.lists`).length
                return (
                    <Content
                        paragraphLength={paragraphLength}
                        listLength={listLength}
                        number={number}
                        brandName={brandName}
                        sNumber={sIndex}
                        depositMinAmount={depositMinAmount}
                        key={`depositHelp-${number}-${sIndex}`}
                    />
                )
            })}
        </>
    )
}

const DepositHelp = () => {
    const t = useTranslation()
    const { depositMinAmount, brandName } = useDepositHelpInit()
    const contentLength = t(`about.depositHelp.contents`).length

    return (
        <>
            <SHeader>{t(`about.depositHelp.header`)}</SHeader>
            {[...Array(contentLength)].map((content, index) => {
                const sectionLength = t(`about.depositHelp.contents.${index}.sections`).length
                const title = t(`about.depositHelp.contents.${index}.title`)

                return (
                    <Section title={title} key={`depositHelp-${index}`}>
                        <Children
                            number={index}
                            sectionLength={sectionLength}
                            brandName={brandName}
                            depositMinAmount={depositMinAmount}
                        />
                    </Section>
                )
            })}
        </>
    )
}
export default DepositHelp
