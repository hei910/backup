import React from 'react'
import { useTranslation } from 'react-i18next'
import { NewCompetitors } from '@services/sportData/types'
import styled from 'styled-components/macro'

interface SubHeaderComponentProps {
    competitors: NewCompetitors
    isAh?: string
}

const SSubHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px 10px 10px;
    margin-top: 5px;
`

const SCompetitor = styled.div<{ align: string }>`
    text-align: ${(props) => props.align};
    font-size: 13px;
    font-weight: 800;
    color: #232323;
    flex: 2;
`
const SVerses = styled(SCompetitor)`
    flex: 1;
`
const SubHeader: React.FC<SubHeaderComponentProps> = ({ competitors, isAh }) => {
    const { t } = useTranslation()

    const renderVerses = () => {
        return isAh === 'ah' ||
            isAh === 'ah1st' ||
            isAh === 'ah2nd' ||
            isAh === 'ahq1' ||
            isAh === 'ahq2' ||
            isAh === 'ahq3' ||
            isAh === 'ahq4' ||
            isAh === 'ahf5in' ||
            isAh === 'ahfts' ||
            isAh?.includes('ml')
            ? 'VS'
            : t('outcomes.d')
    }
    return (
        <SSubHeaderContainer>
            <SCompetitor align={'left'}>{competitors.home.name}</SCompetitor>
            <SVerses align={'center'}>{renderVerses()}</SVerses>
            <SCompetitor align={'right'}>{competitors.away.name}</SCompetitor>
        </SSubHeaderContainer>
    )
}

export default SubHeader
