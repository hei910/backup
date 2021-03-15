import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

interface ComponentProps {
    fixtureId?: string
}

const StyledLayout = styled.div`
    background: ${(props) => props.theme.sport.colors.table.detail.higherRate.background};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 11px;
    border-radius: 15px;
    letter-spacing: 0px;
    box-shadow: 3px 3px 6px ${(props) => props.theme.sport.colors.table.detail.higherRate.boxShadow};
    padding: 4px 8px;
    width: 84px;
    color: ${(props) => props.theme.sport.colors.table.detail.higherRate.headerText};
    cursor: pointer;
    user-select: none;

    &:hover {
        background: ${(props) => props.theme.sport.colors.table.detail.higherRate.hover};
    }
`

const HigherRateButton: React.FC<ComponentProps> = ({ fixtureId }) => {
    const { t } = useTranslation()

    return <StyledLayout>{t('betPanel.higher_rate')}</StyledLayout>
}

export default HigherRateButton
