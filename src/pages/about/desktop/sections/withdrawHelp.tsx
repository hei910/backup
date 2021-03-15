import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { useSelector } from '@redux'
import { SParagraph, SUlContainer, SUl, SHeader } from '../styles'
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
                <SParagraph key={`withdrawHelp-paragraph-${number}-${sNumber}-${pIndex}`}>
                    {t(`about.withdrawHelp.contents.${number}.sections.${sNumber}.paragraphs.${pIndex}.p`, {
                        brandName,
                    })}
                </SParagraph>
            ))}
            {[...Array(listLength)].map((list, listIndex) => (
                <SUlContainer key={`withdrawHelp-list-${number}-${sNumber}-${listIndex}`}>
                    <>-</>
                    <SUl>
                        {t(`about.withdrawHelp.contents.${number}.sections.${sNumber}.lists.${listIndex}.li`, {
                            brandName,
                        })}
                    </SUl>
                </SUlContainer>
            ))}
        </>
    )
}
const Children: React.FC<ChildrenProps> = ({ number, sectionLength, brandName }) => {
    const t = useTranslation()
    return (
        <>
            {[...Array(sectionLength)].map((section, sIndex) => {
                const paragraphLength = t(`about.withdrawHelp.contents.${number}.sections.${sIndex}.paragraphs`).length
                const listLength = t(`about.withdrawHelp.contents.${number}.sections.${sIndex}.lists`).length
                return (
                    <Content
                        paragraphLength={paragraphLength}
                        listLength={listLength}
                        number={number}
                        brandName={brandName}
                        sNumber={sIndex}
                        key={`withdrawHelp-${number}-${sIndex}`}
                    />
                )
            })}
        </>
    )
}

const WithdrawHelp = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    const contentLength = t(`about.withdrawHelp.contents`).length

    return (
        <>
            <SHeader>{t(`about.withdrawHelp.header`)}</SHeader>
            {[...Array(contentLength)].map((content, index) => {
                const sectionLength = t(`about.withdrawHelp.contents.${index}.sections`).length
                const title = t(`about.withdrawHelp.contents.${index}.title`)
                const children = <Children number={index} sectionLength={sectionLength} brandName={brandName} />
                return <Section title={title} children={children} key={`withdrawHelp-${index}`} />
            })}
        </>
    )
}
export default WithdrawHelp
