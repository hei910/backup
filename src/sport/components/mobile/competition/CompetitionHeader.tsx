import useCustomParams from '@sport/hooks/useCustomParams'
import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import { setCompetitionTabIndex } from '@services/sportGlobal/actions'
import styled, { css } from 'styled-components/macro'

const SHeaderContainer = styled.div`
    border-top: 1px solid ${(props) => props.theme.sport.colors.background};
    /* border-bottom: 1px solid ${(props) => props.theme.sport.colors.background}; */
    background: ${(props) => props.theme.sport.colors.text.background};
`

const STabContainer = styled.div`
    display: flex;
    align-content: center;
    /* border-bottom: 1px solid ${(props) => props.theme.sport.colors.background}; */
`

const STabIndicator = styled.div<{ active?: boolean }>`
    height: 2.5px;
    margin: 0 10px;
`

const STabTitle = styled.span<{ active?: boolean }>`
    color: ${(props) => props.theme.sport.colors.text.tertiary};
    font-size: 14px;
    font-weight: bold;
    padding: 10px;
`

const SActiveTabCSS = css`
    ${STabIndicator} {
        background: ${(props) => props.theme.sport.colors.accent};
    }

    ${STabTitle} {
        color: ${(props) => props.theme.sport.colors.text.active.primary};
    }
`

const STabItemContainer = styled.div<{ active?: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${(props) => props.active && SActiveTabCSS}
`

const MCompetitionHeader: React.FC = () => {
    const competitionTabIndex = useSelector((state) => state.sportGlobal.competitionTabIndex)
    const dispatch = useDispatch()
    const history = useHistory()
    const { sports } = useCustomParams()

    const { t } = useTranslation()

    const selectTab = useCallback(
        (index: number) => {
            index === 2 && history.push(`/sport/select-competition/outright/${sports}`)
            dispatch(setCompetitionTabIndex(index))
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [sports],
    )

    return (
        <SHeaderContainer>
            <STabContainer>
                <STabItemContainer active={competitionTabIndex === 0} onClick={() => selectTab(0)}>
                    <STabTitle>{t('competition.coupons')}</STabTitle>
                    <STabIndicator />
                </STabItemContainer>
                <STabItemContainer active={competitionTabIndex === 1} onClick={() => selectTab(1)}>
                    <STabTitle>{t('competition.matches')}</STabTitle>
                    <STabIndicator />
                </STabItemContainer>
                <STabItemContainer active={competitionTabIndex === 2} onClick={() => selectTab(2)}>
                    <STabTitle>{t('competition.outrights')}</STabTitle>
                    <STabIndicator />
                </STabItemContainer>
            </STabContainer>
        </SHeaderContainer>
    )
}

export default memo(MCompetitionHeader)
