import { useSelector } from '@redux'
import styled from 'styled-components/macro'
import useTranslation from '@hooks/useTranslation'
import Section from '@components/desktop/section'
import { SHeader } from '../styles'

const SContentContainer = styled.div`
    margin-bottom: 20px;
    margin-left: 20px;
`

const Qna = () => {
    const t = useTranslation()
    const brandName = useSelector((state) => state.app.brandInfo?.brandName)
    return (
        <>
            <SHeader>{t('about.qna.header')}</SHeader>
            {[...Array(t('about.qna.questionList').length)].map((item, index) => {
                const children = (
                    <SContentContainer>
                        A{index + 1}: {t(`about.qna.questionList.${index}.answer`, { brandName })}
                    </SContentContainer>
                )
                return (
                    <Section
                        title={`Q${index + 1}: ${t(`about.qna.questionList.${index}.question`, { brandName })}`}
                        children={children}
                        key={`qna-${index}`}
                    />
                )
            })}
        </>
    )
}

export default Qna
