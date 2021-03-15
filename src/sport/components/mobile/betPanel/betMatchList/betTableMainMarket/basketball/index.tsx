import ExpandableHeader from '@sport/components/mobile/header/ExpandableHeader'
import { ConvertedTableData } from '@sport/converters/types'
import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'
import TableRightSide from '../TableRightSide'
import TableRow from './TableRow'

interface MBasketBallBetTableMainMarketProps {
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

const MBasketBallBetTableMainMarket: React.FC<MBasketBallBetTableMainMarketProps> = ({ convertedData }) => {
    const { date, sports } = useCustomParams()
    const isTabletLayout = useSelector((state) => state.sportGlobal.isTabletLayout)
    const data = date === 'inplay' || date === 'parlay-Live' ? convertedData.iot : convertedData.not

    const halvesView = useSelector(
        (state) => state.sportGlobal.displayOptions?.[sports as 'football' | 'basketball']?.halvesView,
    )

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
                                    <SHeaderTitle>
                                        {halvesView ? t('betPanel.half_1x2') : t('betPanel.full_1x2')}
                                    </SHeaderTitle>
                                    <SHeaderTitle>
                                        {halvesView ? t('betPanel.half_ah') : t('betPanel.full_ah')}
                                    </SHeaderTitle>
                                    <SHeaderTitle>
                                        {halvesView ? t('betPanel.half_ou') : t('betPanel.full_ou')}
                                    </SHeaderTitle>
                                    <SHeaderTitle isHidden={!isTabletLayout}>{t('betPanel.half_1x2')}</SHeaderTitle>
                                    <SHeaderTitle isHidden={!isTabletLayout}>{t('betPanel.half_ah')}</SHeaderTitle>
                                    <SHeaderTitle isHidden={!isTabletLayout}>{t('betPanel.half_ou')}</SHeaderTitle>
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
export default MBasketBallBetTableMainMarket
