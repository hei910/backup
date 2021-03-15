import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import { betRecordsMenuItems } from '@sport/util/constant'
import CustomDateInput from './CustomDateInput'
import MenuItem from './MenuItem'

interface BetRecordsMenuProps {
    fetchRecord: (page: number, gte: number | string, lte: number | string) => void
}

const SBetRecordsMenuMainContainer = styled.div`
    min-height: 47px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 2;
    font-size: 16px;
    background-color: #fff;
    color: #fff;
`

const SBetRecordsMenuHeader = styled.div`
    width: 100%;
    height: 47px;
    display: flex;
    align-items: center;
    background-color: #4a4a4a;
`

const SBetRecordMenuBackArrowContainer = styled.div`
    margin-left: 13px;
`

const SBetRecordMenuBackLink = styled.div`
    color: #fff;
`

const SBetRecordMenuBackArrow = styled.span`
    color: #a0a0a0;
    width: 11px;
    height: 11px;
    border-width: 2px 2px 0px 0px;
    border-style: solid;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    box-sizing: border-box;
    transform: rotate(-135deg);

    &:before {
        content: '';
        position: absolute;
        right: 0;
        top: -1.51px;
        height: 2px;
        box-shadow: inset 0px 0px 0px 32px;
        transform: rotate(-45deg);
        width: 15px;
        transform-origin: right top;
        box-sizing: border-box;
    }
`

const SBetRecordMenuTitle = styled.div`
    margin-left: 20px;
`

const SBetRecordsMenuOptionBar = styled.div`
    width: 100%;
    height: 47px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: scroll;
    background-color: #363636;
`

const BetRecordsMenu: React.FC<BetRecordsMenuProps> = ({ fetchRecord }) => {
    const { t } = useTranslation()
    const history = useHistory()
    const [path, setPath] = useState('')

    function getRecord(gte?: number, lte?: number, title?: string) {
        if (gte !== undefined && lte !== undefined) fetchRecord(1, gte, lte)
        if (title) setPath(title)
    }

    useEffect(() => {
        getRecord(betRecordsMenuItems[0].gte, betRecordsMenuItems[0].lte, betRecordsMenuItems[0].title)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <SBetRecordsMenuMainContainer>
            <SBetRecordsMenuHeader>
                <SBetRecordMenuBackArrowContainer>
                    <SBetRecordMenuBackLink onClick={() => history.push('/sport')}>
                        <SBetRecordMenuBackArrow />
                    </SBetRecordMenuBackLink>
                </SBetRecordMenuBackArrowContainer>
                <SBetRecordMenuTitle>{t('betRecord.title')}</SBetRecordMenuTitle>
            </SBetRecordsMenuHeader>
            <SBetRecordsMenuOptionBar>
                {betRecordsMenuItems.map((item) => (
                    <MenuItem
                        key={`bet-records-menu-${item.title}`}
                        active={(path === item.title).toString()}
                        onclick={() => getRecord(item.gte, item.lte, item.title)}>
                        {t(item.t_path)}
                    </MenuItem>
                ))}
            </SBetRecordsMenuOptionBar>
            {path === 'custom' && <CustomDateInput fetchRecord={fetchRecord} />}
        </SBetRecordsMenuMainContainer>
    )
}

export default BetRecordsMenu
