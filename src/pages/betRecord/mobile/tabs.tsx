import { FullWidthContainer } from '@components/mobile/pageContainer'
import { useCallback } from 'react'
import styled from 'styled-components/macro'
import { ITabIndex, ITabsProps } from './types'

export const TAB_HEIGHT = 42

const TabContainer = styled(FullWidthContainer)`
    overflow-x: scroll;
`

const STab = styled.div`
    min-width: 375px;
    background-color: ${(props) => props.theme.colors.page.mobile.betRecord.tab.bgColor};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const STabIndex = styled.div<{ isActive: boolean }>`
    flex-basis: 100%;
    text-align: center;
    padding: 10px;
    height: ${TAB_HEIGHT}px;
    color: ${(props) =>
        props.isActive
            ? props.theme.colors.page.mobile.betRecord.tab.activeColor
            : props.theme.colors.page.mobile.betRecord.tab.color};
    ${(props) =>
        props.isActive ? `border-bottom: 4px solid ${props.theme.colors.page.mobile.betRecord.tab.activeBorder}` : ''}
`

export default ({ tabs, onTabClick }: ITabsProps) => {
    const TabIndex = ({ item }: ITabIndex) => {
        const onClick = useCallback(() => {
            onTabClick(item)
        }, [item])

        return (
            <STabIndex isActive={item.isActive} onClick={onClick}>
                {item.label}
            </STabIndex>
        )
    }

    return (
        <TabContainer>
            <STab>
                {tabs.map((item, index) => {
                    return <TabIndex item={item} key={index} />
                })}
            </STab>
        </TabContainer>
    )
}
