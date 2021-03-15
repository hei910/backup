import useCustomParams from '@sport/hooks/useCustomParams'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from '@sport/stores'
import styled from 'styled-components/macro'

interface MoreMarketBadgeProps {
    count: string | number
    className?: string
    matchId: string
    matchStatus?: { matchStatus: any }
}

const OtherMarket = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0px 8px;
    flex-direction: row;
    height: 100%;

    span {
        padding-top: 1px;
    }
`

const ArrowRight = styled.i`
    border: solid ${(props) => props.theme.sport.colors.text.active.secondary};
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 2px;
    transform: rotate(-45deg);
`

const StyledLayout = styled.div`
    height: 16px;
    background: #333333;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 500;
    font-size: 11px;
    width: 38px;
    justify-content: center;
    color: ${(props) => props.theme.sport.colors.text.active.secondary};
    cursor: pointer;
    user-select: none;
    border-radius: 4px;
    box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
`

const MoreMarketBadge: React.FC<MoreMarketBadgeProps> = ({ count, className, matchId, matchStatus }) => {
    const { date, sports } = useCustomParams()
    const source = useSelector((state) => state.sportGlobal.dataSource)

    return (
        <Link
            to={{
                pathname: `/sport/${date}/${sports}/details/${matchId}/${source}`,
                state: matchStatus,
            }}>
            <StyledLayout className={className}>
                <OtherMarket>
                    <span>{count}&nbsp;</span>
                    <ArrowRight />
                </OtherMarket>
            </StyledLayout>
        </Link>
    )
}

export default MoreMarketBadge
