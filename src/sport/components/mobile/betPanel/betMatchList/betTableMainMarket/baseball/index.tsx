import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedTableData } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'
import TableRightSide from '../TableRightSide'
import TableRow from './TableRow'

interface MBaseBallBetTableMainMarketProps {
    convertedData: ConvertedTableData<'am'>
}

const SHeaderTitle = styled.div<{ isHidden?: boolean }>`
    display: ${(props) => (props.isHidden ? 'none !important' : 'inherit')};
    font-size: 12px;
    color: #666666;
`

const SBackground = styled.div`
    background: #fff;
`

const SMatchDivider = styled.div`
    margin: 0px 10px 10px 10px;
    border-top: 1px solid #f2f2f2;
`

const MBaseBallBetTableMainMarket: React.FC<MBaseBallBetTableMainMarketProps> = ({ convertedData }) => {
    const { date } = useCustomParams()
    const data = date === 'inplay' || date === 'parlay-Live' ? convertedData.iot : convertedData.not
    const { t } = useTranslation()

    return (
        <>
            {data?.map((season) => {
                return (
                    <SBackground key={season.key}>
                        <ExpandableHeader
                            title={season.info.name}
                            defaultShow={true}
                            rightSide={
                                <TableRightSide>
                                    <SHeaderTitle>{t('betPanel.ml')}</SHeaderTitle>
                                    <SHeaderTitle>{t('betPanel.ah')}</SHeaderTitle>
                                    <SHeaderTitle>{t('betPanel.ou')}</SHeaderTitle>
                                </TableRightSide>
                            }>
                            {season.matchs.map((match, index) => {
                                const isNextMatchExist = !!season.matchs?.[index + 1]
                                return (
                                    <div key={match.key} data-mid={match.info.matchId}>
                                        <TableRow match={match} />
                                        {isNextMatchExist && <SMatchDivider />}
                                    </div>
                                )
                            })}
                        </ExpandableHeader>
                    </SBackground>
                )
            })}
        </>
    )
}

// eslint-disable-next-line import/no-unused-modules
export default MBaseBallBetTableMainMarket
